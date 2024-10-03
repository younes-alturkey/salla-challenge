import { Coupon, Item } from '@/types'
import { formatPrice, importFonts } from '@/utils'
import { Component, Element, Prop, State, Watch, h } from '@stencil/core'

@Component({
  tag: 'cart-items',
  styleUrl: 'cart-items.css',
  shadow: true,
})
export class CartItems {
  @Element() el: HTMLElement

  @Prop() proceedToShipping: () => Promise<void>
  @Prop() items: Item[] = []
  @Prop() coupons: Coupon[] = []
  @Prop() error: string = ''

  @State() couponCode: string = ''
  @State() appliedCoupon: Coupon | null = null
  @State() discount: number = 0
  @State() total: number = 0

  @Watch('items')
  handleItemsUpdated() {
    this.total = this.items.reduce((acc, item) => acc + item.price.amount * item.qty, 0)
  }

  componentWillLoad() {
    try {
      importFonts(['https://fonts.googleapis.com/css2?family=Zain:wght@200;300;400;700;800;900&display=swap'])
    } catch (error) {
      console.error(error)
    }
  }

  private onCouponCodeChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.couponCode = target.value
  }

  submitCoupon() {
    const coupon = this.coupons.find(c => c.name === this.couponCode.toLowerCase())

    if (coupon) {
      this.appliedCoupon = coupon
      const discountAmount = coupon.discount.type === 'percentage' ? this.total * (parseFloat(coupon.discount.amount) / 100) : parseFloat(coupon.discount.amount)
      this.discount = discountAmount
      this.total = Math.max(0, this.total - discountAmount)
    }
  }

  removeCoupon() {
    this.appliedCoupon = null
    this.discount = 0
    this.total = this.items.reduce((acc, item) => acc + item.price.amount * item.qty, 0)
  }

  private reloadPage() {
    window.location.reload()
  }

  private async onProceedToShipping() {
    if (this.proceedToShipping) await this.proceedToShipping()
  }

  private renderError(message: string) {
    return (
      <div class="w-full h-full flex flex-col justify-center items-center bg-gray-50 border border-gray-200 rounded-md px-4 py-8">
        <img class="w-64 h-64" src="https://next-web-components.vercel.app/images/error.png" alt="Error illustration" />
        <p class="text-black/50">{message}</p>
        <button type="button" class="hover:text-[#004D5A] cursor-pointer" onClick={() => this.reloadPage()}>
          Reload page?
        </button>
      </div>
    )
  }

  private renderCardHeader() {
    return (
      <div class="w-full flex justify-start items-center gap-4">
        <img src="https://next-web-components.vercel.app/images/cart.svg" alt="Cart icon" class="w-[30px] h-[38.33px] object-contain" />
        <div class="h-[36.33px] flex flex-col justify-start items-start select-none">
          <p class="font-medium text-xl text-[#004D5A]">StoreName</p>
          <div class="-mt-2 flex justify-start items-center gap-1">
            <p class="underline opacity-30 text-base font-light">store</p>
            <p class="opacity-30 text-base font-light">/</p>
            <p class="underline opacity-30 text-base font-light">cart</p>
            <p class="opacity-30 text-base font-light">/</p>
            <p class="text-base font-light text-black/70">checkout</p>
          </div>
        </div>
      </div>
    )
  }

  private renderSkeletonLoading() {
    return (
      <div class="w-full h-full rounded-[12px] p-[20px] bg-white border border-gray-200 shadow-md flex flex-col">
        <div class="">
          {this.renderCardHeader()}

          <div class="mt-4 w-full flex justify-start items-center gap-4">
            <div class="flex-[0.3] rounded-[12px] bg-gray-200 h-4 animate-pulse" />
            <div class="flex-[0.7] rounded-[12px] bg-gray-200 h-[0.2rem] animate-pulse" />
          </div>
        </div>

        <div class="mt-4 h-full flex-grow">
          <div class="w-full h-full bg-gray-200 rounded-[12px] animate-pulse" />
        </div>

        <div class="mt-4">
          <div class="flex justify-start items-center gap-16">
            <div class="w-8/12 rounded-[12px] bg-gray-200 h-4 animate-pulse" />
            <div class="w-4/12 rounded-[12px] bg-gray-200 h-4 animate-pulse" />
          </div>

          <div class="mt-4 flex justify-start items-center gap-16">
            <div class="w-8/12 rounded-[12px] bg-gray-200 h-4 animate-pulse" />
            <div class="w-4/12 rounded-[12px] bg-gray-200 h-4 animate-pulse" />
          </div>

          <div class="mt-4 w-full h-[48px] box-border bg-gray-200 rounded-[12px] animate-pulse" />
        </div>
      </div>
    )
  }

  private renderCartItem(item: Item) {
    return (
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div class="flex-1 md:flex-[0.6] flex justify-start items-center gap-2">
          <div class="bg-white rounded-full border-2 border-gray-200 overflow-hidden w-[40px] h-[40px]">
            <img src={item.thumbnail} alt={`${item.label}'s thumbnail`} class="w-full h-full object-contain" />
          </div>

          <div class="w-10/12 md:w-[200px]">
            <p class="text-[#004D5A] text-xl md:text-lg underline w-full line-clamp-2 font-light">{item.label}</p>
            <p class="text-gray-400 font-light text-sm">
              <span class="capitalize">{item.price.currency}</span> {formatPrice(item.price.amount)}
            </p>

            <div class="w-full flex md:hidden justify-between items-center gap-2">
              <p class="text-black text-base">{item.qty}</p>
              <p class="text-black text-base">
                <span class="capitalize">{item.price.currency}</span> {formatPrice(item.price.amount)}
              </p>
            </div>
          </div>
        </div>

        <p class="hidden md:block flex-[0.2] text-black text-base">{item.qty}</p>
        <p class="hidden md:block flex-[0.2] text-black text-base">
          <span class="capitalize">{item.price.currency}</span> {formatPrice(item.price.amount)}
        </p>
      </div>
    )
  }

  private renderCartItemsContainer() {
    return (
      <div class="w-full h-full rounded-[12px] p-[20px] bg-white border border-gray-200 shadow-md flex flex-col">
        <div>
          {this.renderCardHeader()}

          <div class="mt-4 w-full flex justify-start items-center gap-4">
            <p class="text-[#004D5A] text-lg">Cart</p>
            <div class="w-full rounded-[12px] bg-[#004D5A] h-[0.2rem]" />
          </div>
        </div>

        <div class="mt-4 h-full flex-grow bg-[#BAF3E626] border-[#BAF3E6] border rounded-[12px] p-4 flex flex-col gap-2">
          {this.items.map((item, i) => (
            <div>
              {this.renderCartItem(item)}
              {i < this.items.length - 1 && <div class="my-2 w-11/12 mx-auto h-[0.05rem] bg-[#BAF3E6]" />}
            </div>
          ))}
        </div>

        <div class="mt-4">
          {this.appliedCoupon ? (
            <div class="flex justify-between items-center gap-4">
              <div class="border-gray-200 border px-2 flex justify-start items-center gap-2 rounded-lg">
                <img src="https://next-web-components.vercel.app/images/discount.svg" alt="Discount icon" class="w-[12px] h-[16px] object-contain" />
                <p class="mt-1 capitalize text-lg">{this.appliedCoupon.label}</p>
                <button class="hover:opacity-80" onClick={() => this.removeCoupon()}>
                  <img src="https://next-web-components.vercel.app/images/delete.svg" alt="Delete icon" class="w-[12px] h-[16px] object-contain" />
                </button>
              </div>
              <p class="text-red-500">
                <span>SAR</span> -{formatPrice(this.discount)}
              </p>
            </div>
          ) : (
            <div class="flex justify-between items-center gap-4">
              <p class="text-black text-base">Have a coupon?</p>
              <div class="border-gray-200 border-2 bg-gray-50 placeholder:text-gray-200 relative rounded-lg py-1 px-2 pr-[4.5rem]">
                <input
                  id="coupon-code-input"
                  type="text"
                  class="w-[80px] h-full bg-transparent outline-none"
                  placeholder="insert code"
                  value={this.couponCode}
                  onInput={event => this.onCouponCodeChange(event)}
                />
                <button class="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#004D5A] hover:opacity-90 text-white px-4 rounded-lg" onClick={() => this.submitCoupon()}>
                  Apply
                </button>
              </div>
            </div>
          )}

          <div class="mt-4 flex justify-between items-center gap-4">
            <p class="text-black text-lg">Cart Total</p>
            <p class="text-black text-lg">
              <span>SAR</span> {formatPrice(this.total)}
            </p>
          </div>

          <button id="proceed" class="mt-4 w-full bg-[#004D5A] hover:opacity-90 text-white py-2 px-4 rounded-lg font-light" onClick={() => this.onProceedToShipping()}>
            Proceed to shipping
          </button>
        </div>
      </div>
    )
  }

  render() {
    try {
      let content

      if (this.error) content = this.renderError(this.error)
      else if (!this.items || (Array.isArray(this.items) && this.items.length < 1)) content = this.renderSkeletonLoading()
      else content = this.renderCartItemsContainer()

      return content
    } catch (err) {
      console.error(err)
      return this.renderError(this.error)
    }
  }
}
