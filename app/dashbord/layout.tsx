import React from 'react'
import { DocLogo } from '../component/elements/DocLogo'

function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div className=''>
        <div className='px-20 border-b border-b-slate-100 flex justify-between items-center'>
            <div className="flex items-center gap-2">
                        <DocLogo height={12} width={12} />
                        <span className="text-lg font-semibold text-foreground">
                          DocuTrack
                        </span>
                      </div>
                      <div>
                        
                      </div>
        </div>
        <div className='px-20'>{children}</div>
    </div>
  )
}

export default DashboardLayout