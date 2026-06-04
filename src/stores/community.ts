export type CommunityCategory =
  | 'College comparison'
  | 'Admissions'
  | 'Fees'
  | 'Hostel/PG'
  | 'Scholarships'
  | 'Campus life'

export type VoteValue = -1 | 0 | 1

export interface CommunityComment {
  id: string
  author: string
  body: string
  createdAt: string
}

export interface CommunityPost {
  id: string
  title: string
  body: string
  category: CommunityCategory
  tags: string[]
  author: string
  createdAt: string
  score: number
  userVote: VoteValue
  comments: CommunityComment[]
}

const COMMUNITY_KEY = 'margadarshi_community_posts'

export const COMMUNITY_CATEGORIES: CommunityCategory[] = [
  'College comparison',
  'Admissions',
  'Fees',
  'Hostel/PG',
  'Scholarships',
  'Campus life',
]

export const SEEDED_POSTS: CommunityPost[] = [
  {
    id: 'seed-rv-vs-bms',
    title: 'RV College or BMS College for CSE if hostel cost matters?',
    body: 'I am comparing CSE options in Bengaluru. RV looks stronger for placements, but BMS may be easier for commute from my relative house. How should I think about total cost and daily travel?',
    category: 'College comparison',
    tags: ['RVCE', 'BMSCE', 'CSE', 'Bengaluru'],
    author: 'PUC student',
    createdAt: '2026-05-20T09:30:00.000Z',
    score: 42,
    userVote: 0,
    comments: [
      {
        id: 'seed-rv-vs-bms-c1',
        author: 'Senior student',
        body: 'Make a monthly budget first: fees, hostel or PG, food, bus/metro, books, and exam costs. A slightly lower ranked college can still be better if it lets you study without money pressure.',
        createdAt: '2026-05-20T10:12:00.000Z',
      },
      {
        id: 'seed-rv-vs-bms-c2',
        author: 'Counsellor',
        body: 'Also compare branch cutoffs and scholarship options. If both are realistic, talk to current students about commute time during exam weeks.',
        createdAt: '2026-05-20T11:18:00.000Z',
      },
    ],
  },
  {
    id: 'seed-government-degree',
    title: 'Best government degree colleges near Mysuru for B.Sc Computer Science?',
    body: 'Private college fees are difficult for my family. I want B.Sc Computer Science or BCA near Mysuru. Which colleges have decent labs and placement support?',
    category: 'Fees',
    tags: ['Mysuru', 'B.Sc CS', 'BCA', 'Government college'],
    author: 'Class 12 student',
    createdAt: '2026-05-18T14:45:00.000Z',
    score: 31,
    userVote: 0,
    comments: [
      {
        id: 'seed-government-degree-c1',
        author: 'BCA graduate',
        body: 'Check whether the college has active lab hours, internship guidance, and tie-ups. For CS, your self-practice and projects matter a lot too.',
        createdAt: '2026-05-18T15:20:00.000Z',
      },
    ],
  },
  {
    id: 'seed-hostel-safety',
    title: 'How do I judge hostel safety before selecting a college?',
    body: 'My parents are worried because I may need to stay away from home. What questions should we ask during campus visit?',
    category: 'Hostel/PG',
    tags: ['Hostel', 'Safety', 'Campus visit'],
    author: 'First-gen learner',
    createdAt: '2026-05-15T08:10:00.000Z',
    score: 28,
    userVote: 0,
    comments: [
      {
        id: 'seed-hostel-safety-c1',
        author: 'Parent',
        body: 'Ask about wardens, entry timing, emergency contacts, medical support, distance to classrooms, and whether seniors live in the same block.',
        createdAt: '2026-05-15T09:05:00.000Z',
      },
      {
        id: 'seed-hostel-safety-c2',
        author: 'Final year student',
        body: 'Try to speak to two current hostel students without staff nearby. They will tell you about food, water, study environment, and rules.',
        createdAt: '2026-05-15T09:40:00.000Z',
      },
    ],
  },
  {
    id: 'seed-scholarship-docs',
    title: 'Which documents should I prepare before scholarship applications?',
    body: 'I do not want to miss deadlines after admissions start. What documents are usually needed for Karnataka students applying for fee support?',
    category: 'Scholarships',
    tags: ['Scholarships', 'Documents', 'Income certificate'],
    author: 'Diploma aspirant',
    createdAt: '2026-05-10T16:05:00.000Z',
    score: 24,
    userVote: 0,
    comments: [
      {
        id: 'seed-scholarship-docs-c1',
        author: 'College office volunteer',
        body: 'Keep income certificate, caste certificate if applicable, Aadhaar, bank passbook, marks cards, admission receipt, and passport photos ready.',
        createdAt: '2026-05-10T16:42:00.000Z',
      },
    ],
  },
]

export function loadCommunityPosts(): CommunityPost[] {
  const stored = localStorage.getItem(COMMUNITY_KEY)
  if (!stored) return SEEDED_POSTS

  try {
    const parsed = JSON.parse(stored) as CommunityPost[]
    if (!Array.isArray(parsed)) return SEEDED_POSTS
    return parsed
  } catch {
    return SEEDED_POSTS
  }
}

export function saveCommunityPosts(posts: CommunityPost[]): void {
  localStorage.setItem(COMMUNITY_KEY, JSON.stringify(posts))
}

export function createCommunityPost(input: {
  title: string
  body: string
  category: CommunityCategory
  tags: string[]
}): CommunityPost {
  return {
    id: `post-${Date.now()}`,
    title: input.title,
    body: input.body,
    category: input.category,
    tags: input.tags,
    author: 'Margadarshi student',
    createdAt: new Date().toISOString(),
    score: 1,
    userVote: 1,
    comments: [],
  }
}

export function createCommunityComment(body: string): CommunityComment {
  return {
    id: `comment-${Date.now()}`,
    author: 'Margadarshi student',
    body,
    createdAt: new Date().toISOString(),
  }
}
