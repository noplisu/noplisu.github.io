import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Experience from '@/components/experience'
import Projects from '@/components/projects'
import Skills from '@/components/skills'
import Blog from '@/components/blog-server'
import ContactForm from '@/components/contact-form'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Blog />
      <ContactForm />
    </>
  )
}
