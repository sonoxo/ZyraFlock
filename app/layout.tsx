import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ZyraFlock — Visual Search',
  description: 'Privacy-conscious visual search interface prototype.'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
