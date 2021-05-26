// NEXT
import { useRouter } from 'next/router'
import Link from 'next/link'
// ANT
import { Menu } from 'antd'
import { AppstoreOutlined, UserOutlined, CarryOutOutlined, LogoutOutlined } from '@ant-design/icons'
// CSS
import navbarStyles from '../css/navbar.module.css'
// ACTIONS
import * as authActions from '../actions/auth.ts'

const Navbar = () => {

    const router = useRouter()
    const currentPage = router.pathname

    const navTo = (pageRoute: string) => {
        router.push(pageRoute)
    }

    return (
        <Menu selectedKeys={[currentPage]} mode="horizontal" className={navbarStyles.navbarTop}>
            <Menu.Item key="/dashboard" icon={<AppstoreOutlined />}><Link href="/dashboard">Dashboard</Link></Menu.Item>
            <Menu.Item key="/users" icon={<UserOutlined />}><Link href="/users">Patients</Link></Menu.Item>
            <Menu.Item key="/revenue" icon={<CarryOutOutlined />}><Link href="/revenue">Appointments</Link></Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={()=>authActions.logout(navTo)}>Logout</Menu.Item>
      </Menu>
    )
}

export default Navbar
