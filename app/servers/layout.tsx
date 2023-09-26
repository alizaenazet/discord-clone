import NavigationNavbar from '@/components/navigation/navigation-navbar'
import React from 'react'

function MainLayout({
    children
}:{
    children : React.ReactNode
}) {
  return (
    <div className='h-full'>
        <div className='hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0'>
        <NavigationNavbar></NavigationNavbar>
        </div>
    <main className='md:pl-[72px] h-full'>
        {children}
    </main>
    </div>
  )
}

export default MainLayout