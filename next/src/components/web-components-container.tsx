"use client"
import CartItems from "@/components/cart-items"
import PaymentConfirmed from "@/components/payment-confirmed"
import ShippingCompanies from "@/components/shipping-companies"
import {
  Company,
  Coupon,
  Item,
  Order,
  Total,
  WebComponentsContainerProps,
} from "@/types"
import { useState } from "react"
import { ResizableBox } from "react-resizable"

export default function WebComponentsContainer(
  props: WebComponentsContainerProps
) {
  const [items] = useState<Item[] | []>(props.items)
  const [coupons] = useState<Coupon[] | []>(props.coupons)
  const [cartItemsError] = useState("")

  const [companies, setCompanies] = useState<Company[] | []>([])
  const [totals, setTotals] = useState<Total[] | []>([])
  const [shippingCompaniesError, setShippingCompaniesError] = useState("")

  const [order, setOrder] = useState<Order | null>(null)
  const [paymentConfirmedError, setPaymentConfirmedError] = useState("")

  const [step, setStep] = useState("cart")

  async function fetchShippingCompaniesData() {
    try {
      const companiesResponse = await fetch(`${props.url}/shipping`)
      const totalsResponse = await fetch(
        `${props.url}/totals?coupon=false&shipping=dhl`
      )

      if (!companiesResponse.ok || !totalsResponse.ok)
        throw new Error("Error fetching shipping companies data.")

      const companiesJson = await companiesResponse.json()
      const totalsJson = await totalsResponse.json()

      setCompanies(companiesJson.data)
      setTotals(totalsJson.data)
    } catch (error) {
      setShippingCompaniesError("Error fetching shipping companies data.")
      console.error("Error fetching data:", error)
    }
  }

  async function fetchPaymentConfirmedData() {
    try {
      const orderResponse = await fetch(`${props.url}/submit`, {
        method: "POST",
      })

      if (!orderResponse.ok) throw new Error("Error fetching order data.")

      const orderJson = await orderResponse.json()

      setOrder(orderJson.data)
    } catch (error) {
      setPaymentConfirmedError("Error fetching order data.")
      console.error("Error fetching data:", error)
    }
  }

  async function handleProccedToShipping() {
    setStep("shipping")

    await fetchShippingCompaniesData()
  }

  async function handleProccedToPayment() {
    setStep("payment")
    await fetchPaymentConfirmedData()
  }

  async function handleBackToCart() {
    setStep("cart")
  }

  async function handleProccedToStore() {
    window.location.reload()
  }

  return (
    <ResizableBox
      className=" p-2"
      width={550}
      height={590}
      resizeHandles={["se"]}
    >
      {step === "cart" ? (
        <CartItems
          proceedToShipping={handleProccedToShipping}
          items={items}
          coupons={coupons}
          error={cartItemsError}
        />
      ) : step === "shipping" ? (
        <ShippingCompanies
          proceedToPayment={handleProccedToPayment}
          backToCart={handleBackToCart}
          companies={companies}
          totals={totals}
          error={shippingCompaniesError}
        />
      ) : (
        <PaymentConfirmed
          order={order}
          proceedToStore={handleProccedToStore}
          error={paymentConfirmedError}
        />
      )}
    </ResizableBox>
  )
}
