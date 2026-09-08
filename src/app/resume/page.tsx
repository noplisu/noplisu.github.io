import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import PrintButton from '@/components/resume/print-button'
import experience from '@/data/experience'
import coreSkills from '@/data/core-skills'
import { CV_PDF_PATH, profile } from '@/data/profile'

export const metadata: Metadata = {
  title: `CV | ${profile.name} — ${profile.title}`,
  description: profile.summary,
}

export default function ResumePage() {
  const role = experience[0]

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 print:hidden">
            <Link
              href="/"
              className="text-primary-600 dark:text-red-400 font-medium hover:underline"
            >
              ← Back to portfolio
            </Link>
            <div className="flex flex-wrap gap-3">
              <a
                href={CV_PDF_PATH}
                download
                className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-primary dark:bg-gradient-primary-dark text-white font-semibold rounded-full shadow-soft hover:shadow-glow dark:hover:shadow-glow-red transition-all duration-300"
              >
                Download PDF
              </a>
              <PrintButton />
            </div>
          </div>

          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8 sm:p-10 print:shadow-none print:border-0 print:rounded-none">
            <header className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
                Open to full-time remote roles
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                {profile.name}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mt-1">
                {profile.title}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{profile.location}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                {profile.summary}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-primary-600 dark:text-red-400">
                <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="hover:underline">{profile.phone}</a>
                <a href={profile.website} className="hover:underline">noplisu.com</a>
                <a href={profile.github} className="hover:underline">GitHub</a>
                <a href={profile.linkedin} className="hover:underline">LinkedIn</a>
              </div>
            </header>

            <section className="mb-8">
              <h2 className="text-lg font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-4">
                Technical skills
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {coreSkills.map((skill) => (
                  <li key={skill.name} className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{skill.name}</span>
                    <span className="text-gray-500 dark:text-gray-400"> — {skill.detail}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-4">
                Experience & key deliveries
              </h2>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-2">
                <h3 className="font-bold text-gray-900 dark:text-gray-100">
                  {role.role} · {role.company}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
                  {role.period}
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{role.location}</p>
              <ul className="list-disc pl-5 space-y-2">
                {role.highlights.map((item) => (
                  <li key={item} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-4">
                Education, certifications & languages
              </h2>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Education:</span>{' '}
                  {profile.education}
                </li>
                <li>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Certifications:</span>{' '}
                  {profile.certifications.join(', ')}
                </li>
                <li>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Languages:</span>{' '}
                  {profile.languages.join(', ')}
                </li>
              </ul>
            </section>
          </article>
        </div>
      </main>
    </>
  )
}
