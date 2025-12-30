import React, { useState } from 'react';
import './UpdatePopUp.css';
import { updateEvent } from '../../Api/request';
import axios from 'axios';

export default function UpdatePopUp({ event, onClose }) {

    const [form, setForm] = useState({
        id: event.id,
        title: event.title || '',
        description: event.description || '',
        category: event.category || '',
        price: event.price || '',
        image: event.image || '',
        date: event.date || '',
        location: event.location || ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imageFile, setImageFile] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        let imgUrl = form.image;
        if (imageFile) {
            imgUrl = await uploadImageToCloudinary();
            if (!imgUrl) {
                setError("Image upload failed");
                setLoading(false);
                return;
            }
        }
        try {
            await updateEvent({ ...form, image: imgUrl });
            setLoading(false);
            onClose(true); // true = updated
        } catch (err) {
            setError('Failed to update event');
            setLoading(false);
        }
    };
    

    const uploadImageToCloudinary = async () => {
        if (!imageFile) return null;
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "events_upload");
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dgqoop9qz/image/upload", formData);
            return res.data.secure_url;
        } catch (error) {
            console.error("Cloudinary upload error", error);
            return null;
        }
    };


    return (
        <div className='popUpOverley'>
            <div className='popUpContainer'>
                <div className='popUpHeader'>
                    <h2>Update Event</h2>
                    <span className='closeBtn' onClick={() => onClose(false)}>x</span>
                </div>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='form-group'>
                    <label>Title</label>
                    <input type='text' name='title' value={form.title} onChange={handleChange}  />
                    </div>

                    <div className='form-group'>
                    <label>Description</label>
                    <input type='text' name='description' value={form.description} onChange={handleChange}  />
                    </div>

                    <div className='form-group'>
                    <label>Category</label>
                    <select name='category' value={form.category} onChange={handleChange} >
                        <option value=''>Select category</option>
                        <option value='Art'>Art</option>
                        <option value='Sport'>Sport</option>
                        <option value='Conference'>Conference</option>
                        <option value='Music'>Music</option>
                    </select>
                    </div>

                    <div className='form-group'>
                    <label>Price</label>
                    <input type='number' name='price' min='1' max='3000' value={form.price} onChange={handleChange}  />
                    </div>    

                    <div className='form-group'>
                    <label>Location</label>
                    <input type='text' name='location' value={form.location} onChange={handleChange}  />
                    </div>        

                    <div className='form-group'>
                    <label>Date</label>
                    <input type='date' name='date' value={form.date} onChange={handleChange}  />
                    </div>


                    <div className='form-group'>
                    <label>Image</label>
                    <input type='file' name='image' accept='image/*' onChange={handleFileChange} />
                    </div>
                
                    

                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <div className='form-group'>
                    <button type='submit' disabled={loading}>{loading ? 'Updating...' : 'Update Event'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
