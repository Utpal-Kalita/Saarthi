
import { config } from 'dotenv';
config();

import '@/ai/flows/cbt-guidance-from-chatbot.ts';
import '@/ai/flows/crisis-keyword-detection.ts';
import '@/ai/flows/mood-insights-from-journal.ts';
import '@/ai/flows/multimodal-cbt-guidance.ts';
import '@/ai/flows/text-to-speech.ts';
