import Link from 'next/link'
import { Rocket } from 'lucide-react'
import ThemeToggle from '@/components/theme/ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/65 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Rocket className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-gray-900 dark:text-slate-100">InternTrack</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors dark:text-slate-300 dark:hover:text-indigo-300">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors dark:text-slate-300 dark:hover:text-indigo-300">
            How it works
          </Link>
          <Link href="/#features" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors dark:text-slate-300 dark:hover:text-indigo-300">
            Features
          </Link>
          <Link href="/#testimonials" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors dark:text-slate-300 dark:hover:text-indigo-300">
            Testimonials
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/auth/signin"
            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors dark:text-slate-200 dark:hover:text-indigo-300"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
