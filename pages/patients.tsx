// REACT
import {useState} from 'react'
// ANT
import { Button, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// COMPONENTS
import Navbar from '../components/navbar'
import AddPatient from '../components/addPatient'

const Patients = () => {
    const [addingPatient, setAddingPatient] = useState(false)

    const addPatientModal = (
        <Modal destroyOnClose title="Add Patient" visible={addingPatient} onCancel={()=>setAddingPatient(false)} footer={null} maskClosable={false}>
            <AddPatient setModalVisible={setAddingPatient}/>
        </Modal>
    )

    return (
        <div>
            <Navbar/>
            {addPatientModal}
            <div className="pageWrapper">
                <h1>Patients</h1>
                <Button type="primary" icon={<PlusOutlined/>} onClick={()=>setAddingPatient(true)}>Add Patient</Button>
            </div>
        </div>
    )
}

export default Patients
