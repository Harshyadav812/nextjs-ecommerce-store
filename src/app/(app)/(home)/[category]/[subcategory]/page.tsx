interface SubcategoryProps {
  params: Promise<{
    category: string
    subcategory: string
  }>
}

const Page = async ({ params }: SubcategoryProps) => {
  const { category, subcategory } = await params

  return (
    <div>
      Category: {category} <br />
      Subcategory: {subcategory}
    </div>
  )
}

export default Page