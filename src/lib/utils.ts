import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTenantURL(tenantSlug: string) {
  // const isDevelopment = process.env.NODE_ENV === 'development'
  // const isSubdomainRoutingEnabled =
  //   process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === 'true'

  // if (isDevelopment || isSubdomainRoutingEnabled) {
  // return `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenantSlug}`
  // }

  // const protocol = 'https'
  // const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!

  //e.g. https://harsh.shopsy.com
  //in production, use subdomain routing
  // return `${protocol}://${tenantSlug}.${domain}`

  if (process.env.NODE_ENV === 'development') {
    return `/tenants/${tenantSlug}`
  }

  const protocol = 'https'
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!

  return `${protocol}://${domain}/tenatns/${tenantSlug}`
}

export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number(value))
}
