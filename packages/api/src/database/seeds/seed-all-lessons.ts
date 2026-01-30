/**
 * SpeakWell Lesson Seeding Script
 *
 * Populates Firestore with complete lesson content:
 * - 21-Day Confidence Challenge (21 lessons)
 * - Presentations (10 lessons)
 * - Job Interviews (10 lessons)
 * - Daily Conversations (10 lessons)
 * - Leadership (10 lessons)
 *
 * Total: 61 lessons
 *
 * Run: npx ts-node src/database/seeds/seed-all-lessons.ts
 */

import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { challengeLessons, CHALLENGE_21_DAY } from './21-day-challenge';
import { presentationsLessons } from './presentations-lessons';
import { interviewsLessons } from './interviews-lessons';
import { conversationsLessons } from './conversations-lessons';
import { leadershipLessons } from './leadership-lessons';

dotenv.config();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  console.error('❌ Missing Firebase credentials in .env file');
  console.log('Required: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY');
  process.exit(1);
}

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const db = admin.firestore();

interface SeedOptions {
  clearExisting?: boolean;
  categories?: string[];
}

async function seedLessons(options: SeedOptions = {}) {
  const { clearExisting = false, categories } = options;

  console.log('\n🌱 SpeakWell Lesson Seeder\n');
  console.log('='.repeat(50));

  // Determine which categories to seed
  const allCategories = {
    '21-day-challenge': challengeLessons,
    'presentations': presentationsLessons,
    'job-interviews': interviewsLessons,
    'daily-conversations': conversationsLessons,
    'leadership': leadershipLessons,
  };

  const categoriesToSeed = categories
    ? Object.fromEntries(Object.entries(allCategories).filter(([key]) => categories.includes(key)))
    : allCategories;

  // Clear existing lessons if requested
  if (clearExisting) {
    console.log('\n🗑️  Clearing existing lessons...');
    const snapshot = await db.collection('lessons').get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    console.log(`   Deleted ${snapshot.size} existing lessons`);
  }

  // Seed each category
  let totalSeeded = 0;

  for (const [category, lessons] of Object.entries(categoriesToSeed)) {
    console.log(`\n📚 Seeding: ${category}`);
    console.log(`   ${lessons.length} lessons to add`);

    for (const lesson of lessons) {
      try {
        const docRef = await db.collection('lessons').add({
          ...lesson,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log(`   ✅ ${lesson.title}`);
        totalSeeded++;
      } catch (error) {
        console.error(`   ❌ Failed: ${lesson.title}`, error);
      }
    }
  }

  // Seed the 21-Day Challenge path template
  if (!categories || categories.includes('21-day-challenge')) {
    console.log('\n🏆 Seeding 21-Day Challenge Path Template...');
    try {
      await db.collection('learningPathTemplates').doc('21-day-confidence').set({
        ...CHALLENGE_21_DAY,
        lessonIds: [], // Will be populated with actual IDs after seeding
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log('   ✅ 21-Day Confidence Challenge template created');
    } catch (error) {
      console.error('   ❌ Failed to create challenge template', error);
    }
  }

  // Seed topics/categories
  console.log('\n📂 Seeding Topic Categories...');
  const topics = [
    {
      id: '21-day-challenge',
      name: '21-Day Confidence Challenge',
      description: 'Transform your speaking confidence in 21 days',
      icon: 'trophy',
      color: '#F59E0B',
      order: 1,
      isActive: true,
    },
    {
      id: 'presentations',
      name: 'Presentations',
      description: 'Master the art of presenting to any audience',
      icon: 'presentation-chart-bar',
      color: '#3B82F6',
      order: 2,
      isActive: true,
    },
    {
      id: 'job-interviews',
      name: 'Job Interviews',
      description: 'Ace every interview with confidence',
      icon: 'briefcase',
      color: '#8B5CF6',
      order: 3,
      isActive: true,
    },
    {
      id: 'daily-conversations',
      name: 'Daily Conversations',
      description: 'Connect better in everyday interactions',
      icon: 'chat-bubble-left-right',
      color: '#10B981',
      order: 4,
      isActive: true,
    },
    {
      id: 'leadership',
      name: 'Leadership',
      description: 'Communicate like a leader others want to follow',
      icon: 'user-group',
      color: '#EF4444',
      order: 5,
      isActive: true,
    },
  ];

  for (const topic of topics) {
    if (!categories || categories.includes(topic.id)) {
      try {
        await db.collection('topics').doc(topic.id).set({
          ...topic,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log(`   ✅ ${topic.name}`);
      } catch (error) {
        console.error(`   ❌ Failed: ${topic.name}`, error);
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`\n✨ Seeding complete!`);
  console.log(`   Total lessons seeded: ${totalSeeded}`);
  console.log(`   Categories: ${Object.keys(categoriesToSeed).join(', ')}`);
  console.log('\n');
}

// Run the seeder
async function main() {
  const args = process.argv.slice(2);
  const clearExisting = args.includes('--clear');
  const categoryArg = args.find(arg => arg.startsWith('--category='));
  const categories = categoryArg ? categoryArg.split('=')[1].split(',') : undefined;

  console.log('\n📋 Options:');
  console.log(`   Clear existing: ${clearExisting}`);
  console.log(`   Categories: ${categories ? categories.join(', ') : 'all'}`);

  try {
    await seedLessons({ clearExisting, categories });
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();

export { seedLessons };
