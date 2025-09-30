import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs";


interface Props {
  searchParams: Promise<SearchParams>
  params: Promise<{ slug: string }>
  narrowView?: boolean
}

const Page = async ({ params, searchParams, narrowView }: Props) => {

  const { slug } = await params
  const filters = await loadProductFilters(searchParams)

  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
    {
      ...filters,
      tenantSlug: slug,
      limit: DEFAULT_LIMIT
    }
  ))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} narrowView={narrowView} />
    </HydrationBoundary>
  )
}

export default Page