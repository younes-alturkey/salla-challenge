export type Item = {
  id: string
  label: string
  thumbnail: string
  qty: number
  price: {
    currency: string
    amount: number
  }
}

export type Coupon = {
  id: string
  name: string
  label: string
  discount: {
    type: string
    amount: string
  }
}

export type Company = {
  id: string
  name: string
  label: string
  logo: string
  fees: {
    currency: string
    amount: number
  }
}

export type Total = {
  name: string
  label: string
  currency: string
  amount: number
}

export type CartItemsProps = {
  proceedToShipping: () => Promise<void>
  items: Item[]
  coupons: Coupon[]
  error: string
}

export type ShippingCompaniesProps = {
  proceedToPayment: () => Promise<void>
  backToCart: () => void
  companies: Company[]
  totals: Total[]
  error: string
}

export type Order = { title: string; subtitle: string }

export type PaymentConfirmedProps = {
  proceedToStore: () => void
  order: Order | null
  error: string
}

export type WebComponentsContainerProps = {
  url: string
  items: Item[]
  coupons: Coupon[]
  error: string
}
