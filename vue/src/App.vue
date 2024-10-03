<template>
  <div class="h-[590px] w-[550px] p-1">
    <cart-items
      ref="cartItemsElement"
      style="width: 100%; height: 100%; display: none"
      :style="{ display: currentStep === 'cart' ? 'block' : 'none' }"
    ></cart-items>
    <shipping-companies
      ref="shippingCompaniesElement"
      style="width: 100%; height: 100%; display: none"
      :style="{ display: currentStep === 'shipping' ? 'block' : 'none' }"
    ></shipping-companies>
    <payment-confirmed
      ref="paymentConfirmedElement"
      style="width: 100%; height: 100%; display: none"
      :style="{ display: currentStep === 'payment' ? 'block' : 'none' }"
    ></payment-confirmed>
  </div>

  <div
    className="fixed bottom-4 right-4 text-center flex flex-col justify-center items-end"
  >
    <p className="text-xl text-green-700 animate-pulse text-center w-[500px]">
      This is a VueJS website.
    </p>
    <p className="text-base text-green-800 opacity-70 w-[500px]">
      This a Single Page Application (SPA), meaning it's fully rendered on the
      client side. The entire page and all its components, including the web
      components, are rendered on the client, making it a purely client-side
      application without initial server-side rendering.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: "cart",
    }
  },
  mounted() {
    this.fetchCartItemsData()
    this.$refs.cartItemsElement.proceedToShipping = this.handleProceedToShipping
    this.$refs.shippingCompaniesElement.proceedToPayment =
      this.handleProceedToPayment
    this.$refs.shippingCompaniesElement.backToCart = this.handleBackToCart
    this.$refs.paymentConfirmedElement.proceedToStore =
      this.handleProceedToStore
  },
  methods: {
    async handleProceedToShipping() {
      this.currentStep = "shipping"
      await this.fetchShippingCompaniesData()
    },
    async handleProceedToPayment() {
      this.currentStep = "payment"
      await this.fetchPaymentConfirmationData()
    },
    handleBackToCart() {
      this.currentStep = "cart"
    },
    handleProceedToStore() {
      console.log("Order confirmed!")
      window.location.reload()
    },
    async fetchCartItemsData() {
      try {
        const itemsResponse = await fetch(
          "https://next-web-components.vercel.app/api/items"
        )
        if (!itemsResponse.ok) throw new Error("Failed to fetch items.")
        const itemsJson = await itemsResponse.json()
        const items = itemsJson.data
        this.$refs.cartItemsElement.items = items

        const couponsResponse = await fetch(
          "https://next-web-components.vercel.app/api/coupons"
        )
        if (!couponsResponse.ok) throw new Error("Failed to fetch coupons.")
        const couponsJson = await couponsResponse.json()
        const coupons = couponsJson.data
        this.$refs.cartItemsElement.coupons = coupons
      } catch (error) {
        this.$refs.cartItemsElement.errorProp = error.message
        console.error(error)
      }
    },
    async fetchShippingCompaniesData() {
      try {
        const shippingResponse = await fetch(
          "https://next-web-components.vercel.app/api/shipping"
        )
        if (!shippingResponse.ok)
          throw new Error("Failed to fetch shipping companies.")
        const companiesJson = await shippingResponse.json()
        const companies = companiesJson.data
        this.$refs.shippingCompaniesElement.companies = companies

        const totalsResponse = await fetch(
          "https://next-web-components.vercel.app/api/totals?coupon=false&shipping=dhl"
        )
        if (!totalsResponse.ok)
          throw new Error("Failed to fetch shipping totals.")
        const totalsJson = await totalsResponse.json()
        const totals = totalsJson.data
        this.$refs.shippingCompaniesElement.totals = totals
      } catch (error) {
        this.$refs.shippingCompaniesElement.error = error.message
        console.error(error)
      }
    },
    async fetchPaymentConfirmationData() {
      try {
        const orderResponse = await fetch(
          "https://next-web-components.vercel.app/api/submit",
          {
            method: "POST",
          }
        )
        if (!orderResponse.ok) throw new Error("Failed to submit order.")
        const orderJson = await orderResponse.json()
        const data = orderJson.data
        this.$refs.paymentConfirmedElement.data = data
      } catch (error) {
        this.$refs.paymentConfirmedElement.error = error.message
        console.error(error)
      }
    },
  },
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>
