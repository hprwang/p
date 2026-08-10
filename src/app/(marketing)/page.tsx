import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, TrendingUp, Users } from 'lucide-react'

// Sample applications for the live preview widget
const sampleApplications = [
  { company: 'Google', role: 'Software Engineering Intern', appliedDate: '2024-01-15', status: 'interview' as const },
  { company: 'Meta', role: 'Product Design Intern', appliedDate: '2024-01-12', status: 'applied' as const },
  { company: 'Stripe', role: 'Data Science Intern', appliedDate: '2024-01-08', status: 'offer' as const },
  { company: 'Airbnb', role: 'Frontend Engineering Intern', appliedDate: '2024-01-05', status: 'rejected' as const },
]

const statusColors = {
  wishlist: 'bg-gray-100 text-gray-700',
  applied: 'bg-blue-100 text-blue-700',
  interview: 'bg-purple-100 text-purple-700',
  offer: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

const statusLabels = {
  wishlist: 'Wishlist',
  applied: 'Applied',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
}

const features = [
  {
    icon: CheckCircle,
    title: 'Centralized Tracking',
    description: 'Keep every internship opportunity in one place. Company, role, requirements, and contacts — all organized and searchable.',
  },
  {
    icon: Clock,
    title: 'Deadline Reminders',
    description: 'Never miss an application deadline. Get timely reminders before applications close so you never miss an opportunity.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'Visualize your application journey with charts showing your response rates, interview conversion, and where you stand.',
  },
  {
    icon: Users,
    title: 'Document Checklist',
    description: 'Track which documents are ready for each application. Resume, cover letter, transcripts — stay on top of everything.',
  },
]

const testimonials = [
  {
    quote: 'InternTrack helped me stay organized during my internship search. I went from scattered spreadsheets to a clear picture of where I stood with every application.',
    author: 'Sarah Chen',
    program: 'Computer Science, Stanford University',
    year: 'Landed internship at Google',
  },
  {
    quote: 'The deadline reminders were a lifesaver. I almost missed an application deadline for my dream company. This tool is essential for any serious intern seeker.',
    author: 'Marcus Johnson',
    program: 'Mechanical Engineering, MIT',
    year: 'Landed internship at Tesla',
  },
  {
    quote: 'I loved the analytics view. Seeing my response rate improve over time kept me motivated during a stressful search season.',
    author: 'Emily Rodriguez',
    program: 'Product Management, UC Berkeley',
    year: 'Landed internship at Airbnb',
  },
]

export default function HomePage() {
  const statusCounts = {
    Applied: sampleApplications.filter(a => a.status === 'applied').length,
    Interview: sampleApplications.filter(a => a.status === 'interview').length,
    Offer: sampleApplications.filter(a => a.status === 'offer').length,
    Rejected: sampleApplications.filter(a => a.status === 'rejected').length,
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Track every internship application in one place
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Stay organized, never miss a deadline, and land your dream internship.
              Track applications, manage documents, and visualize your progress.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Start tracking for free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 transition-colors"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview Widget */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Your Applications</h2>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-4 border-b border-gray-200 p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{sampleApplications.length}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{statusCounts.Applied}</div>
                  <div className="text-sm text-gray-600">Applied</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{statusCounts.Interview}</div>
                  <div className="text-sm text-gray-600">Interview</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{statusCounts.Rejected}</div>
                  <div className="text-sm text-gray-600">Rejected</div>
                </div>
              </div>

              {/* Sample Applications */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sampleApplications.map((app, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{app.company}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{app.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[app.status]}`}>
                            {statusLabels[app.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Everything you need to manage your internship search
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Built by students, for students. Every feature designed to help you land that internship.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Loved by students across the country
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See how InternTrack helped these students land their internships.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.program}</div>
                    <div className="text-sm text-blue-600 font-medium mt-1">{testimonial.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ready to organize your internship search?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of students who use InternTrack to land their dream internships.
            </p>
            <div className="mt-10">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Get started free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}