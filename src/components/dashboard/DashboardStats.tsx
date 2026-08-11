'use client'

interface Stats {
  total: number
  applied: number
  interview: number
  offer: number
  rejected: number
}

export default function DashboardStats({ stats }: { stats: Stats }) {
  const items = [
    { label: 'Total', value: stats.total, color: 'text-gray-900 dark:text-slate-100' },
    { label: 'Applied', value: stats.applied, color: 'text-primary dark:text-indigo-300' },
    { label: 'Interview', value: stats.interview, color: 'text-purple-600 dark:text-purple-300' },
    { label: 'Offer', value: stats.offer, color: 'text-green-600 dark:text-green-300' },
    { label: 'Rejected', value: stats.rejected, color: 'text-red-600 dark:text-red-300' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map(item => (
        <div key={item.label} className="bg-white rounded-lg border border-gray-200 p-4 text-center dark:bg-slate-800 dark:border-slate-700">
          <div className={`text-3xl font-bold ${item.color}`}>{item.value}</div>
          <div className="text-sm text-gray-600 dark:text-slate-300 mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
