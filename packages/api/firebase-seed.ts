/**
 * Firebase Firestore Seed Script
 *
 * Run this script to seed initial lesson data to Firestore:
 * npx ts-node firebase-seed.ts
 *
 * Make sure to set up your .env file first with Firebase credentials.
 */

import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  console.error('Missing Firebase credentials in .env file');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  }),
});

const db = admin.firestore();

const lessons = [
  {
    title: 'Introduction to Confident Speaking',
    category: 'Fundamentals',
    difficulty: 1,
    durationMinutes: 5,
    content: {
      introduction: 'Confident speaking is a skill that can be learned and improved with practice. In this lesson, we will cover the foundational elements that make a speaker appear confident and credible.',
      tips: [
        'Maintain eye contact with your audience',
        'Speak at a measured pace, avoid rushing',
        'Use pauses effectively for emphasis',
        'Keep your body language open and relaxed',
      ],
      exercise: 'Record yourself introducing yourself in 30 seconds. Focus on maintaining steady eye contact with the camera and speaking clearly.',
    },
  },
  {
    title: 'Body Language Basics',
    category: 'Fundamentals',
    difficulty: 1,
    durationMinutes: 7,
    content: {
      introduction: 'Your body communicates as much as your words. Learning to use positive body language can dramatically improve how your message is received.',
      tips: [
        'Stand or sit with good posture',
        'Use hand gestures to emphasize points',
        'Avoid crossing your arms',
        'Smile naturally when appropriate',
      ],
      exercise: 'Record yourself explaining your favorite hobby while focusing on open body language and natural gestures.',
    },
  },
  {
    title: 'Voice Projection Techniques',
    category: 'Voice',
    difficulty: 2,
    durationMinutes: 6,
    content: {
      introduction: 'A strong, clear voice commands attention and conveys confidence. Learn techniques to project your voice without straining.',
      tips: [
        'Breathe from your diaphragm',
        'Open your mouth wider when speaking',
        'Vary your pitch and tone',
        'Practice speaking to the back of the room',
      ],
      exercise: 'Record yourself reading a paragraph, first quietly, then projecting your voice as if speaking to a large room.',
    },
  },
  {
    title: 'Managing Speaking Anxiety',
    category: 'Mindset',
    difficulty: 2,
    durationMinutes: 8,
    content: {
      introduction: 'Even experienced speakers feel nervous. The key is learning to manage that anxiety and channel it into positive energy.',
      tips: [
        'Practice deep breathing before speaking',
        'Visualize a successful outcome',
        'Focus on your message, not yourself',
        'Remember that some nervousness is normal',
      ],
      exercise: 'Record yourself giving a 60-second impromptu speech on any topic. Notice your anxiety level and how it changes as you continue.',
    },
  },
];

async function seedLessons() {
  console.log('Seeding lessons to Firestore...');

  for (const lesson of lessons) {
    const docRef = await db.collection('lessons').add({
      ...lesson,
      createdAt: new Date().toISOString(),
    });
    console.log(`Created lesson: ${lesson.title} (${docRef.id})`);
  }

  console.log('Seeding complete!');
  process.exit(0);
}

seedLessons().catch((error) => {
  console.error('Error seeding data:', error);
  process.exit(1);
});
