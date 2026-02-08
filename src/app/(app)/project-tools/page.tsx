import { Metadata } from 'next'
import { ProjectGuideLibrary } from '@/components/project-tools/project-guide-library'

export const metadata: Metadata = {
  title: 'Project Tools & Guides - The Vibing Skull',
  description: 'Tech stacks, project kickoff prompts, 18 best practices, essential project files, and common pitfalls for AI-assisted vibe coding projects.',
}

export default function ProjectToolsPage() {
  return <ProjectGuideLibrary />
}
