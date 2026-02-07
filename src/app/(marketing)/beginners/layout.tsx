import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learn AI - Beginners Guide for Kids & Teens | The Vibing Skull',
  description:
    'Bite-sized AI lessons for ages 8-17. Learn prompting, discover free tools, stay safe online, and build cool projects. Beginner to intermediate — no experience needed.',
  keywords: [
    'AI for kids',
    'AI for teens',
    'learn AI',
    'ChatGPT for beginners',
    'Claude for beginners',
    'prompting guide',
    'AI safety kids',
    'free AI tools students',
  ],
}

export default function BeginnersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
