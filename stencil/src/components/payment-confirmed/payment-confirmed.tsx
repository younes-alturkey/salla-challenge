import { importFonts } from '@/utils'
import { Component, Element, Prop, h } from '@stencil/core'

@Component({
  tag: 'payment-confirmed',
  styleUrl: 'payment-confirmed.css',
  shadow: true,
})
export class PaymentConfirmed {
  @Element() el: HTMLElement

  @Prop() proceedToStore: () => void
  @Prop() data: { title: string; subtitle: string } | null = null
  @Prop() error: string = ''

  componentWillLoad() {
    try {
      importFonts(['https://fonts.googleapis.com/css2?family=Zain:wght@200;300;400;700;800;900&display=swap'])
    } catch (error) {
      console.error(error)
    }
  }

  private reloadPage() {
    window.location.reload()
  }

  private onProceedToStore() {
    if (this.proceedToStore) this.proceedToStore()
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

  private renderSkeletonLoading() {
    return (
      <div class="w-full h-full rounded-[12px] p-[20px] bg-white border border-gray-200 shadow-md flex flex-col">
        <div class="mt-4 h-full flex-grow">
          <div class="w-full h-full bg-gray-200 rounded-[12px] animate-pulse" />
        </div>
      </div>
    )
  }

  private renderConfirmedContainer() {
    return (
      <div class="w-full h-full rounded-[12px] p-[20px] bg-white border border-gray-200 shadow-md flex flex-col">
        <div class="mt-4 h-full flex-grow">
          <div class="w-full h-full flex flex-col justify-center items-center gap-2">
            <div class="flex flex-col justify-center items-center gap-2">
              <img src="https://next-web-components.vercel.app/images/cart.svg" alt="Cart icon" class="w-[30px] h-[38.33px] object-contain" />
              <p class="font-medium text-xl text-[#004D5A]">StoreName</p>
            </div>
            <div class="text-center">
              <p class="text-black text-4xl font-bold w-6/12 md:w-full mx-auto">{this.data.title}</p>
              <p class="mt-1 text-gray-300 text-2xl font-light">{this.data.subtitle}</p>
            </div>
            <button class="underline text-[#22BA99] font-light text-base" onClick={() => this.onProceedToStore()}>
              return to store
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    try {
      let content

      if (this.error) content = this.renderError(this.error)
      else if (!this.data || !this.data.title || !this.data.subtitle) content = this.renderSkeletonLoading()
      else content = this.renderConfirmedContainer()

      return content
    } catch (err) {
      console.error(err)
      return this.renderError(this.error)
    }
  }
}
