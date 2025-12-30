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

  const [showDelete, setShowDelete]=useState(false);
  const [deletedEvent, setDeletedEvent]=useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {}
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



  return (
    <div>
      <div className='AdminEvents'>
        <div className='header'>
          <h1>Manage Events</h1>
          <button><Link to="/AdminAdd">+ Add new event</Link></button>
        </div>
        <hr className='hrHeader' />
      </div>

      <div className='eventsList'>
        {events.map(event => (
          <CartEvent key={event.id} event={event} onEdit={handleEdit} onDelete={handelDelete} />
        ))}
      </div>

      {showUpdate && selectedEvent && (
        <UpdatePopUp event={selectedEvent} onClose={handleClose}  />
      )}

      {showDelete && deletedEvent && (
        <DeletePopUp deletedEvent={deletedEvent} closeDeletePopup={closeDeletePopup} />
      )}
    </div>
  );
}

