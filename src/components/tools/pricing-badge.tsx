import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const pricingConfig = {
  free: { label: 'Free', variant: 'default' as const, className: 'bg-green-500/10 text-green-500 hover:bg-green-500/20' },
  paid: { label: 'Paid', variant: 'default' as const, className: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' },
  freemium: { label: 'Freemium', variant: 'default' as const, className: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20' },
  open_source: { label: 'Open Source', variant: 'default' as const, className: 'bg-violet-500/10 text-violet-500 hover:bg-violet-500/20' },
}

interface PricingBadgeProps {
  pricing: keyof typeof pricingConfig
  className?: string
}

export function PricingBadge({ pricing, className }: PricingBadgeProps) {
  const config = pricingConfig[pricing]
  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  )
}
