// REACT
import React, { useState, useEffect } from 'react'
React.useLayoutEffect = React.useEffect
// ANT
import { Button, Modal, message, Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// COMPONENTS
import Navbar from '../components/navbar'
import AddAppointment from '../components/addAppointment'
import AppointmentCalendar from '../components/appointmentCalendar'
// AXIOS
import axios from 'axios'
// MOMENT
import moment from 'moment'
const dateFormat = "DD-MMM-YYYY"
const timeFormat = "HH:mm"

const Appointments = () => {
    const [addingAppointment, setAddingAppointment] = useState(false)
    const [patients, setPatients] = useState([])
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)

    const loadPatientsAndAppointments = () => {
        setLoading(true)
        const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/patients/fetch`,config)
        .then(res=>{
            setPatients(res.data.message)
            axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/appointments/fetch`,config)
            .then(res=>{
                let appts = res.data.message
                appts.sort((a: any,b: any)=> moment(`${a.date.split("T")[0]}T${a.time.split("T")[1]}`).unix() - moment(`${b.date.split("T")[0]}T${b.time.split("T")[1]}`).unix())
                setAppointments(res.data.message)
                setLoading(false)
            })
            .catch(()=>{
                message.error("Unable to Load Appointments")
                setLoading(false)
            })
        })
        .catch(()=>{
            message.error("Unable to Load Patients")
            setLoading(false)
        })
    }

    const addAppointmentModal = (
        <Modal destroyOnClose title="Add Appointment" visible={addingAppointment} footer={null} maskClosable={false} onCancel={()=>setAddingAppointment(false)}>
            <AddAppointment patients={patients} modalVisible={setAddingAppointment} reloadData={loadPatientsAndAppointments}/>
        </Modal>
    )

    const fetchAppointmentDisplay = (appt: any) => {
        return <div key={appt._id}><p>{`${moment(appt.date).format(dateFormat)} ${moment(appt.time).format(timeFormat)}`}</p></div>
    }

    useEffect(()=>{
        loadPatientsAndAppointments()
    },[])

    return (
        <div>
            <Navbar/>
            {addAppointmentModal}
            <div className="pageWrapper">
                <div className="pageDivider2">
                    <div>
                        <h1>Upcoming Appointments</h1>
                        <Button type="primary" icon={<PlusOutlined/>} onClick={()=>setAddingAppointment(true)}>Add Appointment</Button>
                        {
                            loading ?
                            <Spin/>
                            :
                            appointments.map(a=>fetchAppointmentDisplay(a))
                        }
                    </div>
                    <div>
                        <AppointmentCalendar patients={patients} appointments={appointments}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointments
