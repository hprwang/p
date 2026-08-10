import type { ApplicationStatus } from '@/lib/types'

export const STATUSES: ApplicationStatus[] = [
  'wishlist',
  'applied',
  'interview',
  'offer',
  'rejected',
]

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  wishlist: 'Wishlist',
  applied: 'Applied',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
}

export const STATUS_COLORS: Record<
  ApplicationStatus,
  { chip: string; dot: string; hex: string }
> = {
  wishlist: { chip: 'bg-gray-100 text-gray-700', dot: 'bg-gray-400', hex: '#9ca3af' },
  applied: { chip: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', hex: '#3b82f6' },
  interview: { chip: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500', hex: '#a855f7' },
  offer: { chip: 'bg-green-100 text-green-700', dot: 'bg-green-500', hex: '#22c55e' },
  rejected: { chip: 'bg-red-100 text-red-700', dot: 'bg-red-500', hex: '#ef4444' },
}

export const DOCUMENT_TASKS = ['Resume', 'Cover Letter', 'Transcript'] as const
