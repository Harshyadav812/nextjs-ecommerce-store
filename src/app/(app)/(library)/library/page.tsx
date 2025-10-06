import { DEFAULT_LIMIT } from "@/constants"
import { LibraryView } from "@/modules/library/ui/views/library-view"
import { caller, getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { redirect } from "next/navigation"


export const dynamic = 'force-dynamic'

const Page = async () => {

  const session = await caller.auth.session()

  if (!session.user) {
    redirect('/sign-in?redirect=/library')
  }

  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(trpc.library.getMany.infiniteQueryOptions({
    limit: DEFAULT_LIMIT
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryView />
    </HydrationBoundary>

  )
}

export default Page