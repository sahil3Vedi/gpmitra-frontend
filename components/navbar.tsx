// NEXT
import { useRouter } from 'next/router'
import Link from 'next/link'
// ANT
import { Menu } from 'antd'
// CSS
import navbarStyles from '../css/navbar.module.css'
// IMAGES
const logoImage = require('../assets/gpmitralogowhitetransp.png')

const Navbar = () => {

    const router = useRouter()
    const currentPage = router.pathname

    return (
        <div className={navbarStyles.topNavbar}>
            <Menu selectedKeys={[currentPage]} mode="horizontal" className={navbarStyles.navbarTop}>
                <Menu.Item key="/dashboard"><Link href="/dashboard">Dashboard</Link></Menu.Item>
                <Menu.Item key="/patients"><Link href="/patients">Patients</Link></Menu.Item>
                <Menu.Item key="/appointments"><Link href="/appointments">Appointments</Link></Menu.Item>
                <Menu.Item key="/sessions"><Link href="/sessions">Sessions</Link></Menu.Item>
                <Menu.Item key="/inventory"><Link href="/inventory">Inventory</Link></Menu.Item>
                <Menu.Item key="/billing"><Link href="/billing">Billing</Link></Menu.Item>
                <Menu.Item key="/referrals"><Link href="/referrals">Referrals</Link></Menu.Item>
                <Menu.Item key="/settings"><Link href="/referrals">Settings</Link></Menu.Item>
            </Menu>
            <div>
                <img className={navbarStyles.navbarLogo} src={logoImage} alt="gp-mitra-logo"/>
            </div>
        </div>
    )
}

export default Navbar
