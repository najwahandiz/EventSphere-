import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [succes, setSucces] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };


  const handelSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Required field";
    if (!formData.email.trim()) {
      newErrors.email = "Required field";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSucces("Message sent successfully");
      setTimeout(() => {
        setSucces("");
        setFormdata({ name: "", email: "", message: "" });
      }, 3000);
    }
  };

  return (
    <div className='contact-wrapper'>
      <div className='contact-container'>
        
        {/* LEFT SIDE: INFO */}
        <div className='contact-info'>
          <div className='badge'>Contact Us</div>
          <h1>Let's talk about your next event.</h1>
          <p className='subtitle'>Reach out to us through any of these channels. We typically respond within 24 hours.</p>
          
          <div className='info-list'>
            <div className='info-item'>
              <Mail size={18} className="icon" />
              <span>hello@eventsphere.com</span>
            </div>
            <div className='info-item'>
              <Phone size={18} className="icon" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className='info-item'>
              <MapPin size={18} className="icon" />
              <span>123 Event Street, LA, CA 90001</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className='contact-form-card'>
          <form onSubmit={handelSubmit}>
            <div className='input-row'>
              <div className='input-group'>
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="John Doe"
                  value={formData.name} 
                  onChange={handelChange} 
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className='input-group'>
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="john@example.com"
                  value={formData.email} 
                  onChange={handelChange} 
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>
            </div>

            <div className='input-group'>
              <label>Message</label>
              <textarea 
                name="message" 
                placeholder="How can we help you?"
                value={formData.message} 
                onChange={handelChange} 
              />
              {errors.message && <span className="error-msg">{errors.message}</span>}
            </div>

            <button type='submit' className='btn-submit'>
               Send Message <Send size={16} />
            </button>
            
            {succes && (
              <div className='success-banner'>
                <CheckCircle size={16} /> {succes}
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}