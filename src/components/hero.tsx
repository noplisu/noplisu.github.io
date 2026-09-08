import Image from 'next/image'
import Link from '@/components/hero/link'
import { CV_PDF_PATH, profile } from '@/data/profile'

const stackHighlights = ['TypeScript', 'NestJS', 'React', 'Rails', 'Python', 'Go', 'AI / RAG']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 dark:from-gray-900 via-white dark:via-gray-800 to-secondary-50 dark:to-gray-900"></div>
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat opacity-10"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary dark:bg-gradient-primary-dark rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary dark:bg-gradient-secondary-dark rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent-300 dark:bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-0">
        <div className="text-center">
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden />
              Open to full-time remote roles
            </span>
          </div>

          <div className="mb-8 animate-fade-in-up">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-primary dark:bg-gradient-primary-dark rounded-full animate-pulse-slow"></div>
              <div className="relative bg-white dark:bg-gray-800 p-2 rounded-full shadow-hard">
                <Image
                  src="glisowski.jpg"
                  alt={`${profile.name} - ${profile.title}`}
                  width={200}
                  height={200}
                  className="rounded-full shadow-medium"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2 font-medium">Hello, I&apos;m</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text mb-4 leading-tight">
              {profile.name}
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 max-w-4xl mx-auto">
              {profile.title}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{profile.location}</p>
          </div>

          <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Building scalable web apps, real-time AI pipelines, and international e-invoicing—with{' '}
              <span className="font-semibold text-gray-800 dark:text-gray-100">TypeScript</span>,{' '}
              <span className="font-semibold text-gray-800 dark:text-gray-100">NestJS</span>,{' '}
              <span className="font-semibold text-gray-800 dark:text-gray-100">Rails</span>,{' '}
              <span className="font-semibold text-gray-800 dark:text-gray-100">Python</span>, and{' '}
              <span className="font-semibold text-gray-800 dark:text-gray-100">Go</span>.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {stackHighlights.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-soft"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="flex justify-center gap-6 flex-wrap mb-10">
              <Link
                url={profile.linkedin}
                img="linked-in.svg"
                alt="Connect on LinkedIn"
                className="transform hover:scale-110 transition-all duration-300"
              />
              <Link
                url={profile.github}
                img="github-mark.svg"
                alt="View GitHub Profile"
                className="transform hover:scale-110 transition-all duration-300"
              />
              <Link
                url="https://fractalsoft.org/"
                img="fractalsoft.svg"
                alt="Visit Fractal Soft"
                className="transform hover:scale-110 transition-all duration-300"
              />
            </div>
          </div>

          <div className="mt-4 animate-fade-in-up pb-4" style={{animationDelay: '0.8s'}}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CV_PDF_PATH}
                download
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-primary dark:bg-gradient-primary-dark text-white font-semibold rounded-full shadow-glow dark:shadow-glow-red hover:shadow-hard transform hover:-translate-y-1 transition-all duration-300"
              >
                Download CV
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 dark:border-red-500 text-primary-600 dark:text-red-500 font-semibold rounded-full hover:bg-primary-600 dark:hover:bg-red-600 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              >
                See selected work
              </a>
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-full hover:border-primary-600 dark:hover:border-red-500 hover:text-primary-600 dark:hover:text-red-400 transform hover:-translate-y-1 transition-all duration-300"
              >
                Contact / hire
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
