export default function DashboardFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 dark:text-slate-400">
          © {new Date().getFullYear()} InternTrack. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
