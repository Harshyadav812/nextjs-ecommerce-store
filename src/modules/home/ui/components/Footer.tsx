import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['700']
})

export const Footer = () => {
  return (
    <footer className="flex border-t justify-between font-medium p-6">
      <div className="flex items-center gap-2">
        <span className={cn('text-2xl font-semibold', poppins.className)}>Shopsy</span>
      </div>
    </footer>
  )
}
