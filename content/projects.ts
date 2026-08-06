export type Status = 'live' | 'building' | 'review' | 'complete'

export type Evidence = { value: string; label: string }

export type Project = {
  slug: string
  name: string
  hook: string
  tags: string[]
  evidence: Evidence[]
  year: string
  status: Status
  featured: boolean
  order: number
}

export const projects: Project[] = [
  {
    slug: 'sift',
    name: 'Sift',
    hook: 'Shipped to the App Store. Then the analytics showed nobody finished onboarding — and personalization worked anyway.',
    tags: ['React Native', 'Supabase', 'Amplitude'],
    evidence: [
      { value: '0 of 41', label: 'completed the taste-setter' },
      { value: '60%', label: 'reached full confidence' },
    ],
    year: '2025–2026',
    status: 'live',
    featured: true,
    order: 1,
  },
  {
    slug: 'conviction',
    name: 'Conviction',
    hook: "Diffs a company's risk factors year over year, so you see what changed in the language — not just the numbers.",
    tags: ['RAG', 'GPT-4o', 'ChromaDB', 'SEC EDGAR'],
    evidence: [
      { value: 'TODO', label: 'chunks indexed' },
      { value: 'TODO', label: 'eval pairs' },
    ],
    year: '2026',
    status: 'building',
    featured: true,
    order: 2,
  },
  {
    slug: 'scout',
    name: 'Scout',
    hook: 'An MCP host that orchestrates Gmail, Calendar, Obsidian and web search to run my own job search.',
    tags: ['MCP', 'Agents', 'OAuth 2.1'],
    evidence: [{ value: '6', label: 'servers, 1 authored' }],
    year: '2026',
    status: 'building',
    featured: true,
    order: 3,
  },
  {
    slug: 'dart-rag',
    name: 'dart-rag',
    hook: 'Korean-language retrieval benchmark against frontier models on corporate filings.',
    tags: ['multilingual-E5', 'DART'],
    evidence: [{ value: '4', label: 'models compared' }],
    year: '2026',
    status: 'building',
    featured: false,
    order: 4,
  },
  {
    slug: 'swish',
    name: 'SWISH',
    hook: 'Predicting a basketball free throw from the shooter’s 3D pose at release.',
    tags: ['YOLOv8-pose', 'SAM3D Body', 'PyTorch'],
    evidence: [
      { value: '91.95%', label: 'accuracy, 0.97 AUC' },
      { value: '88 / 88', label: 'high-confidence misses' },
    ],
    year: '2025',
    status: 'complete',
    featured: false,
    order: 5,
  },
]

export const featured = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order)
export const allProjects = [...projects].sort((a, b) => a.order - b.order)
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug)

export const writing = [
  {
    slug: 'implicit-signals',
    title: 'When implicit signals beat the onboarding flow',
    excerpt: 'What a zero-percent completion rate taught me about asking users things.',
    date: 'Jul 2026',
  },
  {
    slug: 'citation-fidelity',
    title: 'Notes on citation fidelity in retrieval systems',
    excerpt: 'A fluent answer with a wrong citation is the worst failure mode there is.',
    date: 'Jun 2026',
  },
]

export const experience = [
  {
    slug: 'bofa',
    title: 'Bank of America',
    excerpt: 'Product manager, FICC e-trading. Four years between traders, quants and engineers.',
    date: '2021–2025',
  },
  {
    slug: 'sea-lab',
    title: 'SEA Lab',
    excerpt: 'A multi-agent system for mental rehearsal. Under submission to CHI 2027.',
    date: '2026',
  },
]
