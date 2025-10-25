import Image from 'next/image'
import Link from '@/components/hero/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat opacity-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Profile image with enhanced styling */}
          <div className="mb-8 animate-fade-in-up">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-primary rounded-full animate-pulse-slow"></div>
              <div className="relative bg-white p-2 rounded-full shadow-hard">
                <Image
                  src="glisowski.jpg"
                  alt="Grzegorz Lisowski - Full Stack Developer"
                  width={200}
                  height={200}
                  className="rounded-full shadow-medium"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Greeting and name */}
          <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <p className="text-lg text-gray-600 mb-2 font-medium">Hello, I&apos;m</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text mb-4 leading-tight">
              Grzegorz Lisowski
            </h1>
          </div>

          {/* Professional titles with enhanced styling */}
          <div className="mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
                <span className="inline-flex items-center gap-2">
                  <span className="text-3xl">🚀</span>
                  Full-Stack Developer
                </span>
              </h2>
              <h3 className="text-xl sm:text-2xl text-gray-600">
                <span className="inline-flex items-center gap-2">
                  <span className="text-2xl">🕹️</span>
                  AR/VR Specialist
                </span>
              </h3>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Crafting exceptional digital experiences since 2013
              </p>
            </div>
          </div>

          {/* Social links with enhanced design */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <p className="text-gray-600 mb-6 text-lg font-medium">Let&apos;s connect</p>
            <div className="flex justify-center gap-6 flex-wrap">
              <Link 
                url="https://fractalsoft.org/" 
                img="fractalsoft.svg" 
                alt="Visit Fractalsoft" 
                className="transform hover:scale-110 transition-all duration-300"
              />
              <Link 
                url="https://www.linkedin.com/in/glisowski91/" 
                img="linked-in.svg" 
                alt="Connect on LinkedIn" 
                className="transform hover:scale-110 transition-all duration-300"
              />
              <Link 
                url="https://github.com/noplisu" 
                img="github-mark.svg" 
                alt="View GitHub Profile" 
                className="transform hover:scale-110 transition-all duration-300"
              />
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="mt-12 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#projects" 
                className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white font-semibold rounded-full shadow-glow hover:shadow-hard transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="mr-2">🚀</span>
                View My Work
              </a>
              <a 
                href="#blog" 
                className="inline-flex items-center px-8 py-4 border-2 border-primary-600 text-primary-600 font-semibold rounded-full hover:bg-primary-600 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="mr-2">📝</span>
                Read Articles
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
