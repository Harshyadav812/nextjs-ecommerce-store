import { formatCurrency, generateTenantURL } from "@/lib/utils"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import React from "react"

interface ProductCardProps {
  id: string
  name: string
  imageUrl?: string | null
  tenantSlug: string
  tenantImageUrl?: string | null
  reviewRating: number
  reviewCount: number
  price: number
}

export const ProductCard = ({ id, name, imageUrl, tenantSlug, tenantImageUrl, reviewCount, reviewRating, price }: ProductCardProps) => {

  const router = useRouter()

  const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    router.push(generateTenantURL(tenantSlug))
  }

  return (
    <Link
      href={`${generateTenantURL(tenantSlug)}/products/${id}`}>
      <div className="border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all rounded-lg bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square border-b-2 border-black">
          <Image
            alt={name}
            fill
            src={imageUrl || '/placeholder.png'}
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-semibold line-clamp-2">{name}</h2>
          <div className="flex items-center gap-2" onClick={handleUserClick}>
            {tenantImageUrl && (
              <Image
                alt={tenantSlug}
                src={tenantImageUrl}
                width={18}
                height={18}
                className="rounded-full border-2 border-black shrink-0 size-[18px]"
              />
            )}
            <p className="text-sm underline font-semibold hover:text-blue-600 transition-colors">{tenantSlug}</p>
          </div>
          {reviewCount > 0 ? (
            <div className="flex items-center gap-1.5">
              <StarIcon className="size-4 fill-black stroke-black" />
              <p className="text-sm font-semibold">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          ) : null}
        </div>

        <div className="p-4 pt-0">
          <div className="relative px-3 py-2 border-2 border-black bg-blue-300 w-fit rounded-md">
            <p className="text-base font-bold">
              {formatCurrency(price)}
            </p>
          </div>
        </div>
      </div>

    </Link>
  )
}

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animage-pulse" />
  )
}