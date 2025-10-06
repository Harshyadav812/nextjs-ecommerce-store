import { Poppins } from 'next/font/google'
import {
  Store,
  ShieldCheck,
  Zap,
  Users,
  TrendingUp,
  Package,
  CreditCard,
  BarChart3,
  Search,
  Bell,
  Lock,
  Smartphone
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="px-4 lg:px-12 py-12 lg:py-20 border-b-4 border-black bg-blue-400">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={cn('text-5xl lg:text-7xl mb-6', poppins.className)}>
            Powerful Features
          </h1>
          <p className="text-xl lg:text-2xl font-medium">
            Everything you need to sell online and grow your business
          </p>
        </div>
      </div>

      {/* For Vendors Section */}
      <div className="px-4 lg:px-12 py-12 lg:py-16">
        <h2 className={cn('text-4xl lg:text-5xl mb-12 text-center', poppins.className)}>
          For Vendors
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Store className="w-10 h-10" />}
            title="Instant Store Setup"
            description="Launch your online store in minutes. No technical skills required."
            color="bg-yellow-300"
          />
          <FeatureCard
            icon={<Package className="w-10 h-10" />}
            title="Product Management"
            description="Easy-to-use dashboard to add, edit, and organize your products."
            color="bg-green-300"
          />
          <FeatureCard
            icon={<CreditCard className="w-10 h-10" />}
            title="Secure Payments"
            description="Stripe-powered checkout. Get paid directly to your account."
            color="bg-purple-300"
          />
          <FeatureCard
            icon={<BarChart3 className="w-10 h-10" />}
            title="Sales Analytics"
            description="Track your performance with real-time sales insights."
            color="bg-orange-300"
          />
          <FeatureCard
            icon={<TrendingUp className="w-10 h-10" />}
            title="Growth Tools"
            description="Categories, tags, and SEO optimization to boost visibility."
            color="bg-pink-300"
          />
          <FeatureCard
            icon={<Bell className="w-10 h-10" />}
            title="Order Notifications"
            description="Stay updated with instant alerts for new orders."
            color="bg-cyan-300"
          />
        </div>
      </div>

      {/* For Customers Section */}
      <div className="px-4 lg:px-12 py-12 lg:py-16 bg-black text-white border-y-4 border-black">
        <h2 className={cn('text-4xl lg:text-5xl mb-12 text-center', poppins.className)}>
          For Customers
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Search className="w-10 h-10" />}
            title="Smart Search"
            description="Find exactly what you need with advanced filters and sorting."
            color="bg-blue-400"
            darkMode
          />
          <FeatureCard
            icon={<Users className="w-10 h-10" />}
            title="Multi-Store Shopping"
            description="Browse products from multiple vendors in one place."
            color="bg-red-400"
            darkMode
          />
          <FeatureCard
            icon={<ShieldCheck className="w-10 h-10" />}
            title="Buyer Protection"
            description="Shop with confidence. Secure transactions guaranteed."
            color="bg-green-400"
            darkMode
          />
          <FeatureCard
            icon={<Zap className="w-10 h-10" />}
            title="Fast Checkout"
            description="Simple, streamlined buying process. No hassle."
            color="bg-yellow-400"
            darkMode
          />
          <FeatureCard
            icon={<Lock className="w-10 h-10" />}
            title="Privacy First"
            description="Your data is protected with industry-standard security."
            color="bg-purple-400"
            darkMode
          />
          <FeatureCard
            icon={<Smartphone className="w-10 h-10" />}
            title="Mobile Ready"
            description="Shop anywhere, anytime. Fully responsive design."
            color="bg-orange-400"
            darkMode
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 lg:px-12 py-16 lg:py-24 bg-blue-400 border-b-4 border-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={cn('text-4xl lg:text-6xl mb-6', poppins.className)}>
            Ready to Start?
          </h2>
          <p className="text-xl lg:text-2xl font-medium mb-10">
            Join hundreds of vendors already selling on our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-4 text-xl font-bold bg-black text-white border-4 border-black rounded-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              Start Selling
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 text-xl font-bold bg-white text-black border-4 border-black rounded-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  darkMode = false,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  darkMode?: boolean
}) {
  return (
    <div
      className={cn(
        'p-6 border-4 border-black rounded-md hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all',
        darkMode ? 'bg-white text-black' : 'bg-white'
      )}
    >
      <div className={cn('inline-flex p-3 rounded-md border-4 border-black mb-4', color)}>
        {icon}
      </div>
      <h3 className={cn('text-2xl mb-2', poppins.className)}>{title}</h3>
      <p className={cn('text-base font-medium', darkMode ? 'text-gray-700' : 'text-gray-600')}>
        {description}
      </p>
    </div>
  )
}
