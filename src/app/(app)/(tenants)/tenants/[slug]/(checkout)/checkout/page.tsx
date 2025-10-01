import { CheckoutView } from "@/modules/checkout/ui/views/checkout-view"
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime"

interface PageProps {
  params: Promise<{ slug: string }>
}


const Page = async ({ params }: PageProps) => {

  const { slug } = await params

  return (
    <CheckoutView tenantSlug={slug} />
  )
}

export default Page