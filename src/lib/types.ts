export type ApplicationStatus = 'wishlist' | 'applied' | 'interview' | 'offer' | 'rejected'

export interface User {
  id: string
  name: string
  email: string
  program: string | null
  created_at: string
}

export interface Application {
  id: string
  user_id: string
  company: string
  role: string
  status: ApplicationStatus
  posting_link: string | null
  applied_date: string | null
  deadline: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  application_id: string
  title: string
  done: boolean
  due_date: string | null
}

export interface ApplicationWithTasks extends Application {
  tasks: Task[]
}
