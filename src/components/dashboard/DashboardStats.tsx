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
    { label: 'Total', value: stats.total, color: 'text-gray-900' },
    { label: 'Applied', value: stats.applied, color: 'text-primary' },
    { label: 'Interview', value: stats.interview, color: 'text-purple-600' },
    { label: 'Offer', value: stats.offer, color: 'text-green-600' },
    { label: 'Rejected', value: stats.rejected, color: 'text-red-600' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map(item => (
        <div key={item.label} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className={`text-3xl font-bold ${item.color}`}>{item.value}</div>
          <div className="text-sm text-gray-600 mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
