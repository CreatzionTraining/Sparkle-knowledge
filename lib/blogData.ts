export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    verified: boolean;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;

}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "ielts-speaking-test-2026",
    title: "IELTS Speaking Test 2026: New Topics and Preparation Strategies",
    excerpt: "Master the latest IELTS speaking topics and learn proven strategies to achieve your target band score.",
    content: `
      <h2>Understanding the IELTS Speaking Test Format</h2>
      <p>The IELTS Speaking test is a face-to-face interview with a certified examiner that lasts 11-14 minutes. It's designed to assess your English speaking skills in a realistic conversation setting. Understanding the format is crucial for success.</p>
      
      <h3>Part 1: Introduction and Interview (4-5 minutes)</h3>
      <p>The examiner will ask you general questions about yourself, your home, family, work, studies, and interests. This part helps you relax and get comfortable with the speaking environment.</p>
      
      <h3>Part 2: Individual Long Turn (3-4 minutes)</h3>
      <p>You'll receive a task card with a topic and have one minute to prepare. Then you'll speak for 1-2 minutes on the topic. The examiner may ask one or two follow-up questions.</p>
      
      <h3>Part 3: Two-way Discussion (4-5 minutes)</h3>
      <p>The examiner will ask further questions connected to the topic in Part 2. These questions are more abstract and require you to discuss ideas and opinions in depth.</p>
      
      <h3>New Topics for 2026</h3>
      <ul>
        <li>Environmental sustainability and climate action</li>
        <li>Digital technology and artificial intelligence</li>
        <li>Work-life balance in modern society</li>
        <li>Cultural diversity and global citizenship</li>
        <li>Health and wellness trends</li>
      </ul>
      
      <h3>Preparation Strategies</h3>
      <p>Practice speaking English daily, even if just for 15 minutes. Record yourself and listen back to identify areas for improvement. Join speaking clubs or find a study partner. Most importantly, stay calm and confident during the test!</p>
      
      <p>At Sparkle Knowledge, our expert instructors provide personalized coaching to help you excel in your IELTS Speaking test. Join us today!</p>
    `,
    image: "/hero.png",
    author: {
      name: "Dr. Sarah Johnson",
      verified: true,
      avatar: "/hero.png"
    },
    date: "Jan 15, 2026",
    readTime: "5 min read",
    category: "IELTS",

  },
  {
    id: 2,
    slug: "pte-academic-2026-scoring-guide",
    title: "PTE Academic 2026: Complete Guide to Scoring 79+ in All Sections",
    excerpt: "Discover the secrets to achieving a high score in PTE Academic with our comprehensive preparation guide.",
    content: `
      <h2>Your Path to PTE Success</h2>
      <p>PTE Academic is a computer-based English language test that assesses your reading, writing, listening, and speaking skills. Scoring 79+ requires strategic preparation and understanding of the test format.</p>
      
      <h3>Speaking Section Mastery</h3>
      <p>The speaking section includes Read Aloud, Repeat Sentence, Describe Image, Re-tell Lecture, and Answer Short Question. Practice pronunciation, fluency, and content delivery daily.</p>
      
      <h3>Writing Excellence</h3>
      <p>Focus on Summarize Written Text and Write Essay tasks. Maintain proper structure, grammar, and vocabulary. Time management is crucial—practice writing within time limits.</p>
      
      <h3>Reading Strategies</h3>
      <p>Develop speed reading techniques and practice identifying key information quickly. Work on Multiple Choice, Re-order Paragraphs, and Fill in the Blanks questions regularly.</p>
      
      <h3>Listening Tips</h3>
      <p>Train your ears to understand various accents. Practice Summarize Spoken Text, Multiple Choice, Fill in the Blanks, and Write from Dictation tasks.</p>
      
      <h3>Key Success Factors</h3>
      <ul>
        <li>Consistent daily practice (minimum 2 hours)</li>
        <li>Use official PTE practice materials</li>
        <li>Take regular mock tests</li>
        <li>Analyze your mistakes and improve</li>
        <li>Focus on time management</li>
      </ul>
      
      <p>Join Sparkle Knowledge for expert PTE coaching and achieve your dream score!</p>
    `,
    image: "/hero.png",
    author: {
      name: "Prof. Michael Chen",
      verified: true,
      avatar: ""
    },
    date: "Jan 14, 2026",
    readTime: "6 min read",
    category: "PTE",

  },
  {
    id: 3,
    slug: "toefl-ibt-reading-listening-tips",
    title: "TOEFL iBT 2026: Essential Tips for Reading and Listening Sections",
    excerpt: "Learn effective strategies to maximize your scores in TOEFL Reading and Listening sections.",
    content: `
      <h2>Mastering TOEFL iBT</h2>
      <p>The TOEFL iBT (Internet-Based Test) is widely accepted by universities worldwide. Understanding the test structure and developing effective strategies is key to success.</p>
      
      <h3>Reading Section Strategy</h3>
      <p>You'll have 54-72 minutes to read 3-4 passages and answer 30-40 questions. Each passage is approximately 700 words from academic texts.</p>
      
      <h3>Reading Question Types</h3>
      <ul>
        <li>Factual Information questions</li>
        <li>Negative Factual Information questions</li>
        <li>Inference questions</li>
        <li>Rhetorical Purpose questions</li>
        <li>Vocabulary questions</li>
        <li>Reference questions</li>
        <li>Sentence Simplification questions</li>
        <li>Insert Text questions</li>
        <li>Prose Summary questions</li>
      </ul>
      
      <h3>Listening Section Overview</h3>
      <p>The listening section lasts 41-57 minutes with 3-4 lectures and 2-3 conversations. You'll answer 28-39 questions based on what you hear.</p>
      
      <h3>Listening Tips</h3>
      <ul>
        <li>Take effective notes while listening</li>
        <li>Focus on main ideas and supporting details</li>
        <li>Pay attention to speaker's attitude and purpose</li>
        <li>Practice with various accents</li>
        <li>Don't get stuck on unfamiliar words</li>
      </ul>
      
      <p>Enroll at Sparkle Knowledge for comprehensive TOEFL preparation and expert guidance!</p>
    `,
    image: "/hero.png",
    author: {
      name: "Dr. Emily Rodriguez",
      verified: true,
      avatar: ""
    },
    date: "Jan 13, 2026",
    readTime: "7 min read",
    category: "TOEFL",

  },
  {
    id: 4,
    slug: "oet-writing-success-guide",
    title: "OET for Healthcare Professionals: Writing Sub-test Success Guide",
    excerpt: "Master the OET Writing sub-test with our expert tips tailored for healthcare professionals.",
    content: `
      <h2>OET Writing Sub-test Overview</h2>
      <p>The Occupational English Test (OET) Writing sub-test is profession-specific and assesses your ability to write a letter in a healthcare workplace setting.</p>
      
      <h3>Understanding the Task</h3>
      <p>You'll have 45 minutes to write a letter (usually a referral, discharge, or transfer letter) based on case notes. The letter should be approximately 180-200 words.</p>
      
      <h3>Assessment Criteria</h3>
      <ul>
        <li><strong>Purpose:</strong> Clear communication of the letter's purpose</li>
        <li><strong>Content:</strong> Relevant and accurate information selection</li>
        <li><strong>Conciseness & Clarity:</strong> Efficient use of language</li>
        <li><strong>Genre & Style:</strong> Appropriate professional tone</li>
        <li><strong>Organization & Layout:</strong> Logical structure</li>
        <li><strong>Language:</strong> Grammar, vocabulary, and spelling accuracy</li>
      </ul>
      
      <h3>Key Success Strategies</h3>
      <p>Read the case notes carefully and identify relevant information. Plan your letter structure before writing. Use professional medical terminology appropriately. Maintain a formal yet empathetic tone.</p>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li>Including irrelevant information</li>
        <li>Poor organization and structure</li>
        <li>Inappropriate tone or style</li>
        <li>Grammatical errors and spelling mistakes</li>
        <li>Exceeding or falling short of word count</li>
      </ul>
      
      <p>Join Sparkle Knowledge for specialized OET training with healthcare professionals!</p>
    `,
    image: "/hero.png",
    author: {
      name: "Dr. Priya Sharma",
      verified: true,
      avatar: ""
    },
    date: "Jan 12, 2026",
    readTime: "5 min read",
    category: "OET",

  },
  {
    id: 5,
    slug: "french-learning-roadmap-a1-to-b2",
    title: "French Language Learning: A1 to B2 Level Complete Roadmap",
    excerpt: "Your comprehensive guide to progressing from beginner to upper-intermediate French proficiency.",
    content: `
      <h2>Your French Learning Journey</h2>
      <p>Learning French opens doors to opportunities in education, career, and cultural experiences. This roadmap will guide you from A1 (beginner) to B2 (upper-intermediate) level.</p>
      
      <h3>A1 Level: Absolute Beginner (2-3 months)</h3>
      <p>Focus on basic greetings, introductions, numbers, and simple everyday phrases. Learn present tense conjugations and basic vocabulary (200-300 words).</p>
      
      <h3>A2 Level: Elementary (3-4 months)</h3>
      <p>Expand vocabulary to 600-800 words. Master past tenses (passé composé, imparfait). Practice simple conversations about daily routines, hobbies, and preferences.</p>
      
      <h3>B1 Level: Intermediate (4-6 months)</h3>
      <p>Develop 1500-2000 word vocabulary. Learn future and conditional tenses. Engage in discussions about familiar topics and express opinions clearly.</p>
      
      <h3>B2 Level: Upper-Intermediate (6-8 months)</h3>
      <p>Achieve 3000-4000 word vocabulary. Master subjunctive mood and complex sentence structures. Understand native speakers and express yourself fluently on various topics.</p>
      
      <h3>Study Tips</h3>
      <ul>
        <li>Practice speaking daily, even if alone</li>
        <li>Watch French movies and TV shows with subtitles</li>
        <li>Read French books and articles regularly</li>
        <li>Use language learning apps for daily practice</li>
        <li>Join French conversation groups</li>
        <li>Immerse yourself in French culture</li>
      </ul>
      
      <p>Start your French learning journey with Sparkle Knowledge today!</p>
    `,
    image: "/hero.png",
    author: {
      name: "Marie Dubois",
      verified: true,
      avatar: ""
    },
    date: "Jan 11, 2026",
    readTime: "8 min read",
    category: "French",

  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
