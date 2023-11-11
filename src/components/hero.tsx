import Image from 'next/image'
import Link from '@/components/hero/link'

export default function Hero() {
  return (
    <div className="min-h-[calc(502px)] h-[calc(100vh-68px)] w-screen flex flex-wrap content-center justify-center bg-desk">
      <div className="flex flex-wrap flex-col content-center justify-center bg-slate-50 p-5 rounded-lg">
        <div className='flex flex-wrap items-center justify-center'>
          <Image
            src="glisowski.jpg"
            alt="profile photo"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col flex-wrap">
          <div>Hi, my name is</div>
          <div className="text-2xl">Grzegorz Lisowski</div>
        </div>
        <div className="flex flex-col flex-wrap content-center justify-center">
          <div>🌟 Full-stack developer</div>
          <div>🕹️ AR/VR developer</div>
          <div>🛠️ creating dynamic web apps since 2013</div>
        </div>

        <div className="flex flex-col flex-wrap py-6">
          <div className="pb-3">You can find me here 👇</div>
          <div className="flex gap-5 place-content-center">
            <Link url="https://fractalsoft.org/" img="fractalsoft.svg" />
            <Link url="https://www.linkedin.com/in/glisowski91/" img="linked-in.svg" />
            <Link url="https://github.com/noplisu" img="github-mark.svg" />
            <Link url="/#contact-form" img="email.svg" target="_self" />
          </div>
        </div>
      </div>
    </div>
  )
}
