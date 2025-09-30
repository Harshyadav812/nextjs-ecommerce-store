'use client'

import { generateTenantURL } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon } from "lucide-react"
// import { CheckoutButton } from "@/modules/checkout/ui/components/checkout-button"

//because of hydration errors, using dynamic
const CheckoutButton = dynamic(
  () => import('@/modules/checkout/ui/components/checkout-button').then((mod) => mod.CheckoutButton),
  {
    ssr: false,
    loading: () => <Button disabled className="bg-slate-300 border-0">
      <ShoppingCartIcon />
    </Button>

  }
)

interface Props {
  slug: string
}

export const Navbar = ({ slug }: Props) => {

  const trpc = useTRPC()

  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }))
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4">
        <Link
          href={generateTenantURL(slug)} className="flex items-center gap-2"
        >
          {data.image?.url && (
            <Image
              src={data.image.url}
              alt={slug}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-[32px]"
            />
          )}
          <p className="text-xl">{data.name}</p>
        </Link>
        <CheckoutButton tenantSlug={slug} />
      </div>
    </nav>
  )
}

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4">
        <div />
        <Button disabled className="bg-slate-300 border-0">
          <ShoppingCartIcon />
        </Button>
      </div>
    </nav>
  )
}