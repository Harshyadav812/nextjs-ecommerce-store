'use client'

import Link from 'next/link'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'

interface NavbarItem {
  href: string
  children: React.ReactNode
}

interface SidebarNavProps {
  items: NavbarItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SidebarNav = ({ items, open, onOpenChange }: SidebarNavProps) => {

  const trpc = useTRPC()
  const session = useQuery(trpc.auth.session.queryOptions())

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overscroll-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              {item.children}
            </Link>
          ))}

          {session.data?.user ? (
            <div className='border-t'>
              <Link
                href="/admin"
                onClick={() => onOpenChange(false)}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="border-t">
              <Link
                href="/sign-in"
                onClick={() => onOpenChange(false)}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              >
                LogIn
              </Link>
              <Link
                href="/sign-up"
                onClick={() => onOpenChange(false)}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              >
                Start Selling
              </Link>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
