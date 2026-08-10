'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import type { Application, ApplicationStatus } from '@/lib/types'
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/constants'

export default function AnalyticsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('applications').select('*')
      if (data) setApplications(data)
    }
    load()
  }, [])

  const statusData = (Object.keys(STATUS_LABELS) as ApplicationStatus[]).map(status => ({
    name: STATUS_LABELS[status],
    value: applications.filter(a => a.status === status).length,
    color: STATUS_COLORS[status].hex
  })).filter(d => d.value > 0)

  const monthlyData = Object.entries(
    applications.reduce((acc, app) => {
      const month = app.applied_date
        ? new Date(app.applied_date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        : 'Unknown'
      acc[month] = (acc[month] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ).map(([month, count]) => ({ month, count }))

  const responseRate = applications.length > 0
    ? Math.round((applications.filter(a => a.status !== 'wishlist' && a.status !== 'rejected').length / applications.length) * 100)
    : 0

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Applications by Status</h2>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {statusData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No data yet</p>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Applications Over Time</h2>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No data yet</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Response Rate</h2>
        <div className="text-4xl font-bold text-gray-900">{responseRate}%</div>
        <p className="text-gray-600 mt-1">Applications that have moved past the initial stage</p>
      </div>
    </div>
  )
}
