import Link from 'next/link'
import { Logo } from './logo'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">
              Your command center for vibe coding. Discover, compare, and
              organize the best AI coding tools.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Learn</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground">
                  Learning Hub
                </Link>
              </li>
              <li>
                <Link href="/beginners" className="text-sm text-muted-foreground hover:text-foreground">
                  Beginners Guide
                </Link>
              </li>
              <li>
                <Link href="/cheatsheets" className="text-sm text-muted-foreground hover:text-foreground">
                  Prompt Library
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Build</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground">
                  A.I. Tools
                </Link>
              </li>
              <li>
                <Link href="/project-tools" className="text-sm text-muted-foreground hover:text-foreground">
                  Project Tools & Stacks
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm text-muted-foreground hover:text-foreground">
                  News
                </Link>
              </li>
              <li>
                <Link href="/links" className="text-sm text-muted-foreground hover:text-foreground">
                  Important Links
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Account</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} The Vibing Skull. Built for vibe coders.</p>
        </div>
      </div>
    </footer>
  )
}
