import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCart } from "@/modules/checkout/hooks/use-cart"

interface Props {
  tenantSlug: string
  productId: string
}

export const CartButton = ({ tenantSlug, productId }: Props) => {
  const cart = useCart(tenantSlug)

  return (
    <Button
      variant={'elevated'}
      className={cn("flex-1 bg-blue-400", cart.isProductInCart(productId) && 'bg-white')}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? 'Remove from Cart' : 'Add to Cart'}
    </Button>
  )
}