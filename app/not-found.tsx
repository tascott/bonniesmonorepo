import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 font-display text-foreground">404 - Page Not Found</h1>
        <p className="text-lg mb-8 text-muted-foreground">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/">
          <Button>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
