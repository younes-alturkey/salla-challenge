import { Company, Total } from '@/types'
import { formatPrice, importFonts } from '@/utils'
import { Component, Element, Prop, State, Watch, h } from '@stencil/core'

@Component({
  tag: 'shipping-companies',
  styleUrl: 'shipping-companies.css',
  shadow: true,
})
export class ShippingCompanies {
  @Element() el: HTMLElement

  @Prop() proceedToPayment: () => Promise<void>
  @Prop() backToCart: () => void
  @Prop() companies: Company[] = []
  @Prop() totals: Total[] = []
  @Prop() error: string = ''

  @State() company: Company | null = null
  @State() total: number = 0
  @State() shippingFees: number = 0

  @Watch('companies')
  handleCompaniesUpdated() {
    this.company = this.companies[0]
  }

  @Watch('totals')
  handleTotalsUpdated() {
    this.total = this.totals.find(item => item.name === 'cart_total')?.amount || 0
  }

  componentWillLoad() {
    try {
      importFonts(['https://fonts.googleapis.com/css2?family=Zain:wght@200;300;400;700;800;900&display=swap'])
    } catch (error) {
      console.error(error)
    }
  }

  onCompanyChange(event: Event) {
    const target = event.target as HTMLInputElement
    const companyId = target.value

    const selectedCompany = this.companies.find(company => company.id === companyId)

    if (selectedCompany) {
      this.company = selectedCompany

      this.shippingFees = selectedCompany.fees.amount
    }
  }

  reloadPage() {
    window.location.reload()
  }

  private async onProceedToPayment() {
    if (this.proceedToPayment) await this.proceedToPayment()
  }

  private onBackToCart() {
    if (this.backToCart) this.backToCart()
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

  private renderShippingCompany(company: Company) {
    return (
      <div class="w-full flex justify-between items-center gap-2">
        <div class="flex justify-start items-center gap-3">
          <div class="flex flex-col gap-2">
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="options"
                class="hidden peer"
                value={company.id}
                checked={this.company && this.company.id === company.id}
                onChange={event => this.onCompanyChange(event)}
              />
              <span class="w-3 h-3 border border-gray-200 bg-gray-100 rounded-full flex justify-center items-center peer-checked:bg-[#004D5A] peer-checked:border-2 peer-checked:border-[#BAF3E6]"></span>
            </label>
          </div>
          <img src={company.logo} alt="DHL Logo" class="w-10 h-5 object-contain" />
          <p class="mt-1 text-black font-light">{company.name}</p>
        </div>

        <p class="text-black">
          {company.fees.amount > 0 ? (
            <span>
              <span>{company.fees.currency}</span> + {formatPrice(company.fees.amount)}
            </span>
          ) : (
            'Free'
          )}
        </p>
      </div>
    )
  }

  private renderShippingCompaniesContainer() {
    return (
      <div class="w-full h-full rounded-[12px] p-[20px] bg-white border border-gray-200 shadow-md flex flex-col">
        <div>
          {this.renderCardHeader()}

          <div class="mt-4 w-full flex justify-start items-center gap-4">
            <button class="mb-1 w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => this.onBackToCart()}>
              <img src="https://next-web-components.vercel.app/images/arrow.svg" alt="Chevron icon" class="w-full h-full object-contain" />
            </button>
            <p class="text-[#004D5A] text-lg">Cart</p>
            <div class="w-full rounded-[12px] bg-[#004D5A] h-[0.2rem]" />
          </div>
        </div>

        <div class="mt-4 h-full flex-grow overflow-auto flex flex-col gap-2">{this.companies.map(company => this.renderShippingCompany(company))}</div>

        <div class="mt-4">
          <div class="mt-4 flex justify-between items-center gap-4">
            <p class="text-black text-lg">Cart Total</p>
            <p class="text-black text-lg">
              <span>SAR</span> {formatPrice(this.total)}
            </p>
          </div>

          <div class="mt-1 flex justify-between items-center gap-4">
            <p class="text-black text-lg">Shipping fees</p>
            <p class="text-black text-lg">
              <span>SAR</span> {formatPrice(this.shippingFees)}
            </p>
          </div>

          <div class="mt-1 flex justify-between items-center gap-4">
            <p class="text-black text-xl">Totals</p>
            <p class="text-black text-xl">
              <span>SAR</span> {formatPrice(this.total + this.shippingFees)}
            </p>
          </div>

          <button
            id="submit"
            disabled={Boolean(!this.company)}
            class="mt-4 w-full bg-[#004D5A] hover:opacity-90 text-white py-2 px-4 rounded-lg font-light"
            onClick={() => this.onProceedToPayment()}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }

  render() {
    try {
      let content

      if (this.error) content = this.renderError(this.error)
      else if (!this.companies || (Array.isArray(this.companies) && this.companies.length < 1) || !this.totals || (Array.isArray(this.totals) && this.totals.length < 1))
        content = this.renderSkeletonLoading()
      else content = this.renderShippingCompaniesContainer()

      return content
    } catch (err) {
      console.error(err)
      return this.renderError(this.error)
    }
  }
}
