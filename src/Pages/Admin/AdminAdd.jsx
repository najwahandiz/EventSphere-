import React , {useEffect, useState} from 'react'
import axios from 'axios';
import './AdminAdd.css';
import { getEvents, addEvent as apiAddEvent } from '../../Api/request';

export default function AdminAdd() {

    const [Events,setEvents]=useState([]);

    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("Music");
    const [price,setPrice]=useState("");
    const [image,setImage]=useState("");
    const [date,setDate]=useState("");
    const [location,setLocation]=useState("");

    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    

    useEffect(() => {
      async function fetchEvents() {
        try {
          const data = await getEvents();
          setEvents(data);
        } catch (error) {
          // Already logged in API
        }
      }
      fetchEvents();
    }, []);


    const addEvent = async (newEvent) => {
        try {
            await apiAddEvent(newEvent);
            // Refresh events list
            const data = await getEvents();
            setEvents(data);
            // Clear form fields
            setName("");
            setDescription("");
            setCategory("Music");
            setPrice("");
            setImage("");
            setDate("");
            setLocation("");
            setImageFile(null);
            setSuccessMessage("Event has been added successfully!");
            // Hide message after 2 seconds
            setTimeout(() => setSuccessMessage(""), 2000);
        } catch (error) {
            // Already logged in API
        }
    };

    const HandelEvent= async (e)=>{
        e.preventDefault();

        const imageUrl = await uploadImageToCloudinary();
          if (!imageUrl) {
            alert("Image upload failed");
            return;
          }

        const newEvent = {
            title: name,
            description,
            category,
            price: parseInt(price),
            image: imageUrl,
            date,
            location,
            availableTickets: 100,
            featured: false,
            status: "active",
            createdAt: new Date().toISOString().split('T')[0]
        };
        addEvent(newEvent);

    }

   const uploadImageToCloudinary = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "events_upload");

    try {
      setUploading(true);

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dgqoop9qz/image/upload",
        formData
      );

      return res.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error", error);
      return null;
    } finally {
      setUploading(false);
    }
  };


   return (
    <div className="overlay">
      <div className="modal">
        <div className="header">
          <h2>Add New Event</h2>
          <span className="close-btn">×</span>
        </div>
        {successMessage && (
          <div className="success-message" style={{ color: 'green', marginBottom: '10px', textAlign: 'center' }}>
            {successMessage}
          </div>
        )}
        <form onSubmit={HandelEvent} className="form">
          <div className="form-group">
            <label className="label">Name</label>
            <input type="text"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Description</label>
            <input type="text"
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Category</label>
            <select value={category} onChange={(e)=> setCategory(e.target.value)}
              className="input"
              required
            >
              <option value="Art">Art</option>
              <option value="Sport">Sport</option>
              <option value="Conference">Conference</option>
              <option value="Music">Music</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Price</label>
            <input type="number"
              value={price} 
              onChange={(e)=> setPrice(e.target.value)}
              className="range-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Date</label>
            <input type="date" value={date}
              onChange={(e)=> setDate(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Location</label>
            <input type="text" value={location}
              onChange={(e)=> setLocation(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Event Image</label>
            <input type="file" placeholder='select an image'
              accept="image/*"
              onChange={(e)=> setImageFile(e.target.files[0])}
              className="input"
              required
            />
          </div>

          <button type='submit' className="button"  > Add Event</button>
        </form>
      </div>
    </div>
  )
}
