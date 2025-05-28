import Sidebar from '@/components/Sidebar'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#333446] text-white">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
