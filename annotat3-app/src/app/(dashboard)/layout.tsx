// TODO: needed by useState, move to another file
"use client"
import { useState } from 'react'

import { CeramicContextProvider } from '@/context/ceramic.context'
import '../../styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from "@/components/sidebar";
import { Profile } from '@/types'
import SidebarProvider from '@/providers/SidebarProvider'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Home',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [profile, setProfile] = useState<Profile | undefined>()

  return (
    <html lang="en">
      <body className={inter.className}>
        <CeramicContextProvider>
          <SidebarProvider>
          <section className="flex h-full w-full">
                    <Sidebar />

                    {/* Navbar & Main Content */}
                    <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">

                        {/* Main Content */}
                        <main className='mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]' >
                            {/* Routes */}
                            <div className="h-full">
                                {/* <Navbar /> */}

                                <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                                    {children}
                                </div>

                                <div className="p-3">
                                    {/* <Footer /> */}
                                </div>
                            </div>
                        </main>

                    </div>

                </section>
          </SidebarProvider>
        <Sidebar name = {profile?.name} username = {profile?.username} id={profile?.id}/>
        {children}
        </CeramicContextProvider>

        </body>
    </html>
  )
}