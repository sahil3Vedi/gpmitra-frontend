// REACT
import React, { useState, useEffect } from 'react'
React.useLayoutEffect = React.useEffect
// ANT
import { Button, Modal, message, Spin, Space, Tooltip } from 'antd'
import { PlusOutlined, CheckOutlined, CloseOutlined, UserOutlined, ExclamationCircleFilled, PhoneFilled } from '@ant-design/icons'
// CSS
import AppointmentsStyle from '../css/appointments.module.css'
// COMPONENTS
import Navbar from '../components/navbar'
import AddAppointment from '../components/addAppointment'
import AppointmentCalendar from '../components/appointmentCalendar'
import Footer from '../components/footer'
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
    const [cancellingAppointment, setCancellingAppointment] = useState(false)
    const [cancellingModal, setCancellingModal] = useState(false)
    const [cancellationID, setCancellationID] = useState("")

    const fetchPatientDetails = (patientID: any) => {
        for (var p in patients){
            if (patientID === patients[p]._id){
                return (
                    <div>
                        <p className={AppointmentsStyle.upcomingPatientDetails}>{`${patients[p].name}`}</p>
                        <p className={AppointmentsStyle.patientDetails}><UserOutlined style={{color:"#36cfc9"}}/> {` ${patients[p].gender[0].toUpperCase()} ${Math.floor(patients[p].age)}`}</p>
                        <p className={AppointmentsStyle.upcomingPatientPhone}><PhoneFilled style={{color:"#36cfc9"}}/> {`${patients[p].phone}`}</p>
                    </div>
                )
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

    const cancelAppointmentModal = (
        <Modal title="Cancel Appointment" visible={cancellingModal} onCancel={()=>setCancellingModal(false)} onOk={()=>cancelAppointment(cancellationID)} maskClosable={false} okButtonProps={{loading: cancellingAppointment}}>
            <p>Are you sure you want to cancel this appointment?</p>
        </Modal>
    )

    const initiateCancellation = (apptId: any) => {
        setCancellationID(apptId)
        setCancellingModal(true)
    }

    const fetchAppointmentDisplay = (appt: any) => {
        return (
            <div key={appt._id} className={AppointmentsStyle.upcomingAppointment}>
                <div>
                    <p className={AppointmentsStyle.appointmentDate} style={{fontSize:20, textAlign:"center"}}>{`${moment(appt.date).format(dateFormat).split('-')[0]}`}</p>
                    <p style={{fontSize:15, textAlign:"center", color:"#13c2c2"}}>{moment(appt.date).format(dateFormat).split('-')[1]}</p>
                    <p className={AppointmentsStyle.appointmentTime}>{`${moment(appt.time).format(timeFormat)}`}</p>
                </div>
                <div>
                    {fetchPatientDetails(appt.patient)}
                </div>
                <div className={AppointmentsStyle.appointmentActions}>
                    <Space className={AppointmentsStyle.largeAppointment}>
                        <Tooltip title="Start Session" placement="bottom"><Button icon={<CheckOutlined />} type="primary"></Button></Tooltip>
                        <Tooltip title="Cancel Appointment" placement="bottom"><Button icon={<CloseOutlined />} danger type="primary" onClick={()=>initiateCancellation(appt._id)}></Button></Tooltip>
                        {(moment() > moment(`${appt.date.split("T")[0]}T${appt.time.split("T")[1]}`)) ? <Tooltip title={`Appointment expires on ${moment(appt.date).add(2,'d').format("DD MMM")}`} placement="right"><ExclamationCircleFilled className={AppointmentsStyle.exclamation}/></Tooltip> : null}
                    </Space>
                    <Space className={AppointmentsStyle.smallAppointment}>
                        <Tooltip title="Start Session" placement="bottom"><Button style={{marginBottom:"25px"}} icon={<CheckOutlined />} type="primary"></Button></Tooltip>
                        <Tooltip title="Cancel Appointment" placement="bottom"><Button icon={<CloseOutlined />} danger type="primary" onClick={()=>initiateCancellation(appt._id)}></Button></Tooltip>
                        {(moment() > moment(`${appt.date.split("T")[0]}T${appt.time.split("T")[1]}`)) ? <Tooltip title={`Appointment expires on ${moment(appt.date).add(2,'d').format("DD MMM")}`} placement="right"><ExclamationCircleFilled className={AppointmentsStyle.exclamation}/></Tooltip> : null}
                    </Space>
                </div>
            </div>
        )
    }

    const cancelAppointment = (apptId: any) => {
        setCancellingAppointment(true)
        const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/appointments/cancel/${apptId}`,config)
        .then(()=>{
            message.success("Appointment Cancelled")
            loadPatientsAndAppointments()
            setCancellingAppointment(false)
            setCancellingModal(false)
            setCancellationID("")
        })
        .catch(()=>{
            message.error("Cancellation Failed")
            setCancellingAppointment(false)
        })
    }

    useEffect(()=>{
        loadPatientsAndAppointments()
    },[])

    return (
        <div className="layout">
            <Navbar/>
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
            <Footer/>
            {addAppointmentModal}
            {cancelAppointmentModal}
        </div>
    )
}

export default Appointments
