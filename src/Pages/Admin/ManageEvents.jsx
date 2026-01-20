import React, { useEffect, useState } from 'react'
import CartEvent from '../../Components/Admin/CartEvent'
import UpdatePopUp from '../../Components/PopUp/UpdatePopUp'
import DeletePopUp from '../../Components/PopUp/DeletePopUp';
import { getEvents } from '../../Api/request';
import { Link } from 'react-router-dom';
import './ManageEvents.css'

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deletedEvent, setDeletedEvent] = useState(null);
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
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
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
    if (deleted) {
      getEvents().then(setEvents);
    }
  }

  const categories = getCategories();
  const filteredEvents = getFilteredEvents();

  return (
    <div className="manage-events-container">
      {/* Header Section */}
      <div className="manage-events-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="page-title">Manage Events</h1>
            <p className="page-subtitle">Create, edit, and organize your events</p>
          </div>
          <button className="add-event-btn">
            <Link to="/AdminAdd">
              <span className="btn-icon">+</span>
              Add New Event
            </Link>
          </button>
        </div>
        <div className="divider"></div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading events...</p>
        </div>
      ) : (
        <>
          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-header">
              <h3 className="filter-title">Filter by Category</h3>
              <span className="event-count">{filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="category-filters">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                  {selectedCategory === cat && <span className="active-indicator"></span>}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="events-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <CartEvent 
                  key={event.id} 
                  event={event} 
                  onEdit={handleEdit} 
                  onDelete={handelDelete} 
                />
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <h3 className="empty-title">No events found</h3>
                <p className="empty-description">
                  {selectedCategory === 'All' 
                    ? "You haven't created any events yet." 
                    : `No events found in the ${selectedCategory} category.`}
                </p>
                <button className="empty-action-btn">
                  <Link to="/AdminAdd">Create your first event</Link>
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modals */}
      {showUpdate && selectedEvent && (
        <UpdatePopUp event={selectedEvent} onClose={handleClose} />
      )}

      {showDelete && deletedEvent && (
        <DeletePopUp deletedEvent={deletedEvent} closeDeletePopup={closeDeletePopup} />
      )}
    </div>
  );
}