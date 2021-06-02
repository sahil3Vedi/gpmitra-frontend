// REACT
import React, { useState, useEffect } from 'react'
React.useLayoutEffect = React.useEffect
// ANT
import { Button, Calendar, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// COMPONENTS
import Navbar from '../components/navbar'
import AddAppointment from '../components/addAppointment'
// AXIOS
import axios from 'axios'

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
                setAppointments(res.data.message)
                setLoading(false)
            })
            .catch(e=>{
                message.error("Unable to Load Appointments")
                setLoading(false)
            })
        })
        .catch(e=>{
            message.error("Unable to Load Patients")
            setLoading(false)
        })
    }

    const addAppointmentModal = (
        <Modal title="Add Appointment" visible={addingAppointment} footer={null} maskClosable={false} onCancel={()=>setAddingAppointment(false)}>
            <AddAppointment patients={patients} modalVisible={setAddingAppointment}/>
        </Modal>
    )

    useEffect(()=>{
        loadPatientsAndAppointments()
    },[])

    console.log(appointments)

    return (
        <div>
            <Navbar/>
            {addAppointmentModal}
            <div className="pageWrapper">
                <div className="pageDivider2">
                    <div>
                        <h1>Upcoming Appointments</h1>
                        <Button type="primary" icon={<PlusOutlined/>} onClick={()=>setAddingAppointment(true)}>Add Appointment</Button>
                    </div>
                    <div>
                        <Calendar/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointments
