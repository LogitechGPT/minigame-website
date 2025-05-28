'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/create', label: 'Create' },
  { href: '/dashboard/edit', label: 'Edit' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#2B2C3B] border-r-2 border-[#6FE6FC] p-6">
      <h1 className="text-xl font-bold mb-6">Moderator Panel</h1>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <span
              className={`block px-4 py-2 rounded-md cursor-pointer hover:bg-[#6FE6FC] hover:text-[#333446] transition ${
                pathname === link.href ? 'bg-[#6FE6FC] text-[#333446]' : ''
              }`}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
