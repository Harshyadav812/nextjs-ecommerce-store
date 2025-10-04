'use client'

import { TriangleAlertIcon } from "lucide-react"

const ErrorPage = () => {
  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border border-black border-dashed flex items-center justify-center p-8">
        <TriangleAlertIcon />
        <p className="text-base font-medium">Something went wrong</p>
      </div>
    </div>
  )
}