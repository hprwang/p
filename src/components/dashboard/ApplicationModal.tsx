'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { Application, ApplicationStatus } from '@/lib/types'
import { STATUS_LABELS, DOCUMENT_TASKS } from '@/lib/constants'

interface Props {
  app: Application | null
  onClose: () => void
  onSave: (app: Partial<Application>) => Promise<{ ok: boolean; error?: string }>
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
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (app) {
      setForm({
        company: app.company, role: app.role, status: app.status,
        posting_link: app.posting_link || '', applied_date: app.applied_date || '',
        deadline: app.deadline || '', notes: app.notes || ''
      })
    }
  }, [app])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    const result = await onSave({
      company: form.company,
      role: form.role,
      status: form.status,
      posting_link: form.posting_link || null,
      applied_date: form.applied_date || null,
      deadline: form.deadline || null,
      notes: form.notes || null,
    })

    // The parent only closes the modal on success, so a failure keeps this open.
    if (!result.ok) {
      setSubmitError(result.error ?? 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto dark:bg-slate-800" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold dark:text-slate-100">{app ? 'Edit Application' : 'New Application'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">Company</label>
              <input required type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500" placeholder="Google" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">Role</label>
              <input required type="text" value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500" placeholder="SWE Intern" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">Status</label>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value as ApplicationStatus})} className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500">
              {(Object.keys(STATUS_LABELS) as ApplicationStatus[]).map(status => (
                <option key={status} value={status}>{STATUS_LABELS[status]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">Posting Link</label>
            <input type="url" value={form.posting_link} onChange={e => setForm({...form, posting_link: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500" placeholder="https://..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">Applied Date</label>
              <input type="date" value={form.applied_date} onChange={e => setForm({...form, applied_date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">Deadline</label>
              <input type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">Notes</label>
            <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500" rows={3} placeholder="Contacts, follow-up, etc." />
          </div>

          {submitError && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 dark:bg-red-950/40 dark:border-red-900">
              <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-hover">{app ? 'Save' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
