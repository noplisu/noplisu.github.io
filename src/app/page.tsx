import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import ContactForm from '@/components/contact-form'
import Skills from '@/components/skills'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <ContactForm />
    </>
  )
}
