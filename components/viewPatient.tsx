// MOMENT
import moment from 'moment'

const ViewPatient = (props: any) => {
    return (
        <div>
            <p className="sectionHeader">Basic Information</p>
            <div className="displayDetails3">
                <div><p className="attributeKey">Name</p><p className="attributeValue">{props.data.name}</p></div>
                <div><p className="attributeKey">Gender</p><p className="attributeValue">{props.data.gender[0].toUpperCase()}</p></div>
                <div><p className="attributeKey">Age</p><p className="attributeValue">{props.data.dob ? moment().diff(props.data.dob, 'years', true).toFixed(1) :props.data.age.toFixed(1)}</p></div>
                <div><p className="attributeKey">Occupation</p><p className="attributeValue">{props.data.occupation}</p></div>
                <div><p className="attributeKey">Phone No.</p><p className="attributeValue">{props.data.phone}</p></div>
                <div><p className="attributeKey">Email ID</p><p className="attributeValue">{props.data.email}</p></div>
                <div><p className="attributeKey">Address</p><p className="attributeValue">{props.data.address}</p></div>
            </div>
            <p className="sectionHeader">Family History</p>
            <p className="sectionHeader">Medical History</p>
            <p className="sectionHeader">Sessions</p>
            <p className="sectionHeader">Reports</p>
            <p className="sectionHeader">Prescriptions</p>
        </div>
    )
}

export default ViewPatient
