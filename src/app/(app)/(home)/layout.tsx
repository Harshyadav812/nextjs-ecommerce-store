import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getQueryClient, trpc } from '@/trpc/server'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SearchFilters, SearchFiltersSkeleton } from '../../../components/search-filters'
import { Suspense } from 'react'


export default async function HomeLayout({ children, }: { children: React.ReactNode }) {

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions()
  )


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#f4f4f4]">{children}</div>
      <Footer />
    </div>
  )
}
