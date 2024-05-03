import 'globals.css'
import { SplitsProvider } from '@0xsplits/splits-sdk-react'
import { gnosisClient } from 'lib/client'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }) {
  return (
    <SplitsProvider config={{ chainId: 100, gnosisClient }}>
      <Component {...pageProps} />
    </SplitsProvider>
  )
}
