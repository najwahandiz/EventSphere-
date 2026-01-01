import React, { useState } from 'react'
import {getEvents as apiAddEvent} from '../../Api/request';
import { Calendar, MapPin, ShoppingCart, Pencil, Trash2 } from "lucide-react";
import './CartEvent.css'

export default function CartEvent({event, onEdit, onDelete}) {

    if (!event) return null;
    
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

          <div className='btnDiv'>
            <button className="addBtn" onClick={() => onEdit(event)}><Pencil size={16} /> </button>
            <button className="addBtn" onClick={() => onDelete(event)}><Trash2 size={16} /> </button>
          </div>
          
        </div>
      </div>

</div>
  )
}
