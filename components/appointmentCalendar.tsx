// REACT
import { useState, useEffect } from 'react'
// ANT
import { Badge, Calendar } from 'antd'
// MOMENT
import moment from 'moment'
const dateFormat = "DD-MMM-YYYY"
const timeFormat = "HH:mm"

const AppointmentCalendar = (props:any) => {

    const [appointmentsList, setAppointmentsList] = useState<any>({})

    const dateCellRender = (value: any) => {
        const finalDateValue = moment(value).format(dateFormat)
        if (appointmentsList[finalDateValue]){
            return appointmentsList[finalDateValue].map((a: any)=><Badge key={a.id} color="cyan" text={`${a.time} ${a.name}`} />)
        }
        else return null
    }

    const fetchPatientDetails = (patientID: any, apptID: any, apptTime: any) => {
        for (var p in props.patients){
            if (patientID === props.patients[p]._id){
                return {name: props.patients[p].name, phone: props.patients[p].phone, id: apptID, time: moment(apptTime).format(timeFormat)}
            }
        }
    }

    useEffect(()=>{
        // Set Appointments List
        let apptList:any = {}
        const appts = props.appointments
        for (var a in appts){
            const apptDate = moment(appts[a].date).format(dateFormat)
            const patientDetails = fetchPatientDetails(appts[a].patient, appts[a].id, appts[a].time)
            if (apptList[apptDate]){
                const tempAppts = apptList[apptDate]
                tempAppts.push(patientDetails)
                apptList[apptDate] = tempAppts
            } else {
                const tempAppts = []
                tempAppts.push(patientDetails)
                apptList[apptDate] = tempAppts
            }
        }
        setAppointmentsList(apptList)
    },[props.appointments])

    return (
        <Calendar dateCellRender={dateCellRender}/>
    )
}

export default AppointmentCalendar
