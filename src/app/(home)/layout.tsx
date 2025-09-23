import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#f4f4f4]">{children}</div>
      <Footer />
    </div>
  )
}
