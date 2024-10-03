import { PaymentConfirmed } from '@/components/payment-confirmed/payment-confirmed'
import { newSpecPage } from '@stencil/core/testing'

const data = { title: 'Payment Confirmed', subtitle: 'Thank you for shopping' }

describe('payment-confirmed', () => {
  let page
  let component: PaymentConfirmed

  beforeEach(async () => {
    page = await newSpecPage({
      components: [PaymentConfirmed],
      html: `<payment-confirmed></payment-confirmed>`,
    })

    page.root.data = data

    component = page.rootInstance

    await page.waitForChanges()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render PaymentConfirmed', () => {
    expect(page.root).toBeDefined()
  })

  it('should load confirmed data correctly', async () => {
    expect(component.data.title).toBe(data.title)
    expect(component.data.subtitle).toBe(data.subtitle)
  })
})
