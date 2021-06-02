// REACT
import React, { useState, useEffect } from 'react'
React.useLayoutEffect = React.useEffect
// ANT
import { Button, Modal, message, Spin, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// COMPONENTS
import Navbar from '../components/navbar'
import AddPatient from '../components/addPatient'
import ViewPatient from '../components/viewPatient'
// AXIOS
import axios from 'axios'
// MOMENT
import moment from 'moment'

const Patients = () => {

    const [addingPatient, setAddingPatient] = useState(false)
    const [viewingPatient, setViewingPatient] = useState(false)
    const [loading, setLoading] = useState(true)
    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState<any>({})

    const loadPatients = () => {
        setLoading(true)
        const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/patients/fetch`,config)
        .then(res=>{
            setPatients(res.data.message)
            setLoading(false)
        })
        .catch(()=>{
            message.error("Unable to Load Patients")
            setLoading(false)
        })
    }

    const addPatientModal = (
        <Modal destroyOnClose title="Add Patient" visible={addingPatient} onCancel={()=>setAddingPatient(false)} footer={null} maskClosable={false}>
            <AddPatient setModalVisible={setAddingPatient} reloadTable={loadPatients}/>
        </Modal>
    )

    const viewPatientModal = (
        <Modal destroyOnClose title="View Patient Details" visible={viewingPatient} onCancel={()=>setViewingPatient(false)} footer={null} maskClosable={false}>
            <ViewPatient setModalVisible={setViewingPatient} reloadTable={loadPatients} data={patient}/>
        </Modal>
    )

    const viewPatientDetails = (patientID: any) => {
        var patientFound: any = patients.find((p: any) => {return p._id === patientID})
        setPatient(patientFound)
        setViewingPatient(true)
    }

    const patientColumns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Gender', dataIndex: 'gender', key: 'gender', render: (text: string)=><p>{text[0].toUpperCase()}</p>},
        {title: 'Age', dataIndex: 'age', key: 'age', render: (text: number,record: any)=><p>{record["dob"] ? moment().diff(record["dob"], 'years', true).toFixed(1) : text.toFixed(1)}</p>},
        {title: 'Occupation', dataIndex: 'occupation', key: 'occupation'},
        {title: 'Phone', dataIndex: 'phone', key: 'phone'},
        {title: 'Email', dataIndex: 'email', key: 'email'},
        {title:'', dataIndex: '_id', key:'_id', render: (text: any)=><Button type="primary" icon={<PlusOutlined/>} onClick={()=>viewPatientDetails(text)}></Button>}
    ]

    useEffect(()=>{
        loadPatients()
    },[])

    return (
        <div>
            <Navbar/>
            {addPatientModal}
            {viewPatientModal}
            <div className="pageWrapper">
                <h1>Patients</h1>
                <Button type="primary" icon={<PlusOutlined/>} onClick={()=>setAddingPatient(true)}>Add Patient</Button>
                <div className="tableContainer">
                    {
                        loading ?
                        <Spin/>
                        :
                        <Table rowKey="_id" dataSource={patients} columns={patientColumns}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Patients
