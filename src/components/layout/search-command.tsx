'use client'

import { useRouter } from 'next/navigation'
import { Code, Newspaper, Workflow } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

interface SearchCommandProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter()

  const navigate = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search tools, news, workflows..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick Links">
          <CommandItem onSelect={() => navigate('/tools')}>
            <Code className="mr-2 h-4 w-4" />
            <span>Browse Tools</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/news')}>
            <Newspaper className="mr-2 h-4 w-4" />
            <span>Latest News</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/workflows')}>
            <Workflow className="mr-2 h-4 w-4" />
            <span>Workflow Templates</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Categories">
          <CommandItem onSelect={() => navigate('/tools?category=ai-code-assistants')}>
            <span>AI Code Assistants</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/tools?category=ai-design-ui')}>
            <span>AI Design & UI</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/tools?category=prompting-context')}>
            <span>Prompting & Context</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/tools?category=deployment-backend')}>
            <span>Deployment & Backend</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
