import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SearchFilters } from './search-filters'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Category } from '@/payload-types'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'categories',
    depth: 1, //populate subcategories 1 level deep
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  })

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // because of 'depth:1' we know "doc" will be a type of "Category"
      ...(doc as Category),
      subcategories: undefined,
    })),
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f4]">{children}</div>
      <Footer />
    </div>
  )
}
