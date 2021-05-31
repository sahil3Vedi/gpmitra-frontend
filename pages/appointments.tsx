// REACT
import React, { useState, useEffect } from 'react'
React.useLayoutEffect = React.useEffect
// ANT
import { Button, Calendar, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// COMPONENTS
import Navbar from '../components/navbar'
import AddAppointment from '../components/addAppointment'

const Appointments = () => {
    const [addingAppointment, setAddingAppointment] = useState(false)

    const addAppointmentModal = (
        <Modal title="Add Appointment" visible={addingAppointment} footer={null} maskClosable={false} onCancel={()=>setAddingAppointment(false)}>
            <AddAppointment/>
        </Modal>
    )

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
