import { Category, Media, Tenant } from '@/payload-types'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import type { Sort, Where } from 'payload'
import z from 'zod'
import { sortValue } from '../search-params'
import { DEFAULT_LIMIT } from '@/constants'
import { headers as getHeaders } from 'next/headers'
import { aggregateReviewsByProducts } from '@/modules/library/utils'

export const productsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const headers = await getHeaders()
      const session = await ctx.payload.auth({ headers })
      const product = await ctx.payload.findByID({
        collection: 'products',
        id: input.id,
      })

      let isPurchased = false

      if (session.user) {
        const ordersData = await ctx.payload.find({
          collection: 'orders',
          pagination: false,
          limit: 1,
          where: {
            and: [
              {
                product: {
                  equals: input.id,
                },
              },
              {
                user: {
                  equals: session.user.id,
                },
              },
            ],
          },
        })

        isPurchased = !!ordersData.docs[0]
      }

      const reviews = await ctx.payload.find({
        collection: 'reviews',
        pagination: false,
        where: {
          product: {
            equals: input.id,
          },
        },
      })

      const reviewRating =
        reviews.docs.length > 0
          ? reviews.docs.reduce((acc, review) => acc + review.rating, 0)
          : 0

      const ratingDistribution: Record<number, number> = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      }

      if (reviews.totalDocs > 0) {
        reviews.docs.forEach((review) => {
          const rating = review.rating

          if (rating >= 1 && rating <= 5) {
            ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1
          }
        })

        Object.keys(ratingDistribution).forEach((key) => {
          const rating = Number(key)
          const count = ratingDistribution[rating] || 0
          ratingDistribution[rating] = Math.round(
            (count / reviews.totalDocs) * 100,
          )
        })
      }

      return {
        ...product,
        isPurchased,
        image: product.image as Media | null,
        tenant: product.tenant as Tenant & { image: Media | null },
        reviewRating,
        reviewCount: reviews.totalDocs,
        ratingDistribution,
      }
    }),

  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValue).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {}

      let sort: Sort = '-createdAt'

      if (input.sort === 'trending') {
        sort = '+createdAt'
      }

      if (input.sort === 'curated') {
        sort = '-createdAt'
      }

      if (input.sort === 'hot_and_new') {
        sort = '-createdAt'
      }

      if (input.minPrice && input.maxPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
          less_than_equal: input.maxPrice,
        }
      } else if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        }
      } else if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
        }
      }

      if (input.tenantSlug) {
        where['tenant.slug'] = {
          equals: input.tenantSlug,
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

      if (input.tags && input.tags.length > 0) {
        where['tags.name'] = {
          in: input.tags,
        }
      }

      const data = await ctx.payload.find({
        collection: 'products',
        depth: 2, //populate 'category', 'image' , 'tenant' and 'tenant.image'
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      })

      // Fetch all reviews in a single query
      const productIds = data.docs.map((doc) => doc.id)
      const reviewSummaries = await aggregateReviewsByProducts(
        ctx.payload,
        productIds,
      )

      //Map over products WITHOUT making additional queries
      const dataWithSummarizedReviews = data.docs.map((doc) => {
        const summary = reviewSummaries.get(doc.id) || {
          reviewCount: 0,
          reviewRating: 0,
        }

        // const dataWithSummarizedReviews = await Promise.all(
        //   data.docs.map(async (doc) => {
        //     const reviewsData = await ctx.payload.find({
        //       collection: 'reviews',
        //       pagination: false,
        //       where: {
        //         product: {
        //           equals: doc.id,
        //         },
        //       },
        //     })

        return {
          ...doc,
          reviewCount: summary.reviewCount,
          reviewRating: summary.reviewRating,
        }
      })

      return {
        ...data,
        docs: dataWithSummarizedReviews.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      }
    }),
})
