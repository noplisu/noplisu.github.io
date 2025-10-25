import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Projects from '@/components/projects'
import Skills from '@/components/skills'
import Blog from '@/components/blog-server'
import ContactForm from '@/components/contact-form'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Blog />
      <ContactForm />
    </>
  )
}
