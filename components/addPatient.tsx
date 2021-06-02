// REACT
import { useState } from 'react'
// ANT
import { Form, Button, Input, InputNumber, DatePicker, Select, message } from 'antd'
const { TextArea } = Input
// AXIOS
import axios from 'axios'
// MOMENT
import moment from 'moment'
// FORM
const layout = {labelCol: { span: 8 },wrapperCol: { span: 16 }}
const tailLayout = {wrapperCol: { offset: 8, span: 16 }}
const communities = [{label:'Hindu',value:'hindu'},{label:'Muslim',value:'muslim'},{label:'Christian',value:'christian'},{label:'Parsi',value:'parsi'},{label:'Jain',value:'jain'},{label:'Sikh',value:'sikh'},{label:'Buddhist',value:'buddhist'},{label:'Other',value:'Other'}]
const genders = [{label:'Male',value:'male'},{label:'Female',value:'female'},{label:'Other',value:'other'}]
// DATETIME
const dateFormat="DD-MMM-YYYY"
function disabledDate(current: any) {
  // Can not select days after today
  return current > moment().endOf('day');
}

const AddPatient = (props: any) => {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [ageDisabled, setAgeDisabled] = useState(false)
    const [dobDisabled, setDobDisabled] = useState(false)

    const onFinish = (values: any) => {
        setLoading(true)
        const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/patients/create`,values, config)
        .then(()=>{
            message.success("Patient Added")
            setLoading(false)
            props.reloadTable()
            props.setModalVisible(false)
        })
        .catch(()=>{
            message.error("Unable to Add Patient")
            setLoading(false)
        })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo)
    }

    const calcAge = (value: any) => {
        let years = moment().diff(value,'years',true).toFixed(3)
        form.setFieldsValue({age: value ? years : null})
        setAgeDisabled(value ? true : false)
    }

    const disableDOB = (value: any) => {
        setDobDisabled(value ? true : false)
    }

    return(
        <div>
            <Form {...layout} name="basic" onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>
                <Form.Item label="Patient Name" name="name" rules={[{ required: true, message: 'Please enter Patient Name' }]}>
                    <Input placeholder="Enter Patient Name" style={{maxWidth:"300px"}}/>
                </Form.Item>
                <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender' }]}>
                    <Select placeholder="Select Gender" style={{maxWidth:"300px"}} options={genders}/>
                </Form.Item>
                <Form.Item label="Contact Number" name="phone" rules={[{ required: true, message: 'Kindly enter Contact Number' }]}>
                    <InputNumber placeholder="Enter Contact Number" style={{width:"300px"}} formatter={value=>`+91 ${value}`} parser={(value:any)=>value.replace('+91 ', '')} max={9999999999} min={1000000000}/>
                </Form.Item>
                <Form.Item label="Date Of Birth" name="dob">
                    <DatePicker disabled={dobDisabled} format={dateFormat} disabledDate={disabledDate} onChange={calcAge}/>
                </Form.Item>
                <Form.Item label="Age in Years" name="age" rules={[{ required: true, message: 'Kindly enter Age' }]}>
                    <InputNumber disabled={ageDisabled} placeholder="Enter Age" max={200} min={0} onChange={disableDOB}/>
                </Form.Item>
                <Form.Item label="Community" name="community">
                    <Select placeholder="Select Community" style={{maxWidth:"300px"}} options={communities} allowClear/>
                </Form.Item>
                <Form.Item label="Email ID" name="email">
                    <Input placeholder="Enter Email" style={{maxWidth:"300px"}}/>
                </Form.Item>
                <Form.Item label="Address" name="address">
                    <TextArea placeholder="Enter Address" style={{maxWidth:"300px"}} rows={4}/>
                </Form.Item>
                <Form.Item label="Occupation" name="occupation">
                    <Input placeholder="Enter Occupation" style={{maxWidth:"300px"}}/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Add Patient
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddPatient
