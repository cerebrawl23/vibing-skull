import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const sourceConfig = {
  reddit: { label: 'Reddit', className: 'bg-orange-500/10 text-orange-500' },
  hackernews: { label: 'HN', className: 'bg-orange-600/10 text-orange-600' },
  devto: { label: 'Dev.to', className: 'bg-blue-500/10 text-blue-500' },
}

interface NewsSourceBadgeProps {
  source: keyof typeof sourceConfig
  className?: string
}

export function NewsSourceBadge({ source, className }: NewsSourceBadgeProps) {
  const config = sourceConfig[source]
  return (
    <Badge variant="default" className={cn(config.className, 'text-xs', className)}>
      {config.label}
    </Badge>
  )
}
