// REACT
import { useEffect } from 'react'
// NEXT
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
// CSS
import 'antd/dist/antd.css'
import '../css/antd.css'
import '../css/antoverride.css'
import '../css/global.css'
// ACTIONS
import * as authActions from '../actions/auth'

function MyApp({ Component, pageProps }: AppProps) {

    const router = useRouter()
    const currentPage = router.pathname
    console.log(currentPage)

    const navTo = (pageRoute: string) => {
        router.push(pageRoute)
    }

    useEffect(()=>{
        authActions.checkAuth(navTo, currentPage)
    },[])

    return (
        <Component {...pageProps} />
    )
}

export default MyApp
