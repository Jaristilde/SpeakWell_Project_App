import { useState, useCallback } from 'react';
import * as Speech from 'expo-speech';

interface UseSpeechOptions {
    language?: string;
    pitch?: number;
    rate?: number;
}

export const useSpeech = (options: UseSpeechOptions = {}) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const { language = 'en-US', pitch = 1.0, rate = 0.9 } = options;

    const speak = useCallback(async (text: string) => {
        // Stop any ongoing speech first
        await Speech.stop();

        setIsSpeaking(true);

        Speech.speak(text, {
            language,
            pitch,
            rate,
            onDone: () => setIsSpeaking(false),
            onStopped: () => setIsSpeaking(false),
            onError: () => setIsSpeaking(false),
        });
    }, [language, pitch, rate]);

    const stop = useCallback(async () => {
        await Speech.stop();
        setIsSpeaking(false);
    }, []);

    const toggle = useCallback(async (text: string) => {
        if (isSpeaking) {
            await stop();
        } else {
            await speak(text);
        }
    }, [isSpeaking, speak, stop]);

    return {
        speak,
        stop,
        toggle,
        isSpeaking,
    };
};
