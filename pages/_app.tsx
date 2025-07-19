import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        toastOptions={{ loading: { duration: 3000 } }}
        position="bottom-center"
        reverseOrder={true}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
