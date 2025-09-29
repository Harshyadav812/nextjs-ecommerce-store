import {
  parseAsStringLiteral,
  createLoader,
  parseAsArrayOf,
  parseAsString,
} from 'nuqs/server'

export const sortValue = ['curated', 'trending', 'hot_and_new'] as const

const params = {
  sort: parseAsStringLiteral(sortValue).withDefault('curated'),
  minPrice: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(''),
  maxPrice: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(''),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault([]),
}

export const loadProductFilters = createLoader(params)
