import { Metadata } from 'next'
import { GuideLibrary } from '@/components/learn/guide-library'

export const metadata: Metadata = {
  title: 'Learn - The Vibing Skull',
  description: 'Master AI-powered coding with guides on Claude, ChatGPT, Gemini, coding tools, prompting techniques, and configuration best practices.',
}

export default function LearnPage() {
  return <GuideLibrary />
}
