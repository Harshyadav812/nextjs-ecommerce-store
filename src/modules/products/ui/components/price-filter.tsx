'use client'

import { ChangeEvent } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
  minPrice?: string | null
  maxPrice?: string | null
  onMinPriceChange: (value: string) => void
  onMaxPriceChange: (value: string) => void
}

export const formatAsCurrency = (value: string) => {
  const numericalValue = value.replace(/[^0-9.]/g, "")

  const parts = numericalValue.split('.')
  const formattedValue = parts[0] + (parts.length > 1 ? '.' + parts[1]?.slice(0, 2) : "")

  if (!formattedValue) return ""

  const numberValue = parseFloat(formattedValue)

  if (isNaN(numberValue)) return ""

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue)
}


export const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange
}: Props) => {

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numbericValue = e.target.value.replace(/[^0-9.]/g, "")
    onMinPriceChange(numbericValue)
  }

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numbericValue = e.target.value.replace(/[^0-9.]/g, "")
    onMaxPriceChange(numbericValue)
  }



  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">
          Minimum Price
        </Label>
        <Input
          type="text"
          placeholder="$0"
          value={minPrice ? formatAsCurrency(minPrice) : ""}
          onChange={handleMinPriceChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">
          Maximum Price
        </Label>
        <Input
          type="text"
          placeholder="$0"
          value={maxPrice ? formatAsCurrency(maxPrice) : ""}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  )
}
