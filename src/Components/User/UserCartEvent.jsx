import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Store/Slices/cartSlice';
import { Calendar, MapPin, ShoppingCart } from "lucide-react"
import '../../Components/Admin/CartEvent.css'

export default function UserCartEvent({ event }) {
    if (!event) return null;
    const dispatch = useDispatch();
    
    return (
        <div className="eventCard">
            <div className="imageWrapper">
                <img src={event.image} alt={event.title} />
                <span className="categoryBadge">{event.category}</span>
            </div>

            <div className="cardContent">
                <h3 className="title">{event.title}</h3>
                <p className="description">{event.description}</p>

                <div className="meta">
                    <span>
                        <Calendar size={16} /> {event.date}
                    </span>
                    <span>
                        <MapPin size={16} /> {event.location}
                    </span>
                </div>

                <div className="cardFooter">
                    <span className="price">${event.price} <small>/ ticket</small></span>
                    <button 
                        className="addBtn" 
                        onClick={()=>{dispatch(addToCart(event))}}
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}
