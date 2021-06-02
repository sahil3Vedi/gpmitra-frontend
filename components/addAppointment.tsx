// REACT
import { useState } from 'react'
// ANT
import { DatePicker, TimePicker, Form, Button, AutoComplete, Select, message } from 'antd'
const { Option } = Select
// MOMENT
import moment from 'moment'
// FORM
const layout = {labelCol: { span: 8 },wrapperCol: { span: 16 }}
const tailLayout = {wrapperCol: { offset: 8, span: 16 }}
// AXIOS
import axios from 'axios'
// DATETIME
const dateFormat="DD-MMM-YYYY"
const timeFormat="HH:mm"
function disabledDate(current: any) {
  // Can not select days before today
  return current < moment().subtract(1,'days').endOf('day');
}

const AddAppointment = (props: any) => {

    const [appointmentForm] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [validName, setValidName] = useState(false)

    const onFinish = (values: any) => {
        setLoading(true)
        const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/appointments/create`, values, config)
        .then(res=>{
            message.success("Appointment Added")
            setLoading(false)
            props.modalVisible(false)
        })
        .catch(e=>{
            message.success("Unable to Add Appointment")
            setLoading(false)
        })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo)
    }

    const patients = props.patients
    patients.sort((a, b) => a.name.localeCompare(b.name))
    const patientOptions = patients.map(p=><Option value={p._id} key={p._id}>{`${p.name} (+91 ${p.phone})`}</Option>)

    return (
        <div>
            <Form {...layout} name="basic" onFinish={onFinish} form={appointmentForm} onFinishFailed={onFinishFailed}>
                <Form.Item label="Patient" name="patient" rules={[{ required: true, message: 'Please select Patient' }]}>
                    <Select placeholder="Select Patient" style={{width:"300px"}}>
                        {patientOptions}
                    </Select>
                </Form.Item>
                <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select Date' }]}>
                    <DatePicker format={dateFormat} disabledDate={disabledDate} style={{width:"300px"}}/>
                </Form.Item>
                <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Please select Time' }]}>
                    <TimePicker format={timeFormat} minuteStep={5} style={{width:"300px"}}/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button loading={loading} type="primary" htmlType="submit">Add Patient</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddAppointment
