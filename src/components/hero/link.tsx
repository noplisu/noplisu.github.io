import Image from 'next/image'
import Link from 'next/link'

export default function Hero(props : {url: string, img: string, target?: string}) {
  const { url, img, target } = props;
  return (
    <Link href={url} target={target ? target : "_blank"}>
      <Image
      src={img}
      alt="fractalsoft"
      width={50}
      height={50}
      />
    </Link>
  )
}