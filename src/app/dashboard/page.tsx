'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'
import type { Application } from '@/lib/types'
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/constants'
import DashboardStats from '@/components/dashboard/DashboardStats'
import ApplicationModal from '@/components/dashboard/ApplicationModal'

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingApp, setEditingApp] = useState<Application | null>(null)
  const supabase = createClient()

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setApplications(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this application?')) return
    await supabase.from('applications').delete().eq('id', id)
    setApplications(applications.filter(a => a.id !== id))
  }

  const handleEdit = (app: Application) => {
    setEditingApp(app)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setEditingApp(null)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setEditingApp(null)
  }

  const handleSave = async (app: Partial<Application>) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (editingApp) {
      const { data } = await supabase
        .from('applications')
        .update(app)
        .eq('id', editingApp.id)
        .select()
        .single()
      if (data) setApplications(applications.map(a => a.id === data.id ? data : a))
    } else {
      const { data } = await supabase
        .from('applications')
        .insert({ ...app, user_id: user.id })
        .select()
        .single()
      if (data) setApplications([data, ...applications])
    }
    handleModalClose()
  }

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === 'applied').length,
    interview: applications.filter(a => a.status === 'interview').length,
    offer: applications.filter(a => a.status === 'offer').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        <button onClick={handleAdd} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500">
          <Plus className="h-4 w-4" /> Add Application
        </button>
      </div>

      <DashboardStats stats={stats} />

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : applications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4">No applications yet. Add your first one!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deadline</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map(app => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{app.company}</div>
                    {app.posting_link && (
                      <a href={app.posting_link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-500 inline-flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" /> Posting
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{app.role}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[app.status].chip}`}>
                      {STATUS_LABELS[app.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {app.applied_date ? new Date(app.applied_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {app.deadline ? new Date(app.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(app)} className="text-gray-400 hover:text-blue-600 p-1">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(app.id)} className="text-gray-400 hover:text-red-600 p-1 ml-2">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && <ApplicationModal app={editingApp} onClose={handleModalClose} onSave={handleSave} />}
    </div>
  )
}
