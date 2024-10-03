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
