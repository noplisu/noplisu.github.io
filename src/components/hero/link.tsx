import Image from 'next/image'
import Link from 'next/link'

export default function Hero(props : {url: string, img: string}) {
  const { url, img } = props;
  return (
    <Link href={url} target="_blank">
      <Image
      src={img}
      alt="fractalsoft"
      width={50}
      height={50}
      />
    </Link>
  )
}