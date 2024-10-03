export function format(first?: string, middle?: string, last?: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
}

export function importFonts(fontUrls: string[]): void {
  fontUrls.forEach(url => {
    const link = document.createElement('link')
    link.href = url
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  })
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
