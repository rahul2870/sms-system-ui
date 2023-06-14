import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import LogoPNG from '../assests/logo.PNG';

export default function Navbar({ children }) {

    const location = useLocation(); 

    return <div>
        <div className='navbar'>
            <nav>
                <img alt='logo' src={LogoPNG} />
                <span> Mera Gaon</span>
            </nav>

            <div>
                <Link style={{
                    ...(location.pathname !== "/history" ? {
                        backgroundColor: "rgb(82,82,82)",
                        color: "#fff"
                    } : {})
                }} to="/">Contact List</Link>
                <Link style={{
                    ...(location.pathname === "/history" ? {
                        backgroundColor: "rgb(82,82,82)",
                        color: "#fff"
                    } : {})
                }} to='/history'>Sent SMS's</Link>
            </div>
        </div>
        <div>{children}</div>
    </div>
}
