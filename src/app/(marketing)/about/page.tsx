import { CheckCircle, Users, TrendingUp, Clock } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">How InternTrack Works</h1>

          <p className="text-lg text-gray-600 mb-12">
            InternTrack helps students stay organized during their internship search.
            Track every application, manage deadlines, and visualize your progress—all in one place.
          </p>

          <div className="space-y-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Add Your Applications</h2>
                <p className="text-gray-600">
                  Log every internship opportunity with company name, role, posting link, and deadline. Keep everything in one place.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Track Your Progress</h2>
                <p className="text-gray-600">
                  Move applications through stages: Wishlist → Applied → Interview → Offer or Rejected.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Visualize & Improve</h2>
                <p className="text-gray-600">
                  View analytics showing your application activity, response rates, and status breakdowns.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Never Miss a Deadline</h2>
                <p className="text-gray-600">
                  Upcoming deadlines are highlighted and sorted by urgency so you never miss an application.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-primary-soft rounded-xl p-8 text-center border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of students using InternTrack to land their dream internships.
            </p>
            <a
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-primary-hover hover:shadow-lg transition-all"
            >
              Create your free account
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
