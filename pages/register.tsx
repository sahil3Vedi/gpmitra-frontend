// REACT
import React, { useState } from 'react'
// NEXT
import { useRouter } from 'next/router'
import Link from 'next/link'
// ANTD
import { Form, Input, Button, message, Select, InputNumber, Divider } from 'antd'
// CSS
import signinStyles from '../css/signin.module.css'
// IMAGES
const logoImage = require('../assets/gpmitralogotranspshort.png')
// ACTIONS
import * as authActions from '../actions/auth'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const { Option } = Select

const RegisterPage = () => {

    const router = useRouter()

    const [signinLoading,setLoading] = useState(false)

    const navTo = (pageRoute: string) => {
        router.push(pageRoute)
    }

    const onFinish = (values: any) => {
        if (values.password != values.confirm_password){
            message.error("Passwords Do Not Match")
        } else {
            setLoading(true)
            authActions.register(values, setLoading, navTo)
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo)
    }
    return (
        <div className={signinStyles.signinPage}>
                <div className={signinStyles.registerPicture}>
                    <div className={signinStyles.signinOverlay}></div>
                </div>
                <div className={signinStyles.signinForm}>
                    <img className={signinStyles.gpmitraShortLogo} src={logoImage} alt=""/>
                    <p className={signinStyles.signinTitle}>Doctor Registration</p>
                    <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Kindly enter your email address' }]}>
                            <Input placeholder="Enter Email ID" style={{maxWidth:"300px"}}/>
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Kindly enter your password' }]}>
                            <Input.Password placeholder="Enter Password" style={{maxWidth:"300px"}}/>
                        </Form.Item>

                        <Form.Item label="Confirm Password" name="confirm_password" rules={[{ required: true, message: 'Kindly confirm your password' }]}>
                            <Input.Password placeholder="Confirm Password" style={{maxWidth:"300px"}}/>
                        </Form.Item>

                        <Form.Item label="Full Name" name="fullname" rules={[{ required: true, message: 'Kindly enter your full name' }]}>
                            <Input placeholder="Enter Full Name" style={{maxWidth:"300px"}} addonBefore="Dr. "/>
                        </Form.Item>

                        <Form.Item label="Qualification" name="qualification" rules={[{ required: true, message: 'Kindly select your  qualification' }]}>
                            <Select showSearch style={{maxWidth:"300px"}} placeholder="Select Qualification" optionFilterProp="children" filterOption={(input, option) => option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                <Option value="DHMS">DHMS</Option>
                                <Option value="MD">MD</Option>
                                <Option value="MBBS">MBBS</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Organisation" name="organisation" rules={[{ required: true, message: 'Kindly enter your organisation name' }]}>
                            <Input placeholder="Enter Organisation Name" style={{maxWidth:"300px"}}/>
                        </Form.Item>

                        <Form.Item label="Contact Number" name="phone" rules={[{ required: true, message: 'Kindly enter your contact number' }]}>
                            <InputNumber placeholder="Enter Contact Number" style={{width:"300px"}} formatter={value=>`+91 ${value}`} parser={(value:any)=>value.replace('+91 ', '')} max={9999999999} min={999999999}/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button loading={signinLoading} type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider className={signinStyles.divider}>Already Registered?</Divider>
                    <div className={signinStyles.btnChangeContext}>
                        <Link href="/signin">
                            <Button type="primary">Sign In</Button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default RegisterPage
