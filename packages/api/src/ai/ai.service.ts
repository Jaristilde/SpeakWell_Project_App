import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export interface TranscriptionResult {
  text: string;
  duration?: number;
  language?: string;
}

export interface FeedbackAnalysis {
  overallScore: number;
  clarity: {
    score: number;
    feedback: string;
  };
  pace: {
    score: number;
    feedback: string;
    wordsPerMinute?: number;
  };
  fillerWords: {
    count: number;
    words: string[];
    feedback: string;
  };
  confidence: {
    score: number;
    feedback: string;
  };
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}

export interface PracticeContext {
  lessonTitle?: string;
  lessonCategory?: string;
  practicePrompt?: string;
  exerciseType?: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI | null = null;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('openai.apiKey');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
      this.logger.log('OpenAI client initialized');
    } else {
      this.logger.warn('OpenAI API key not configured - AI features disabled');
    }
  }

  isConfigured(): boolean {
    return this.openai !== null;
  }

  async transcribeAudio(audioBuffer: Buffer, filename: string): Promise<TranscriptionResult> {
    if (!this.openai) {
      throw new Error('OpenAI is not configured');
    }

    try {
      // Convert Buffer to Blob for OpenAI API
      const blob = new Blob([new Uint8Array(audioBuffer)], { type: 'audio/webm' });
      const file = new File([blob], filename, { type: 'audio/webm' });

      const transcription = await this.openai.audio.transcriptions.create({
        file,
        model: 'whisper-1',
        response_format: 'verbose_json',
        language: 'en',
      });

      return {
        text: transcription.text,
        duration: transcription.duration,
        language: transcription.language,
      };
    } catch (error) {
      this.logger.error('Transcription failed', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Transcription failed: ${errorMessage}`);
    }
  }

  async generateFeedback(
    transcript: string,
    durationSeconds: number,
    context?: PracticeContext,
  ): Promise<FeedbackAnalysis> {
    if (!this.openai) {
      throw new Error('OpenAI is not configured');
    }

    const wordCount = transcript.split(/\s+/).filter(w => w.length > 0).length;
    const wordsPerMinute = durationSeconds > 0 ? Math.round((wordCount / durationSeconds) * 60) : 0;

    const systemPrompt = `You are an expert speech coach analyzing a user's speaking practice.
Provide constructive, encouraging feedback that helps them improve their communication skills.
Be specific and actionable in your suggestions.
Always maintain a supportive tone while being honest about areas for improvement.`;

    const contextInfo = context
      ? `
Context:
- Lesson: ${context.lessonTitle || 'General Practice'}
- Category: ${context.lessonCategory || 'Not specified'}
- Practice Prompt: ${context.practicePrompt || 'Free practice'}
- Exercise Type: ${context.exerciseType || 'Not specified'}`
      : '';

    const userPrompt = `Analyze this speech transcript and provide detailed feedback.
${contextInfo}

Duration: ${durationSeconds} seconds
Word Count: ${wordCount}
Words Per Minute: ${wordsPerMinute}

Transcript:
"${transcript}"

Provide your analysis in the following JSON format:
{
  "overallScore": <1-100>,
  "clarity": {
    "score": <1-100>,
    "feedback": "<specific feedback about clarity, articulation, and message structure>"
  },
  "pace": {
    "score": <1-100>,
    "feedback": "<feedback about speaking pace and rhythm>",
    "wordsPerMinute": ${wordsPerMinute}
  },
  "fillerWords": {
    "count": <number>,
    "words": ["<list of filler words detected>"],
    "feedback": "<feedback about filler word usage>"
  },
  "confidence": {
    "score": <1-100>,
    "feedback": "<assessment of perceived confidence and authority>"
  },
  "strengths": ["<list 2-4 specific things they did well>"],
  "improvements": ["<list 2-4 specific areas to improve>"],
  "suggestions": ["<list 2-4 actionable tips for next practice>"]
}

Return ONLY valid JSON, no additional text.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      const feedback = JSON.parse(content) as FeedbackAnalysis;
      return feedback;
    } catch (error) {
      this.logger.error('Feedback generation failed', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Feedback generation failed: ${errorMessage}`);
    }
  }

  async generateQuickTip(transcript: string): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI is not configured');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a speech coach. Give ONE brief, actionable tip (1-2 sentences max) based on this speech.',
          },
          {
            role: 'user',
            content: `Speech transcript: "${transcript}"`,
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
      });

      return response.choices[0]?.message?.content || 'Keep practicing! Your confidence is growing.';
    } catch (error) {
      this.logger.error('Quick tip generation failed', error);
      return 'Keep practicing! Each session builds your confidence.';
    }
  }
}
