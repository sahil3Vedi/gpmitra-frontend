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
            logout()
        }, 3600*1000)
        message.success("Authenticated")
        callback(false)
        navTo('/dashboard')
    })
    .catch(e=>{
        console.log(e)
        message.error("Unable to Authenticate")
        callback(false)
    })
}

export const logout = () => {
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('token')
    window.location.pathname = '/signin'
}

export const checkAuth = (navTo: any, pageRoute: string) => {
    let token = localStorage.getItem('token')
    if (!token) {
        navTo((pageRoute!=="/signin" && pageRoute!=="/register") ? "/" : pageRoute)
    } else {
        let exp_date: string = localStorage.getItem('expirationDate') || ""
        const expirationDate = new Date(exp_date)
        if (expirationDate <= new Date()){
            logout()
        }
        else {
            setTimeout(() => {
                logout()
            }, expirationDate.getTime() - new Date().getTime())
            navTo(pageRoute==="/signin" ? "/dashboard" : pageRoute)
        }
    }
}

export const register = (values: any, callback: any, navTo: any) => {
    const {email, password, fullname, qualification, organisation, phone} = values
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/doctors/register`, {email, password, name: fullname, qualification, organisation, phone})
    .then(res=>{
        console.log(res.data)
        let token = res.data.token
        const expirationDate = new Date(new Date().getTime() + 3600*1000)
        localStorage.setItem('token', token)
        localStorage.setItem('expirationDate', expirationDate.toString())
        setTimeout(() => {
            logout()
        }, 3600*1000)
        message.success("Authenticated")
        callback(false)
        navTo('/dashboard')
    })
    .catch(e=>{
        console.log(e)
        message.error("Unable to Register")
        callback(false)
    })
}
