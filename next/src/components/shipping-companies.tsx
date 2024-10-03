"use client"

import { ShippingCompaniesProps } from "@/types"
import { useEffect, useRef } from "react"

export default function ShippingCompanies(props: ShippingCompaniesProps) {
  const shippingCompaniesRef = useRef(null)

  useEffect(() => {
    const shippingCompaniesEl = shippingCompaniesRef.current as any

    if (shippingCompaniesEl) {
      shippingCompaniesEl.companies = props.companies
      shippingCompaniesEl.totals = props.totals
      shippingCompaniesEl.error = props.error
      shippingCompaniesEl.proceedToPayment = props.proceedToPayment
      shippingCompaniesEl.backToCart = props.backToCart
    }
  }, [
    props.companies,
    props.totals,
    props.error,
    props.proceedToPayment,
    props.backToCart,
  ])

  return <shipping-companies ref={shippingCompaniesRef}></shipping-companies>
}
