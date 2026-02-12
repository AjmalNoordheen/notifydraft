import React from 'react'
import { DocLogo } from '../component/elements/DocLogo'
import Link from 'next/link'

function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div className=''>
        <div className='px-4 sm:px-6 md:px-8 lg:px-12 border-b border-b-slate-100 flex justify-between items-center'>
            <div className="flex items-center gap-2">
                        <DocLogo height={12} width={12} />
                        <span className="text-lg font-semibold text-foreground">
                          DocuTrack
                        </span>
                      </div>
                      <nav className="flex gap-8">
                        <Link href="/dashbord" className="py-4 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                          Dashboard
                        </Link>
                        <Link href="/dashbord/users" className="py-4 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                          Users
                        </Link>
                      </nav>
        </div>
        <div className='px-4 sm:px-6 md:px-8 lg:px-12 bg-gray-50'>{children}</div>
    </div>
  )
}

export default DashboardLayout