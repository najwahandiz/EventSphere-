import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItem } from "../../Store/Slices/cartSlice";
import { ShoppingBag , Trash2} from 'lucide-react';
import './Panier.css'

export default function Panier() {
    const cartItems = useSelector(state => state.cart.items || []);
    const dispatch = useDispatch();

    const total = cartItems.reduce((sum, item) => {
        return sum + (Number(item.price) || 0) * (item.quantity || 1);
    }, 0);

    if (cartItems.length == 0) {
        return (
            <div className="empty-cart">
                <ShoppingBag size={48} />
                <h2>Your cart is empty</h2>
                <p>Add some events to get started!</p>
                <button ><Link to='/events'>Browse Events</Link></button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="header">
                <h1>Shopping Cart</h1>
            </div>

            <div className='content'>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div className="cart-item" key={item.id}>
                        <img src={item.image} alt={item.title} className="item-image" />
                        <div className="item-details">
                            <h3>{item.title}</h3>
                            <p className="item-description">{item.date}<strong> . </strong>{item.location}</p>
                            <h4 className='item-category'>{item.category}</h4>
                            <div className="quantity-controls">
                                <button 
                                    onClick={() => dispatch(decreaseQuantity(item.id))}
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>
                                <span className="quantity">{item.quantity}</span>
                                <button 
                                    onClick={() => dispatch(increaseQuantity(item.id))}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                            
                        </div>
                        <p className="item-price">${Number(item.price).toFixed(2)}</p>
                        <button 
                                className="remove-btn"
                                onClick={() => dispatch(removeItem(item.id))}
                            >
                                <Trash2 size={20}/>
                            </button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)} items)</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <button className="checkout-btn" ><Link to='/Checkout'>Proceed to Checkout</Link></button>
            </div>
           </div> 
        </div>
    );
}