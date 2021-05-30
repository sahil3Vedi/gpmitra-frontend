// REACT
import { useState, useEffect } from 'react'
// ANT
import { Button, Modal, message, Spin, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// COMPONENTS
import Navbar from '../components/navbar'
import AddPatient from '../components/addPatient'
// AXIOS
import axios from 'axios'

const patientColumns = [
    {title: 'Name', dataIndex: 'name', key: 'name'},
    {title: 'Gender', dataIndex: 'gender', key: 'gender'},
    {title: 'Age', dataIndex: 'age', key: 'age'},
    {title: 'Occupation', dataIndex: 'occupation', key: 'occupation'},
    {title: 'Phone', dataIndex: 'phone', key: 'phone'},
    {title: 'Email', dataIndex: 'email', key: 'email'}
]

const Patients = () => {
    const [addingPatient, setAddingPatient] = useState(false)
    const [loading, setLoading] = useState(true)
    const [patients, setPatients] = useState([])

    const loadPatients = () => {
        setLoading(true)
        const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/patients/fetch`,config)
        .then(res=>{
            setPatients(res.data.message)
            setLoading(false)
        })
        .catch(e=>{
            message.error("Unable to Load Patients")
            setLoading(false)
        })
    }

    const addPatientModal = (
        <Modal destroyOnClose title="Add Patient" visible={addingPatient} onCancel={()=>setAddingPatient(false)} footer={null} maskClosable={false}>
            <AddPatient setModalVisible={setAddingPatient} reloadTable={loadPatients}/>
        </Modal>
    )

    useEffect(()=>{
        loadPatients()
    },[])

    console.log(patients)

    return (
        <div>
            <Navbar/>
            {addPatientModal}
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
