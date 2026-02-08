import { Metadata } from 'next'
import { PromptLibrary } from '@/components/prompts/prompt-library'

export const metadata: Metadata = {
  title: 'Prompt Library - The Vibing Skull',
  description: '65+ copy-ready prompt templates for coding, writing, business, marketing, learning, and more. Find the perfect prompt and copy it in one click.',
}

export default function CheatSheetsPage() {
  return <PromptLibrary />
}
