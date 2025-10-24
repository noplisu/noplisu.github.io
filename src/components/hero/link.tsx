import Image from 'next/image'
import Link from 'next/link'

export default function Hero(props : {url: string, img: string, alt: string, target?: string, className?: string}) {
  const { url, img, alt, target, className = "" } = props;
  return (
    <Link 
      href={url} 
      target={target ? target : "_blank"}
      className={`group relative p-4 bg-white rounded-full shadow-soft hover:shadow-medium transition-all duration-300 ${className}`}
      aria-label={alt}
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        <Image
          src={img}
          alt={alt}
          width={48}
          height={48}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </Link>
  )
}