import react from 'react'
import SmoothScroll from '../components/SmoothScroll'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import './css/general.css'

export default function Layout() {
    return (
        <SmoothScroll>
            <Navigation />
            <Outlet />
            <Footer />
        </SmoothScroll>
    )
}