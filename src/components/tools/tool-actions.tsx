'use client'

import { ExternalLink, Github, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FavoriteButton } from './favorite-button'

interface ToolActionsProps {
  toolId: string
  url: string
  githubUrl?: string | null
  docsUrl?: string | null
}

export function ToolActions({ toolId, url, githubUrl, docsUrl }: ToolActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <FavoriteButton toolId={toolId} variant="default" />
      <Button asChild>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-2 h-4 w-4" />
          Visit Website
        </a>
      </Button>
      {githubUrl && (
        <Button variant="outline" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </Button>
      )}
      {docsUrl && (
        <Button variant="outline" asChild>
          <a href={docsUrl} target="_blank" rel="noopener noreferrer">
            <BookOpen className="mr-2 h-4 w-4" />
            Docs
          </a>
        </Button>
      )}
    </div>
  )
}
