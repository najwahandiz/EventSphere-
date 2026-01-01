import React, { useEffect, useState } from 'react'
import {getEvents} from '../../Api/request';
import UserCartEvent from '../../Components/User/UserCartEvent';
import './Events.css'

export default function Events() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');


  useEffect (()=>{
      const fethcEvents = async () => {
        try {
          const data = await getEvents();
          setEvents(data)
        } catch (err) {
          setError('Failed to load events. Please try again later.');
          console.error('Error fetching events:', err); 
        }finally{
          setLoading(false)
        }
      };
    fethcEvents();
  },[]);


  const categories = ['All',... new Set(events.map(event=>event.category))]

  const filteredEvents = events.filter(evnt=>{
    const matchesCategory = categoryFilter === 'All' || evnt.category === categoryFilter;

    const matchSearsh = evnt.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        evnt.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchSearsh;    
  })


  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">{error}</div>;


  return (
    <div className="events-page">
      <div className='events-header'>
        <h1>All Events</h1>
        <p>Discover amazing music events near you. Filter by category to find your perfect experience.</p>
      
      <div className='filters'>
        <div className="search-box">
          <input type="text" 
            placeholder='Search event'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </div>
      

        <div className="category-filter" >
          <select value={categoryFilter} onChange={(e)=>setCategoryFilter(e.target.value)}>
            {categories.map((cat)=>(
              <option key={cat} value={cat} >{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

      </div>
     </div>   
      
      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <UserCartEvent
              key={event.id}
              event={event}
            />
          ))
        ) : (
          <div className="no-events">
            <p>No events found matching your criteria.</p>
          </div>
        )}
      </div>


    </div>
  )
}
