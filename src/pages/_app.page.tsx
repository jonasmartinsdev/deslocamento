import DefaultLayout from '@/components/Layout/DefaultLayout'
import { Provider } from 'react-redux'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import { wrapper } from '@/store/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App: React.FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <DefaultLayout>
        <Component {...props.pageProps} />
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={true}
          pauseOnHover={false}
        />
      </DefaultLayout>
    </Provider>
  )
}
export default App
