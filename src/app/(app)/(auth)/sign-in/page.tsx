import { SingInView } from "@/modules/auth/ui/views/sign-in-view"
import { caller } from "@/trpc/server"
import { redirect } from "next/navigation"

interface Props {
  searchParams: Promise<{
    redirect?: string
    reason?: string
  }>
}

export const dynamic = 'force-dynamic'

const Page = async ({ searchParams }: Props) => {
  const session = await caller.auth.session()
  const params = await searchParams

  if (session.user) {
    redirect(params.redirect || '/')
  }

  return (
    <div>
      <SingInView />
    </div>
  )
}

export default Page