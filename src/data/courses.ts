export type Course = {
  id: string
  title: string
  instructor: string
  progress: number
}

export const courses: Course[] = [
  {
    id: "quantum-ux",
    title: "Quantum UX Foundations",
    instructor: "Nova Ashton",
    progress: 72,
  },
  {
    id: "ai-content",
    title: "AI-Driven Content Strategy",
    instructor: "Kepler Voss",
    progress: 54,
  },
  {
    id: "stellar-presentation",
    title: "Stellar Presentation Skills",
    instructor: "Lyra Quinn",
    progress: 36,
  },
]


