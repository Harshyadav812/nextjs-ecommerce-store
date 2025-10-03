import type { Payload } from 'payload'

interface ReviewSummary {
  reviewCount: number
  reviewRating: number
}

export async function aggregateReviewsByProducts(
  payload: Payload,
  productIds: string[],
): Promise<Map<string, ReviewSummary>> {
  // Fetch all reviews in one query
  const allReviewsData = await payload.find({
    collection: 'reviews',
    pagination: false,
    where: {
      product: {
        in: productIds,
      },
    },
  })

  // Group reviews by product ID
  const reviewsByProductId = new Map<string, Array<{ rating: number }>>()

  allReviewsData.docs.forEach((review) => {
    const productId =
      typeof review.product === 'string' ? review.product : review.product.id

    if (!reviewsByProductId.has(productId)) {
      reviewsByProductId.set(productId, [])
    }

    reviewsByProductId.get(productId)!.push({
      rating: review.rating,
    })
  })

  // Calculate summaries
  const summaries = new Map<string, ReviewSummary>()

  productIds.forEach((productId) => {
    const reviews = reviewsByProductId.get(productId) || []
    const reviewCount = reviews.length
    const reviewRating =
      reviewCount === 0
        ? 0
        : reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount

    summaries.set(productId, { reviewCount, reviewRating })
  })

  return summaries
}
