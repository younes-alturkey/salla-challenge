import { CartItems } from '@/components/cart-items/cart-items'
import { newSpecPage } from '@stencil/core/testing'

const items = [
  {
    id: '001',
    label: 'JBL QuietComfort 45 wireless bluetooth headphones',
    thumbnail: 'https://cdn.salla.sa/oRmZv/bi7pdht4SRGPLmziP5fDcuFyuDOwz4FypJ5svKxU.jpg',
    qty: 1,
    price: {
      currency: 'SAR',
      amount: 1500,
    },
  },
  {
    id: '002',
    label: 'JBL Active Noise Cancelling Headphones',
    thumbnail: 'https://cdn.salla.sa/oRmZv/9wgo7gyYLL6WsYwugU1zZEn3nypaI93MDCPiPhI5.png',
    qty: 1,
    price: {
      currency: 'SAR',
      amount: 750,
    },
  },
  {
    id: '003',
    label: 'JBL AirPods Max - Sky Blue',
    thumbnail: 'https://cdn.salla.sa/oRmZv/ntqWnEYORNd9I37LmsBNb7A0DnSx3kTd9Sa64lKZ.jpg',
    qty: 1,
    price: {
      currency: 'SAR',
      amount: 1650,
    },
  },
]

const coupons = [
  {
    id: '001',
    name: 'freemusic',
    label: 'FREEMUSIC',
    discount: {
      type: 'percentage',
      amount: '15',
    },
  },
  {
    id: '002',
    name: 'summerdeal',
    label: 'SUMMERDEAL',
    discount: {
      type: 'percentage',
      amount: '20',
    },
  },
  {
    id: '003',
    name: 'newyear',
    label: 'NEWYEAR2024',
    discount: {
      type: 'flat',
      amount: '100',
    },
  },
  {
    id: '004',
    name: 'freedelivery',
    label: 'FREEDELIVERY',
    discount: {
      type: 'flat',
      amount: '50',
    },
  },
  {
    id: '005',
    name: 'backtoschool',
    label: 'BACKTOSCHOOL',
    discount: {
      type: 'percentage',
      amount: '15',
    },
  },
  {
    id: '006',
    name: 'springfest',
    label: 'SPRINGFEST',
    discount: {
      type: 'percentage',
      amount: '25',
    },
  },
]

describe('cart-items', () => {
  let page
  let component: CartItems

  beforeEach(async () => {
    page = await newSpecPage({
      components: [CartItems],
      html: `<cart-items></cart-items>`,
    })

    page.root.items = items
    page.root.coupons = coupons

    component = page.rootInstance

    await page.waitForChanges()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render CartItems', () => {
    expect(page.root).toBeDefined()
  })

  it('should update total when items change', async () => {
    expect(component.total).toBe(3900)
  })

  it('should apply backtoschool coupon correctly', async () => {
    component.couponCode = 'backtoschool'
    component.submitCoupon()

    await page.waitForChanges()

    expect(component.appliedCoupon).toEqual({
      id: '005',
      name: 'backtoschool',
      label: 'BACKTOSCHOOL',
      discount: {
        type: 'percentage',
        amount: '15',
      },
    })

    expect(component.discount).toBe(585)
    expect(component.total).toBe(3315)
  })

  it('should not apply an invalid coupon', async () => {
    component.couponCode = 'invalid'
    component.submitCoupon()

    expect(component.appliedCoupon).toBeNull()
    expect(component.discount).toBe(0)
    expect(component.total).toBe(3900)
  })

  it('should remove the applied coupon correctly', async () => {
    component.couponCode = 'discount10'
    component.submitCoupon()
    component.removeCoupon()

    expect(component.appliedCoupon).toBeNull()
    expect(component.discount).toBe(0)
    expect(component.total).toBe(3900)
  })

  it('should move to next step', async () => {
    async function handleProccedToShipping() {
      page.root.style.display = 'none'
    }

    page.root.proceedToShipping = handleProccedToShipping

    const button = page.root.shadowRoot.querySelector('#proceed')
    button.click()

    await page.waitForChanges()

    const display = page.root.style.display
    expect(display).toBe('none')
  })
})
