// AXIOS
import axios from 'axios'
// ANTD
import { message } from 'antd'

export const login = (values: any, callback: any, navTo: any) => {
    const {email, password} = values
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/doctors/login`, {email, password})
    .then(res=>{
        console.log(res.data)
        let token = res.data.token
        const expirationDate = new Date(new Date().getTime() + 3600*1000)
        localStorage.setItem('token', token)
        localStorage.setItem('expirationDate', expirationDate.toString())
        setTimeout(() => {
            logout(navTo)
        }, 3600*1000)
        message.success("Authenticated")
        callback(false)
        navTo('/dashboard')
    })
    .catch(e=>{
        console.log(e)
        message.error(e.response.data.message)
        callback(false)
    })
}

export const logout = (navTo: any) => {
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('token')
    navTo('/signin')
}

export const checkAuth = (navTo: any, pageRoute: string) => {
    let token = localStorage.getItem('token')
    if (!token) {
        logout(navTo)
    } else {
        let exp_date: string = localStorage.getItem('expirationDate') || ""
        const expirationDate = new Date(exp_date)
        if (expirationDate <= new Date()){
            logout(navTo)
        }
        else {
            setTimeout(() => {
                logout(navTo)
            }, expirationDate.getTime() - new Date().getTime())
            navTo(pageRoute==="/signin" ? "/dashboard" : pageRoute)
        }
    }
}
