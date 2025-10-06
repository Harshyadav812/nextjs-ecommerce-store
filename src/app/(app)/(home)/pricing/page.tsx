import { Poppins } from 'next/font/google'
import { Check, X, TrendingUp, CreditCard, Zap, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="px-4 lg:px-12 py-16 lg:py-24 border-b-4 border-black bg-green-300">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={cn('text-5xl lg:text-7xl mb-8', poppins.className)}>
            Simple, Honest Pricing
          </h1>
          <p className="text-xl lg:text-2xl font-medium">
            No hidden fees. No monthly charges. Just 10% per sale.
          </p>
        </div>
      </div>

      {/* Main Pricing Card */}
      <div className="px-4 lg:px-12 py-16 lg:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border-4 border-black rounded-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            {/* Card Header */}
            <div className="text-center px-8 lg:px-12 pt-10 pb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-300 border-4 border-black rounded-lg mb-8">
                <TrendingUp className="w-10 h-10" strokeWidth={2.5} />
              </div>
              <h2 className={cn('text-3xl lg:text-4xl mb-8', poppins.className)}>
                Pay As You Grow
              </h2>
              <div className="flex items-baseline justify-center gap-3 mb-4">
                <span className={cn('text-6xl lg:text-7xl leading-none', poppins.className)}>10%</span>
                <span className={cn('text-2xl lg:text-3xl', poppins.className)}>per sale</span>
              </div>
              <p className="text-lg font-medium text-gray-600 max-w-md mx-auto">
                Only pay when you make money. That's it.
              </p>
            </div>

            {/* Features List */}
            <div className="px-8 lg:px-12 py-8 space-y-3">
              <FeatureItem text="No setup fees" />
              <FeatureItem text="No monthly subscription" />
              <FeatureItem text="No listing fees" />
              <FeatureItem text="No hidden charges" />
              <FeatureItem text="Unlimited products" />
              <FeatureItem text="Unlimited bandwidth" />
            </div>

            {/* CTA Button */}
            <div className="px-8 lg:px-12 pb-10 pt-4">
              <a
                href="/sign-up"
                className="w-full inline-flex items-center justify-center px-8 py-4 text-lg lg:text-xl font-bold bg-black text-white border-4 border-black rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                Start Selling Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="px-4 lg:px-12 py-16 lg:py-20 bg-blue-400 border-y-4 border-black">
        <div className="max-w-5xl mx-auto">
          <h2 className={cn('text-4xl lg:text-5xl mb-12 text-center', poppins.className)}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              number="1"
              title="Customer Buys"
              description="Customer pays for your product through secure Stripe checkout"
              color="bg-pink-400"
            />
            <StepCard
              number="2"
              title="We Take 10%"
              description="Platform fee is automatically deducted from the transaction"
              color="bg-yellow-400"
            />
            <StepCard
              number="3"
              title="You Get 90%"
              description="Rest goes directly to your connected Stripe account"
              color="bg-green-400"
            />
          </div>
        </div>
      </div>

      {/* Example Breakdown */}
      <div className="px-4 lg:px-12 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className={cn('text-4xl lg:text-5xl mb-12 text-center', poppins.className)}>
            Pricing Example
          </h2>
          <div className="bg-white border-4 border-black rounded-md overflow-hidden">
            <div className="bg-purple-300 p-6 border-b-4 border-black">
              <h3 className={cn('text-3xl', poppins.className)}>You sell a product for $100</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b-2 border-gray-300">
                <span className="text-xl font-bold">Product Price</span>
                <span className="text-2xl font-bold">$100.00</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b-2 border-gray-300">
                <span className="text-xl font-bold">Platform Fee (10%)</span>
                <span className="text-2xl font-bold text-red-600">-$10.00</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b-4 border-black">
                <span className="text-xl font-bold">Stripe Processing Fee (~2.9% + $0.30)</span>
                <span className="text-2xl font-bold text-red-600">-$3.20</span>
              </div>
              <div className="flex items-center justify-between bg-green-300 -m-8 p-8 mt-4">
                <span className={cn('text-2xl', poppins.className)}>You Receive</span>
                <span className={cn('text-4xl', poppins.className)}>$86.80</span>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-600 font-medium mt-6">
            * Stripe fees vary by region and payment method. This is an estimate.
          </p>
        </div>
      </div>

      {/* What's Included */}
      <div className="px-4 lg:px-12 py-16 lg:py-20 bg-black text-white border-y-4 border-black">
        <div className="max-w-5xl mx-auto">
          <h2 className={cn('text-4xl lg:text-5xl mb-12 text-center', poppins.className)}>
            What You Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <IncludedCard
              icon={<CreditCard className="w-8 h-8" />}
              title="Stripe Payments"
              color="bg-cyan-400"
            />
            <IncludedCard
              icon={<Shield className="w-8 h-8" />}
              title="Secure Hosting"
              color="bg-pink-400"
            />
            <IncludedCard
              icon={<Zap className="w-8 h-8" />}
              title="Fast Performance"
              color="bg-yellow-400"
            />
            <IncludedCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Analytics Dashboard"
              color="bg-green-400"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4 lg:px-12 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className={cn('text-4xl lg:text-5xl mb-12 text-center', poppins.className)}>
            Common Questions
          </h2>
          <div className="space-y-6">
            <FAQItem
              question="When do I pay the 10% fee?"
              answer="The fee is automatically deducted when a customer makes a purchase. You never have to manually pay anything."
            />
            <FAQItem
              question="Are there any other fees?"
              answer="Only Stripe's standard payment processing fees (typically ~2.9% + $0.30 per transaction). No fees from us beyond the 10% per sale."
            />
            <FAQItem
              question="How do I receive payments?"
              answer="Payments go directly to your connected Stripe account. You can transfer funds to your bank account anytime through Stripe."
            />
            <FAQItem
              question="Is there a minimum sales requirement?"
              answer="Nope! Sell as much or as little as you want. There are no minimums or quotas."
            />
            <FAQItem
              question="Can I change my pricing later?"
              answer="You can update your product prices anytime. The 10% platform fee remains the same regardless of your pricing."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 lg:px-12 py-16 lg:py-24 bg-red-400 border-t-4 border-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={cn('text-4xl lg:text-6xl mb-6', poppins.className)}>
            Ready to Launch?
          </h2>
          <p className="text-xl lg:text-2xl font-medium mb-10">
            Start selling in minutes. No credit card required to sign up.
          </p>
          <a
            href="/sign-up"
            className="inline-flex items-center justify-center px-8 py-4 text-xl font-bold bg-black text-white border-4 border-black rounded-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            Create Your Store
          </a>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0 w-9 h-9 bg-green-300 border-[3px] border-black rounded-lg flex items-center justify-center">
        <Check className="w-5 h-5" strokeWidth={3} />
      </div>
      <span className="text-base lg:text-lg font-semibold">{text}</span>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
  color,
}: {
  number: string
  title: string
  description: string
  color: string
}) {
  return (
    <div className="bg-white border-4 border-black rounded-md p-6 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
      <div
        className={cn(
          'inline-flex items-center justify-center w-16 h-16 border-4 border-black rounded-md mb-4 text-3xl',
          poppins.className,
          color
        )}
      >
        {number}
      </div>
      <h3 className={cn('text-2xl mb-2', poppins.className)}>{title}</h3>
      <p className="text-base font-medium text-gray-700">{description}</p>
    </div>
  )
}

function IncludedCard({ icon, title, color }: { icon: React.ReactNode; title: string; color: string }) {
  return (
    <div className="bg-white text-black p-6 border-4 border-white rounded-md hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
      <div className={cn('inline-flex p-3 rounded-md border-4 border-black mb-3', color)}>{icon}</div>
      <h3 className={cn('text-lg', poppins.className)}>{title}</h3>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white border-4 border-black rounded-md p-6 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
      <h3 className={cn('text-xl mb-3', poppins.className)}>{question}</h3>
      <p className="text-base font-medium text-gray-700">{answer}</p>
    </div>
  )
}
