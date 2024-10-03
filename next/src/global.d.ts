declare namespace JSX {
  interface IntrinsicElements {
    "cart-items": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      proceedToShipping?: () => Promise<void>
      items?: Item[]
      coupons?: Coupon[]
      error?: string
    }
    "shipping-companies": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      proceedToPayment?: () => Promise<void>
      backToCart?: () => void
      companies?: Company[]
      totals?: Total[]
      error?: string
    }
    "payment-confirmed": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      proceedToStore?: () => void
      data?: { title: string; subtitle: string } | null
      error?: string
    }
  }
}
