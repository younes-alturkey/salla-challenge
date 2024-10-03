import { ShippingCompanies } from '@/components/shipping-companies/shipping-companies'
import { newSpecPage } from '@stencil/core/testing'

const companies = [
  {
    id: '002',
    name: 'dhl',
    label: 'DHL',
    logo: 'https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg',
    fees: {
      currency: 'SAR',
      amount: 0,
    },
  },
  {
    id: '003',
    name: 'fedex',
    label: 'FedEx',
    logo: 'https://www.fedex.com/content/dam/fedex-com/logos/logo.png',
    fees: {
      currency: 'SAR',
      amount: 15,
    },
  },
  {
    id: '001',
    name: 'aramex',
    label: 'Aramex',
    logo: 'https://www.aramex.com/Sitefinity/WebsiteTemplates/aramex/App_Themes/aramex/Images/Aramex%20logo%20English.webp',
    fees: {
      currency: 'SAR',
      amount: 25,
    },
  },
]

const totals = [
  {
    name: 'cart_total',
    label: 'Cart Total',
    currency: 'SAR',
    amount: 3900,
  },
  {
    name: 'discount',
    label: 'Discount',
    currency: 'SAR',
    amount: 0,
  },
  {
    name: 'shipping_fees',
    label: 'Shipping Fees',
    currency: 'SAR',
    amount: 0,
  },
  {
    name: 'total',
    label: 'Total',
    currency: 'SAR',
    amount: 3900,
  },
]

describe('shipping-companies', () => {
  let page
  let component: ShippingCompanies

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ShippingCompanies],
      html: `<shipping-companies></shipping-companies>`,
    })

    page.root.companies = companies
    page.root.totals = totals

    component = page.rootInstance

    await page.waitForChanges()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render ShippingCompanies', () => {
    expect(page.root).toBeDefined()
  })

  it('should load shipping data correctly', async () => {
    expect(component.companies).toBe(companies)
    expect(component.totals).toBe(totals)
  })

  it('should calculate cart total correctly', async () => {
    expect(component.total).toBe(totals.find(item => item.name === 'cart_total')?.amount || 0)
  })

  it('should change shipping company successfully', async () => {
    const company = companies[1]

    const companyChangeEvent = {
      target: { value: company.id },
    } as any

    component.onCompanyChange(companyChangeEvent)

    await page.waitForChanges()

    expect(component.shippingFees).toBe(company.fees.amount)
  })

  it('should move to next step', async () => {
    async function handleProccedToPayment() {
      page.root.style.display = 'none'
    }

    page.root.proceedToPayment = handleProccedToPayment

    // Find the submit button and click it
    const button = page.root.shadowRoot.querySelector('#submit')
    button.click()

    // Wait for changes after the button click to ensure UI updates
    await page.waitForChanges()

    // Get the display style of the root component
    const display = page.root.style.display
    expect(display).toBe('none')
  })
})
