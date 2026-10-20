export interface Note {
  slug: string
  title: string
  category: string
  readTime: string
  summary: string
  body: string[]
}

// No notes published yet — Notes page shows an empty state until these exist.
export const notes: Note[] = []
