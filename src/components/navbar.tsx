import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="navbar bg-white sticky top-0">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl" >Grzegorz L</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
            <li><Link href="/#contact-form">Contact</Link></li>
        </ul>
      </div>
    </div>
  )
}
