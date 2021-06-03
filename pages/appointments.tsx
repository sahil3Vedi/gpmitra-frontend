// REACT
import React, { useState, useEffect } from 'react'
React.useLayoutEffect = React.useEffect
// ANT
import { Button, Modal, message, Spin, Space } from 'antd'
import { PlusOutlined, CheckOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons'
// CSS
import AppointmentsStyle from '../css/appointments.module.css'
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
    const [patients, setPatients] = useState<any>([])
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPatientDetails = (patientID: any) => {
        for (var p in patients){
            if (patientID === patients[p]._id){
                return <p className={AppointmentsStyle.upcomingPatientDetails}>{`${patients[p].name} (+91 ${patients[p].phone})`}</p>
            }
        }
    }

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
        return (
            <div key={appt._id} className={AppointmentsStyle.upcomingAppointment}>
                <div>
                    <p className={AppointmentsStyle.appointmentDate}>{`${moment(appt.date).format(dateFormat).split('-')[0]} ${moment(appt.date).format(dateFormat).split('-')[1]}`}</p>
                    <p className={AppointmentsStyle.appointmentTime}>{`${moment(appt.time).format(timeFormat)}`}</p>
                </div>
                <div>
                    {fetchPatientDetails(appt.patient)}
                </div>
                <div className={AppointmentsStyle.appointmentActions}>
                    <Space>
                        <Button icon={<CheckOutlined />} type="primary"></Button>
                        <Button icon={<SettingOutlined />}></Button>
                        <Button icon={<DeleteOutlined />} danger></Button>
                    </Space>
                </div>
            </div>
        )
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
                        <div className={AppointmentsStyle.upcomingAppointments}>{
                            loading ?
                            <Spin/>
                            :
                            appointments.map(a=>fetchAppointmentDisplay(a))
                        }</div>
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
