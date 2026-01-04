import React from 'react'
import { Link } from 'react-router-dom'
import { BsCart } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import './Navbar.css'

export default function Navbar() {

    const cartItems = useSelector(state => state.cart.items || []);
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className='navbarSection'>
        <div className='logo'>
            <img src="/looogo.png" alt="" />
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
                
                <li style={{ position: 'relative' }}>
                    <Link to='/Panier'>
                        <BsCart size={20}/> 
                        {totalItems > 0 && (
                            <span className="cart-count" style={{
                                    position: 'absolute',
                                    top: -8,
                                    right: -8,
                                    background: '#9966cc',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '2px 6px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                        }}>{totalItems}</span>
                        )}
                    </Link>
                </li>
                <li><Link to='/AdminLogin'>Admin</Link></li>
            </ul>

        </nav>

    </div>
  )
}
