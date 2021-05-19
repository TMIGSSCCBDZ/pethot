import '../styles/globals.css'
import Header from '../components/Header'
import reducer,{initialState}from '../backend/reducer'
import {StateProvider} from '../backend/StateProvider'
function MyApp({ Component, pageProps }) {
  return (
    <>
  <Header />
<StateProvider initialState={initialState} reducer={reducer}>
  <Component {...pageProps}  />
  </StateProvider>
 </>
 
  )
}

export default MyApp
