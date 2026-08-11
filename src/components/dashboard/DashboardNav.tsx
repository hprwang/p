'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bell, Menu, User, X, Rocket, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ThemeToggle from '@/components/theme/ThemeToggle'

export default function DashboardNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Rocket className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900 dark:text-slate-100">InternTrack</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-primary dark:text-slate-200 dark:hover:text-indigo-300">Applications</Link>
            <Link href="/dashboard/analytics" className="text-sm font-medium text-gray-700 hover:text-primary dark:text-slate-200 dark:hover:text-indigo-300">Analytics</Link>
            <Link href="/dashboard/deadlines" className="text-sm font-medium text-gray-700 hover:text-primary dark:text-slate-200 dark:hover:text-indigo-300">Deadlines</Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <button type="button" aria-label="Notifications" className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800">
              <Bell className="h-5 w-5" />
            </button>

            <div className="relative">
              <button
                type="button"
                aria-label="Account menu"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <div className="h-8 w-8 rounded-full bg-primary-soft flex items-center justify-center dark:bg-indigo-950/50">
                  <User className="h-4 w-4 text-primary dark:text-indigo-300" />
                </div>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-900 dark:ring-slate-700">
                  <button onClick={handleSignOut} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2 dark:border-slate-800">
            <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md dark:text-slate-200 dark:hover:bg-slate-800">Applications</Link>
            <Link href="/dashboard/analytics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md dark:text-slate-200 dark:hover:bg-slate-800">Analytics</Link>
            <Link href="/dashboard/deadlines" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md dark:text-slate-200 dark:hover:bg-slate-800">Deadlines</Link>
            <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md dark:text-slate-200 dark:hover:bg-slate-800">Sign out</button>
          </div>
        )}
      </div>
    </nav>
  )
}