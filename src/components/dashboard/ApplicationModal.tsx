'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { Application, ApplicationStatus } from '@/lib/types'
import { STATUS_LABELS, DOCUMENT_TASKS } from '@/lib/constants'

interface Props {
  app: Application | null
  onClose: () => void
  onSave: (app: Partial<Application>) => void
}

interface FormState {
  company: string
  role: string
  status: ApplicationStatus
  posting_link: string
  applied_date: string
  deadline: string
  notes: string
}

export default function ApplicationModal({ app, onClose, onSave }: Props) {
  const [form, setForm] = useState<FormState>({
    company: '', role: '', status: 'wishlist',
    posting_link: '', applied_date: '', deadline: '', notes: ''
  })

  useEffect(() => {
    if (app) {
      setForm({
        company: app.company, role: app.role, status: app.status,
        posting_link: app.posting_link || '', applied_date: app.applied_date || '',
        deadline: app.deadline || '', notes: app.notes || ''
      })
    }
  }, [app])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      company: form.company,
      role: form.role,
      status: form.status,
      posting_link: form.posting_link || null,
      applied_date: form.applied_date || null,
      deadline: form.deadline || null,
      notes: form.notes || null,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{app ? 'Edit Application' : 'New Application'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input required type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Google" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input required type="text" value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="SWE Intern" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value as ApplicationStatus})} className="w-full px-3 py-2 border rounded-lg">
              {(Object.keys(STATUS_LABELS) as ApplicationStatus[]).map(status => (
                <option key={status} value={status}>{STATUS_LABELS[status]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Posting Link</label>
            <input type="url" value={form.posting_link} onChange={e => setForm({...form, posting_link: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="https://..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Applied Date</label>
              <input type="date" value={form.applied_date} onChange={e => setForm({...form, applied_date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="w-full px-3 py-2 border rounded-lg" rows={3} placeholder="Contacts, follow-up, etc." />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">{app ? 'Save' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
