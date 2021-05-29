// REACT
import React, { useState } from 'react'
// NEXT
import { useRouter } from 'next/router'
import Link from 'next/link'
// ANTD
import { Form, Input, Button, Divider } from 'antd'
// CSS
import signinStyles from '../css/signin.module.css'
// IMAGES
const logoImage = require('../assets/gpmitralogotransp.png')
// ACTIONS
import * as authActions from '../actions/auth'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const SigninPage = () => {

    const router = useRouter()

    const [signinLoading,setLoading] = useState(false)

    const navTo = (pageRoute: string) => {
        router.push(pageRoute)
    }

    const onFinish = (values: any) => {
        setLoading(true)
        authActions.login(values, setLoading, navTo)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo)
    }
    return (
        <div className={signinStyles.signinPage}>
                <div className={signinStyles.signinPicture}>
                    <div className={signinStyles.signinOverlay}></div>
                </div>
                <div className={signinStyles.signinForm}>
                    <img className={signinStyles.gpmitraLogo} src={logoImage} alt=""/>
                    <Form {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input placeholder="Enter Email ID" style={{maxWidth:"300px"}}/>
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password placeholder="Enter Password" style={{maxWidth:"300px"}}/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button loading={signinLoading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider className={signinStyles.divider}>Not Registered?</Divider>
                    <div className={signinStyles.btnChangeContext}>
                        <Link href="/register">
                            <Button type="primary">Register</Button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default SigninPage
