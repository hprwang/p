import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 dark:bg-slate-950">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-xl border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-slate-100">
          We couldn&apos;t sign you in
        </h1>
        <p className="mt-2 text-gray-600 dark:text-slate-300">
          Something went wrong while completing your sign-in. This usually means
          the sign-in link expired. Please try signing in again.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/auth/signin"
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-hover transition-colors"
          >
            Back to sign in
          </Link>
          <Link
            href="/"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}