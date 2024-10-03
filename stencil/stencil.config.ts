import { Config } from '@stencil/core'
import tailwind, { tailwindHMR } from 'stencil-tailwind-plugin'

export const config: Config = {
  namespace: 'salla-web-components',
  plugins: [tailwind(), tailwindHMR()],
  devServer: {
    reloadStrategy: 'pageReload',
    openBrowser: false,
  },
  extras: { enableImportInjection: true },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
}
