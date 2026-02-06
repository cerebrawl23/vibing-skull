import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Tools',
  description: 'Compare AI coding tools side by side.',
}

export default function CompareToolsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Compare Tools</h1>
      <p className="text-muted-foreground">
        Select 2-4 tools to compare side by side
      </p>

      <div className="mt-8 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
        <p className="text-lg font-medium">Tool comparison coming soon</p>
        <p className="mt-1 text-sm">
          Side-by-side feature matrices, pros/cons, and pricing comparison
        </p>
      </div>
    </div>
  )
}
