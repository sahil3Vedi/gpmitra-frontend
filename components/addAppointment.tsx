// REACT
import { useState } from 'react'
// ANT
import { DatePicker, TimePicker, Form, Button, AutoComplete } from 'antd'
// MOMENT
import moment from 'moment'
// FORM
const layout = {labelCol: { span: 8 },wrapperCol: { span: 16 }}
const tailLayout = {wrapperCol: { offset: 8, span: 16 }}
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

    const onFinish = (values: any) => {
        console.log(values)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo)
    }

    return (
        <div>
            <Form {...layout} name="basic" onFinish={onFinish} form={appointmentForm} onFinishFailed={onFinishFailed}>
                <Form.Item label="Patient" name="patient" rules={[{ required: true, message: 'Please select Patient' }]}>
                    <AutoComplete placeholder="Select Patient" style={{width:"300px"}}/>
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
