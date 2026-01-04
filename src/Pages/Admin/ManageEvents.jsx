import React ,{useEffect, useState} from 'react'
import CartEvent from '../../Components/Admin/CartEvent'
import UpdatePopUp from '../../Components/PopUp/UpdatePopUp'
import DeletePopUp from '../../Components/PopUp/DeletePopUp';
import {getEvents as apiAddEvent, getEvents} from '../../Api/request';
import { Link } from 'react-router-dom';
import './ManageEvents.css'


export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [loading, setLoading] = useState(false);

  const [showDelete, setShowDelete]=useState(false);
  const [deletedEvent, setDeletedEvent]=useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const getCategories = () => {
    const allCategories = events.map(event => event.category);
    return ['All', ...new Set(allCategories)].filter(Boolean);
  };

   const getFilteredEvents = () => {
    if (selectedCategory === 'All') return events;
    return events.filter(event => event.category === selectedCategory);
  };


  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
      } catch (error) {}
      finally {
        setLoading(false);
      }
    }
    fetchEvents();
    
  }, []);

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowUpdate(true);
  };

  const handleClose = (updated) => {
    setShowUpdate(false);
    setSelectedEvent(null);
    if (updated) {
      // Refresh events after update
      getEvents().then(setEvents);
    }
  };

  const handelDelete = (event) => {
    setDeletedEvent(event);
    setShowDelete(true);
  }

  const closeDeletePopup = (deleted) => {
    setShowDelete(false);
    setDeletedEvent(null);
    if(deleted){
      getEvents().then(setEvents);
    }
  }

  const categories = getCategories();
  const filteredEvents = getFilteredEvents();


  return (
    <div>
      <div className='AdminEvents'>
        <div className='header'>
          <h1>Manage Events</h1>
          <button><Link to="/AdminAdd">+ Add new event</Link></button>
        </div>
        <hr className='hrHeader' />
      </div>

      {loading ? (
        <div className="loading-message">Rechargement en cours...</div>
      ) : (
        <>
        <div className='catalogueBtnDiv'>
          {categories.map((cat,index)=>(
            <button className='catBtn' key={index} onClick={()=>{setSelectedCategory(cat)}}>{cat}</button>
          ) )}
        </div>

        <div className='eventsList'>
            {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <CartEvent key={event.id} event={event} onEdit={handleEdit} onDelete={handelDelete} />
            ))
            ) : (
              <p>No events found in this category.</p>
            )
            }
        </div>
          </>
      )}
        
      {showUpdate && selectedEvent && (
        <UpdatePopUp event={selectedEvent} onClose={handleClose}  />
      )}

      {showDelete && deletedEvent && (
        <DeletePopUp deletedEvent={deletedEvent} closeDeletePopup={closeDeletePopup} />
      )}
    </div>

    

  );
}

