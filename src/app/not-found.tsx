import Link from 'next/link'
import { Skull, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <Skull className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        <h1 className="mt-6 text-4xl font-bold">404</h1>
        <h2 className="mt-2 text-xl font-semibold text-muted-foreground">
          Page Not Found
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/tools">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse Tools
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
