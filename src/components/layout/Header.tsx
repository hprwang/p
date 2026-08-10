import Link from 'next/link'
import { Rocket } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Rocket className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">InternTrack</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            How it works
          </Link>
          <Link href="/#features" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="/#testimonials" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Testimonials
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
