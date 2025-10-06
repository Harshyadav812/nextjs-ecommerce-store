import { Poppins } from 'next/font/google'
import { Store, ShieldCheck, Zap, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="px-4 lg:px-12 py-16 lg:py-24 border-b-4 border-black bg-yellow-300">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={cn('text-5xl lg:text-7xl mb-8', poppins.className)}>
            Your Marketplace,
            <br />
            Your Way
          </h1>
          <p className="text-xl lg:text-2xl font-medium max-w-2xl mx-auto">
            A modern platform connecting independent vendors with customers who value quality and authenticity.
          </p>
        </div>
      </div>

      {/* What We Do */}
      <div className="px-4 lg:px-12 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className={cn('text-4xl lg:text-5xl mb-8', poppins.className)}>
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-blue-400 border-4 border-black rounded-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className={cn('text-3xl mb-4', poppins.className)}>For Vendors</h3>
              <p className="text-lg font-medium">
                We give you the tools to launch and grow your online business. From store setup to payment processing, everything is handled—so you can focus on what you do best.
              </p>
            </div>
            <div className="p-8 bg-green-300 border-4 border-black rounded-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className={cn('text-3xl mb-4', poppins.className)}>For Customers</h3>
              <p className="text-lg font-medium">
                Discover unique products from independent sellers all in one place. Secure payments, transparent pricing, and quality you can trust.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="px-4 lg:px-12 py-16 lg:py-20 bg-black text-white border-y-4 border-black">
        <div className="max-w-5xl mx-auto">
          <h2 className={cn('text-4xl lg:text-5xl mb-12 text-center', poppins.className)}>
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon={<Store className="w-8 h-8" />}
              title="Multi-Vendor"
              description="Browse from multiple independent stores"
              color="bg-pink-400"
            />
            <ValueCard
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Secure"
              description="Industry-standard payment protection"
              color="bg-cyan-400"
            />
            <ValueCard
              icon={<Zap className="w-8 h-8" />}
              title="Fast"
              description="Streamlined from browse to checkout"
              color="bg-yellow-400"
            />
            <ValueCard
              icon={<Users className="w-8 h-8" />}
              title="Community"
              description="Support independent creators"
              color="bg-purple-400"
            />
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="px-4 lg:px-12 py-16 lg:py-24 bg-red-400 border-b-4 border-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={cn('text-4xl lg:text-6xl mb-6', poppins.className)}>
            Built for Everyone
          </h2>
          <p className="text-xl lg:text-2xl font-medium">
            We believe in empowering small businesses and connecting them with customers who appreciate quality. No corporate middleman, no hidden fees—just honest commerce.
          </p>
        </div>
      </div>
    </div>
  )
}

function ValueCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <div className="bg-white text-black p-6 border-4 border-white rounded-md hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
      <div className={cn('inline-flex p-3 rounded-md border-4 border-black mb-4', color)}>
        {icon}
      </div>
      <h3 className={cn('text-xl mb-2', poppins.className)}>{title}</h3>
      <p className="text-sm font-medium text-gray-700">{description}</p>
    </div>
  )
}
