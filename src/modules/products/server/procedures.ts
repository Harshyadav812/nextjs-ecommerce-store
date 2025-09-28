import { Category } from '@/payload-types'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import type { Where } from 'payload'
import z from 'zod'

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {}

      if (input.minPrice) {
        where.price = {
          ...where.price,
          greater_than_equal: input.minPrice,
        }
      }

      if (input.maxPrice) {
        where.price = {
          ...where.price,
          less_than_equal: input.maxPrice,
        }
      }

      if (input.category) {
        const categoriesData = await ctx.payload.find({
          collection: 'categories',
          limit: 1,
          depth: 1, //populate subcategories, subcategories.[0] will be a type of 'category'
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        })

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            // because of 'depth:1' we know "doc" will be a type of "Category"
            ...(doc as Category),
            subcategories: undefined,
          })),
        }))

        const subcategoriesSlugs = []

        const parentCategory = formattedData[0]

        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug,
            ),
          )
          where['category.slug'] = {
            in: [parentCategory.slug, ...subcategoriesSlugs],
          }
        }
      }

      const data = await ctx.payload.find({
        collection: 'products',
        depth: 1, //populate 'category' and 'image'
        where,
      })

      return data
    }),
})
