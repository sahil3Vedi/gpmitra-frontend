// REACT
import React, { useState } from 'react'
// NEXT
import { useRouter } from 'next/router'
// ANTD
import { Form, Input, Button, message } from 'antd'
// CSS
import signinStyles from '../css/signin.module.css'
// IMAGES
const logoImage = require('../assets/gpmitralogotransp.png')
// ACTIONS
import * as authActions from '../actions/auth.ts'

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
        console.log("Fel")
    }
    return (
        <div className={signinStyles.signinPage}>
                <div className={signinStyles.signinPicture}>
                    <div className={signinStyles.signinOverlay}></div>
                </div>
                <div className={signinStyles.signinForm}>
                    <img className={signinStyles.gpmitraLogo} src={logoImage} alt=""/>
                    <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input style={{maxWidth:"300px"}}/>
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password style={{maxWidth:"300px"}}/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button loading={signinLoading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
    )
}

export default SigninPage
