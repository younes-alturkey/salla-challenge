## Salla Web Component Challenge

### Overview

This is [Younes Alturkey's](https://www.linkedin.com/in/younes-alturkey) submission for `Salla Frontend Challenge` which is an assignment project for talented Senior Front-End developers who are willing to join Salla development team.

The submission is in 3 versions `React`, `Vue` , `Static` to ensure web component re-usability in any different framework or pure static website.

API for the project:

| Description                               | URL                                        |
| ----------------------------------------- | ------------------------------------------ |
| Base URL                                  | https://next-web-components.vercel.app/api |
| Cart Items                                | `/items`                                   |
| Shipping Companies                        | `/shipping`                                |
| Coupons                                   | `/coupons`                                 |
| Cart Total: with coupon and shipping fees | `/totals?coupon=false&shipping=dhl`        |
| Order submit                              | `/submit`                                  |

> Unfortunately, [The provided API](https://checkout.free.beeceptor.com) is rate-limited and it wasn't feasible to do the challenge using it, so I created my API which works the same way. If available, you may replace the `URL` in any of the 3 projects that use the web components and it will work.

> A note about coupons, I added a new discount type which is flat. So depending on the coupon data a flat discount is applied or percentage.

### Demo: show me don't tell!

<img src="https://next-web-components.vercel.app/images/easy.jpg" alt="Easy Peasy" style="width: 50%;" />

### [NextJS Demo](https://next-web-components.vercel.app)

### [VueJS Demo](https://vue-web-components-cqi9.vercel.app)

### [Static Demo](https://next-web-components.vercel.app/index.html)

> Save the index.html locally then double click and you will get the exact same experience as with Next.js and Vue.js apps.

<a href="https://next-web-components.vercel.app">
<img src="https://next-web-components.vercel.app/images/salla-web-components-demo.gif" alt="Demo" style="width: 100%;" /></a>

### How To Use:

How to use these compponents after importing them is defined in the UI design provided. Basically, begin by fetching `items` and `coupons` data and show the `cart-items` checkout step, then once the user clicks proceed, fetch `shipping companies` and `totals` data and show `shipping-companies` checkout step, finally when the user clicks submit show the `payment-confirmed` checkout step.

> It's up to you how to use these components to complete this flow. You don't have to use all 3 and can customize the flow. The components are stateless and slaves to the parent.

> Moreover, how big or small the components should be is also up to you. They take their parent width and height, simply a fluid design by default.

There are 3 ways to consume these web-components:

1. install `salla-web-components` public NPM package
2. Include the `static web-components files` of the components and use directly
3. Include the `<script type="module" src="URL"></script>` in website and use directly

Continue below for further guide 👇

### 1. install `salla-web-components`

Install the package

```bash
npm i salla-web-components
```

Import and use the defineCustomElements function to register the components

```ts
import { defineCustomElements } from "salla-web-components/loader"
defineCustomElements(window)
```

OPTIONAL: Define the components in `global.d.ts`

```ts
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
```

Use the components as you would any native html tag like `div` and `img`

```html
<cart-items></cart-items>
<shipping-companies></shipping-companies>
<payment-confirmed></payment-confirmed>
```

### 2. Include the `static web-components files`

Download [salla-web-components](https://next-web-components.vercel.app/salla-web-components@1.0.6.zip) build files

```bash
https://next-web-components.vercel.app/salla-web-components@1.0.6.zip
```

Import and use the defineCustomElements function to register the components

```ts
import { defineCustomElements } from "PATH-TO-LOADER/loader"
defineCustomElements(window)
```

Use the components as you would any native html tag like `div` and `img`

```html
<cart-items></cart-items>
<shipping-companies></shipping-companies>
<payment-confirmed></payment-confirmed>
```

### 3. Include the `<script></script>`

include [salla-web-components](https://next-web-components.vercel.app/salla-web-components@1.0.6.zip) script files in website's head

```html
<script
  type="module"
  src="https://next-web-components.vercel.app/dist/salla-web-components/salla-web-components.esm.js"
></script>
<script
  nomodule
  src="https://next-web-components.vercel.app/dist/salla-web-components/salla-web-components.js"
></script>
```

Use the components as you would any native html tag like `div` and `img`

```html
<cart-items></cart-items>
<shipping-companies></shipping-companies>
<payment-confirmed></payment-confirmed>
```

### How To Run: Stencil

Navigate to `Stencil` project

```bash
cd stencil
```

Install deps

```bash
yarn
```

Run the project in development mode

```bash
yarn start
```

Build the project

```bash
yarn build
```

Publish to NPM

```bash
yarn publish
```

### How To Run: NextJS

Navigate to `NextJS` project

```bash
cd next
```

Install deps

```bash
npm i
```

Run the project in development mode

```bash
npm run dev
```

> Available on [localhost:3000](http://localhost:3000)

Build the project

```bash
npm run build
```

Run the project in production mode

```bash
npm run start
```

> Available on [localhost:3000](http://localhost:3000)

### How To Run: VueJS

Navigate to `VueJS` project

```bash
cd vue
```

Install deps

```bash
yarn
```

Run the project in development mode

```bash
yarn dev
```

> Available on [localhost:5173](http://localhost:5173)

Build the project

```bash
yarn build
```

Serve the SPA website

```bash
npx serve dist
```

> Available on [localhost:3000](http://localhost:3000)

### How To Run: Static

Serve the static website

```bash
npx serve static
```

> Available on [localhost:3000](http://localhost:3000)

### How To Test:

Navigate to Stencil project

```bash
cd stencil
```

Install deps

```bash
yarn
```

Run unit tests

```bash
yarn test
```

<img src="https://next-web-components.vercel.app/images/unit-tests-screenshot.png" alt="Unit Tests" style="width: 100%;" />

### Interface and Structure:

There are 3 web-components to be used as 3 steps checkout process:

1. `<cart-items></cart-items>`
2. `<shipping-companies></shipping-companies>`
3. `<payment-confirmed></payment-confirmed>`

The assumption is that you already configured your project to use these web-components.

##### Example usage

```ts
<section>
  <cart-items
    proceedToShipping={onProceedToShipping}
    items={items}
    coupons={coupons}
    error={error}
  ></cart-items>

  <shipping-companies
    proceedToPayment={onProceedToPayment}
    backToCart={onBackToCart}
    companies={companies}
    totals={totals}
    error={error}
  ></shipping-companies>

  <payment-confirmed
    proceedToStore={onProceedToStore}
    order={order}
    error={error}
  ></payment-confirmed>
</section>
```

#### Components Interface:

I use `TypeScript` to define the `interface and expected data` for the 3 web-components.

##### `cart-items`

```ts
//Component interface
interface CartItemsProps {
  proceedToShipping: () => Promise<void>
  items: Item[]
  coupons: Coupon[]
  error: string
}
```

```ts
//Single item type
type Item = {
  id: string
  label: string
  thumbnail: string
  qty: number
  price: {
    currency: string
    amount: number
  }
}

//Single coupon type
type Coupon = {
  id: string
  name: string
  label: string
  discount: {
    type: string
    amount: string
  }
}
```

##### `shipping-companies`

```ts
//Component interface
interface ShippingCompaniesProps {
  proceedToPayment: () => Promise<void>
  backToCart: () => void
  companies: Company[]
  totals: Total[]
  error: string
}
```

```ts
//Single company type
type Company = {
  id: string
  name: string
  label: string
  logo: string
  fees: {
    currency: string
    amount: number
  }
}

//Single total type
type Total = {
  name: string
  label: string
  currency: string
  amount: number
}
```

##### `payment-confirmed`

```ts
//Component interface
interface PaymentConfirmedProps {
  proceedToStore: () => void
  order: Order | null
  error: string
}
```

```ts
//Order type
type Order = { title: string; subtitle: string }
```

### Key Requirements:

1. **Technology Stack:**

   1. [StencilJS](https://stenciljs.com) ✅
   2. [TypeScript](https://www.typescriptlang.org) ✅
   3. [TailwindCSS](https://tailwindcss.com) ✅

<br/>

2. **Component Functionality:** The web component successfully `fulfills its purpose`, as outlined in the [UI](https://www.figma.com/file/rnfEwxBmXacQnX2hEefI2S/FrontEndChallange?type=design&node-id=34%3A4212&mode=dev) provided. Each checkout step has been effectively separated into individual web components, with integrated `state management` to handle and `update internal data seamlessly` throughout the checkout process.

<br/>

3. **Re-Usability:** The component was developed with a focus on encapsulation, ensuring it operates independently without external dependencies. `A clear API was defined to facilitate seamless integration and interaction in diverse contexts`. The resulting web components are successfully utilized in 3 versions of the checkout process—one in Static, Vue, and the last in React—demonstrating its reusability across multiple web technologies.

<br/>

4. **Unit Tests:** `17 unit tests` were written, covering state management, property updates, and event handling. These tests confirmed the `web component's reliability for Static, Vue and React` checkouts.

<br/>

5. **Performance:** StencilJS, along with Vite and NextJS compilers, already provides built-in lazy loading. Additional lazy loading could be implemented when consuming the web components, but I chose to keep the project straightforward and focused on its core purpose without adding unnecessary complexity. `The performance of the web components relies heavily on how they are consumed`, as `they are stateless and depend on the user` to provide the necessary data.

<br/>

6. **Documentation:** The requested documentation on using a web component, including usage examples, explanations of props, methods, events, and state management, has been provided.

### Thank You For the Beautiful Challenge

The challenge pushed my skills a bit and it was very fun to work on. Of course, much can be done better and there is much more to do but I don't want to make this project more comples or this README.md any longer.

<img src="https://next-web-components.vercel.app/images/bow.gif" alt="Bow" style="width: 100%;" />

<br/>

Best,

[Younes Alturkey](https://www.linkedin.com/in/younes-alturkey)

[me@younes.expert](mailto:me@younes.expert)
