// COMPONENTS
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const Dashboard = () => {
    return (
        <div className="layout">
            <Navbar/>
            <div className="pageWrapper">
                <h1>Dashboard 👋</h1>
            </div>
            <Footer/>
        </div>
    )
}

export default Dashboard
