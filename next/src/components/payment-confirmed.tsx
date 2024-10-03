"use client"

import { PaymentConfirmedProps } from "@/types"
import { useEffect, useRef } from "react"

export default function PaymentConfirmed(props: PaymentConfirmedProps) {
  const paymentConfirmedRef = useRef(null)

  useEffect(() => {
    const paymentConfirmedEl = paymentConfirmedRef.current as any

    if (paymentConfirmedEl) {
      paymentConfirmedEl.data = props.order
      paymentConfirmedEl.proceedToStore = props.proceedToStore
    }
  }, [props.order, props.proceedToStore])

  return <payment-confirmed ref={paymentConfirmedRef}></payment-confirmed>
}
