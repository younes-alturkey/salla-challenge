import { CartItemsProps } from "@/types"
import { useEffect, useRef } from "react"

export default function CartItems(props: CartItemsProps) {
  const cartItemsRef = useRef(null)

  useEffect(() => {
    const cartItemsEl = cartItemsRef.current as any

    if (cartItemsEl) {
      const observer = new MutationObserver(() => {
        cartItemsEl.items = props.items
        cartItemsEl.coupons = props.coupons
        cartItemsEl.error = props.error
        cartItemsEl.proceedToShipping = props.proceedToShipping
      })

      observer.observe(cartItemsEl, {
        attributes: true,
        childList: true,
        subtree: true,
      })

      return () => observer.disconnect()
    }
  }, [props.items, props.coupons, props.error, props.proceedToShipping])

  return <cart-items ref={cartItemsRef}></cart-items>
}
