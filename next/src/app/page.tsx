import Layout from "@/components/layout"
import WebComponentsContainer from "@/components/web-components-container"

export default async function Home() {
  const url = "https://next-web-components.vercel.app/api"

  let error = ""
  let items = []
  let coupons = []

  const itemsResponse = await fetch(`${url}/items`)
  const couponsResponse = await fetch(`${url}/coupons`)

  if (!itemsResponse.ok || !couponsResponse.ok) {
    error = "Error fetching cart items data."
  } else {
    const itemsJson = await itemsResponse.json()
    const couponsJson = await couponsResponse.json()

    items = itemsJson.data
    coupons = couponsJson.data
  }

  return (
    <Layout>
      <WebComponentsContainer
        url={url}
        items={items}
        coupons={coupons}
        error={error}
      />
    </Layout>
  )
}
