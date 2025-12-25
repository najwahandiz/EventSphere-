import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <div className='navbarSection'>
        <div className='logo'>
            <img src="/logo.png" alt="" />
        </div>

        <nav className='pagesNavigation'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/Events'>Events</Link></li>
                <li><Link to='/Contact'>Contact</Link></li>
            </ul>
        </nav>

        <nav className='iconesNavigation'>
            <ul>
                <li><Link to='/Checkout'>checkout</Link></li>
                <li><Link to='/AdminLogin'>Admin</Link></li>
            </ul>

        </nav>

    </div>
  )
}
