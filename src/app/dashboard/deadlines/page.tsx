'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Calendar, AlertTriangle } from 'lucide-react'
import type { Application } from '@/lib/types'
import { formatDate, daysUntil } from '@/lib/date'

export default function DeadlinesPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }
      const { data } = await supabase
        .from('applications')
        .select('*')
        .not('deadline', 'is', null)
        .order('deadline', { ascending: true })
      if (data) setApplications(data)
      setLoading(false)
    }
    load()
  }, [])

  // Split by calendar day so "today" counts as upcoming until the day ends.
  const upcoming = applications.filter(a => a.deadline && daysUntil(a.deadline) >= 0)
  const past = applications.filter(a => a.deadline && daysUntil(a.deadline) < 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Upcoming Deadlines</h1>

      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Loading deadlines…</p>
          </div>
        ) : upcoming.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No upcoming deadlines</p>
          </div>
        ) : (
          upcoming.map(app => {
            const days = daysUntil(app.deadline)
            const urgent = days <= 7
            return (
              <div
                key={app.id}
                className={`bg-white rounded-lg border p-4 ${
                  urgent ? 'border-l-4 border-l-red-400 border-gray-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{app.company}</h3>
                    <p className="text-sm text-gray-600">{app.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{formatDate(app.deadline)}</span>
                    </div>
                    <p
                      className={`text-sm font-medium mt-1 ${
                        urgent ? 'text-red-600' : 'text-gray-500'
                      }`}
                    >
                      {days === 0
                        ? 'Due today!'
                        : days === 1
                        ? 'Due tomorrow'
                        : `${days} days left`}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {past.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">Past Deadlines</h2>
          <div className="space-y-3 opacity-60">
            {past.map(app => (
              <div key={app.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{app.company}</h3>
                    <p className="text-sm text-gray-600">{app.role}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{formatDate(app.deadline)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
