'use client'

import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { formatCurrency, generateTenantURL } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { CheckIcon, LinkIcon, StarIcon } from "lucide-react"
import { RichText } from "@payloadcms/richtext-lexical/react"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"

import { Fragment, useState } from "react"
import { toast } from "sonner"
// import { CartButton } from "../components/cart-button" 


//normal import was causing hydration errors becuase the button changes the state in the client and the server is not aware of it, so they don't match
const CartButton = dynamic(
  () => import('../components/cart-button').then(
    (mod) => mod.CartButton
  ),
  {
    ssr: false,
    loading: () => <Button disabled className="flex-1 bg-blue-400">Add to Cart</Button>
  }
)

interface ProductViewProps {
  productId: string
  tenantSlug: string
}

export const ProductView = ({ productId, tenantSlug }: ProductViewProps) => {

  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({
    id: productId
  }))

  const [isCopied, setIsCopied] = useState(false)

  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border-3 border-black rounded-lg bg-white overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
        <div className="relative aspect-[3.9] border-b-4 border-black">
          <Image
            src={data.image?.url || '/placeholder.png'}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="p-6 pb-4">
              <h1 className="text-3xl lg:text-4xl font-bold">{data.name}</h1>
            </div>
            <div className="border-y-4 border-black flex flex-wrap">
              <div className="px-6 py-4 flex items-center justify-center border-r-4 border-black">
                <div className="px-3 py-2 bg-blue-400 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-base font-bold">{formatCurrency(data.price)}</p>
                </div>
              </div>

              <div className="px-6 py-4 flex items-center justify-center lg:border-r-4 border-black">
                <Link
                  href={generateTenantURL(tenantSlug)}
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  {data.tenant.image?.url && (
                    <Image
                      src={data.tenant.image.url}
                      alt={data.tenant.name}
                      width={22}
                      height={22}
                      className="rounded-full border-2 border-black shrink-0 size-[22px]"
                    />
                  )}
                  <p className="text-base underline font-bold">{data.tenant.name}</p>
                </Link>
              </div>

              <div className="hidden lg:flex px-6 py-4 items-center justify-center">
                <div className="flex items-center gap-2">
                  <StarRating
                    rating={data.reviewRating}
                    iconClassName="size-4"
                  />
                  <p className="text-base font-bold">
                    {data.reviewCount} ratings
                  </p>
                </div>
              </div>
            </div>

            <div className="block lg:hidden px-6 py-4 items-center justify-center border-b-4 border-black">
              <div className="flex items-center gap-2">
                <StarRating
                  rating={data.reviewRating}
                  iconClassName="size-4" />
                <p className="text-base font-bold">
                  {data.reviewCount} ratings
                </p>
              </div>
            </div>

            <div className="p-6 prose prose-lg max-w-none">
              {data.description ? (
                <RichText data={data.description} />
              ) :
                (
                  <p className="font-medium text-muted-foreground italic">No description provided</p>
                )}
            </div>

          </div>

          <div className="col-span-2">
            <div className="border-t-4 lg:border-t-0 lg:border-l-4 border-black h-full">
              <div className="flex flex-col gap-4 p-6 border-b-4 border-black">
                <div className="flex flex-row items-center gap-3">

                  <CartButton
                    isPurchased={data.isPurchased}
                    tenantSlug={tenantSlug}
                    productId={productId}
                  />

                  <Button
                    variant={'hoverElevated'}
                    className="size-12 border-4"
                    onClick={() => {
                      setIsCopied(true)
                      navigator.clipboard.writeText(window.location.href)
                      toast.success("URL copied to clipboard")
                      setTimeout(() => {
                        setIsCopied(false)
                      }, 1000)
                    }}
                    disabled={isCopied}
                  >
                    {isCopied ? <CheckIcon /> : <LinkIcon />}
                  </Button>

                </div>

                <div className="bg-yellow-300 border-2 border-black rounded-md p-3">
                  <p className="text-center font-bold text-sm">
                    {data.refundPolicy === 'no-refunds'
                      ? "No refunds" : `${data.refundPolicy} money back guarantee`
                    }
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Ratings</h3>
                  <div className="flex items-center gap-x-1.5 font-bold">
                    <StarIcon className="size-4 fill-black stroke-black" />
                    <p>{data.reviewRating}</p>
                    <p className="text-sm text-gray-600">({data.reviewCount})</p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] gap-3">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <Fragment key={stars}>
                      <div className="font-semibold text-sm">{stars} {stars === 1 ? 'star' : 'stars'}</div>
                      <Progress
                        value={data.ratingDistribution[stars]}
                        className="h-[0.8lh] border-2 border-black"
                      />
                      <div className="font-bold text-sm">
                        {data.ratingDistribution[stars]}%
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ProductViewSkeleton = () => {
  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border-4 border-black rounded-lg bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="relative aspect-[3.9] border-b-4 border-black">
          <Image
            src={'/placeholder.png'}
            alt={"Placeholder"}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}