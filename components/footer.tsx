import {useEffect, useState} from 'react'
import moment from 'moment'
import FooterStyles from '../css/footer.module.css'

const Footer = () => {

    const [clientTime, setClientTime] = useState(`${moment().format("DD MMM YY HH mm")}`)

    useEffect(()=>{
        setTimeout(() => {
            setClientTime(`${moment().format("DD MMM HH:mm")}`)
        }, 60)
    },[])

    return (
        <div className={FooterStyles.footer}>
            <div className={FooterStyles.companyText}>
                <p>&#169; Astral Digital Systems</p>
            </div>
            <div></div>
            <div>
                <p className={FooterStyles.localText}>Local Time</p>
                <p className={FooterStyles.timeText}>{`${clientTime}`}</p>
            </div>
        </div>
    )
}

export default Footer
