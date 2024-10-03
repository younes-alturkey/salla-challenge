import App from "@/App.vue"
import "@/assets/tailwind.css"
import { defineCustomElements } from "salla-web-components/loader"
import { createApp } from "vue"

const app = createApp(App)

const customElements = ["cart-items", "shipping-companies", "payment-confirmed"]

app.config.compilerOptions.isCustomElement = (tag) =>
  customElements.includes(tag)

defineCustomElements(window)

app.mount("#app")
