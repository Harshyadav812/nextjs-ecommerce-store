'use client'

import { Poppins } from 'next/font/google'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="px-4 lg:px-12 py-16 lg:py-24 border-b-4 border-black bg-purple-400">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={cn('text-5xl lg:text-7xl mb-8', poppins.className)}>
            Get In Touch
          </h1>
          <p className="text-xl lg:text-2xl font-medium">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="px-4 lg:px-12 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <ContactCard
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                content="hello@shopsy.com"
                color="bg-blue-400"
              />
              <ContactCard
                icon={<Phone className="w-6 h-6" />}
                title="Phone"
                content="+1 (555) 123-4567"
                color="bg-green-400"
              />
              <ContactCard
                icon={<MapPin className="w-6 h-6" />}
                title="Office"
                content="123 Market Street, San Francisco, CA 94103"
                color="bg-pink-400"
              />
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="bg-yellow-300 border-b-4 border-black p-6">
                  <h2 className={cn('text-3xl lg:text-4xl', poppins.className)}>
                    Send us a Message
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Your Name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <InputField
                    label="Subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <div>
                    <label className={cn('block text-lg mb-2', poppins.className)}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      placeholder="Tell us what's on your mind..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-4 border-black rounded-lg font-medium text-base focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-lg lg:text-xl font-bold bg-black text-white border-4 border-black rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4 lg:px-12 py-16 lg:py-20 bg-cyan-300 border-y-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className={cn('text-4xl lg:text-5xl mb-12 text-center', poppins.className)}>
            Quick Answers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuickAnswerCard
              question="How fast is support?"
              answer="We typically respond within 24 hours on business days."
            />
            <QuickAnswerCard
              question="Need help getting started?"
              answer="Check out our documentation or send us a message!"
            />
            <QuickAnswerCard
              question="Sales inquiries?"
              answer="Email us at sales@shopsy.com for partnership opportunities."
            />
            <QuickAnswerCard
              question="Technical issues?"
              answer="Report bugs or technical problems at support@shopsy.com"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 lg:px-12 py-16 lg:py-24 bg-orange-400 border-b-4 border-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={cn('text-4xl lg:text-6xl mb-6', poppins.className)}>
            Prefer to Chat?
          </h2>
          <p className="text-xl lg:text-2xl font-medium mb-10">
            Join our community on Discord or follow us on social media
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <SocialButton href="#" label="Discord" color="bg-purple-300" />
            <SocialButton href="#" label="Twitter" color="bg-blue-300" />
            <SocialButton href="#" label="Instagram" color="bg-pink-300" />
            <SocialButton href="#" label="LinkedIn" color="bg-cyan-300" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactCard({
  icon,
  title,
  content,
  color,
}: {
  icon: React.ReactNode
  title: string
  content: string
  color: string
}) {
  return (
    <div className="bg-white border-4 border-black rounded-lg p-6 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
      <div className={cn('inline-flex p-3 rounded-lg border-4 border-black mb-4', color)}>
        {icon}
      </div>
      <h3 className={cn('text-xl mb-2', poppins.className)}>{title}</h3>
      <p className="text-base font-medium text-gray-700 break-words">{content}</p>
    </div>
  )
}

function InputField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string
  name: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className={cn('block text-lg mb-2', poppins.className)}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border-4 border-black rounded-lg font-medium text-base focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all"
      />
    </div>
  )
}

function QuickAnswerCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white border-4 border-black rounded-lg p-6 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
      <h3 className={cn('text-lg mb-2', poppins.className)}>{question}</h3>
      <p className="text-base font-medium text-gray-700">{answer}</p>
    </div>
  )
}

function SocialButton({ href, label, color }: { href: string; label: string; color: string }) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center justify-center px-6 py-3 text-lg font-bold border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all',
        color
      )}
    >
      {label}
    </a>
  )
}
