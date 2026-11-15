/**
 * Review store placeholder.
 * Real reviews will come from the backend after verified purchases.
 */
export const placeholderReviewMessage =
  'Every story begins somewhere. Yours could be the first.'

export const reviews = []

export const averageRating = (list = reviews) => {
  if (!list.length) return 0
  const sum = list.reduce((acc, r) => acc + r.rating, 0)
  return sum / list.length
}
