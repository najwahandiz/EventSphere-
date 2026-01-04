import React from 'react'
import { useState } from 'react';
import './Contact.css'

export default function Contact() {

  const [formData, setFormdata] = useState({
      name : "",
      email : "",
      message : "",
    });
  
    const [errors, setErrors] = useState({});
    const [succes, setSucces] = useState("");
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

   const  handelChange = (e) =>{
    const {name,value} = e.target;
    setFormdata({...formData,[name]:value});
    setErrors({
    ...errors,
    [name]: ""
  });
  }
  

  const handelSubmit =(e) =>{
    e.preventDefault();

    let newErrors ={};

    if(!formData.name.trim()){
      newErrors.name = "Ce champ est obligatoire"
    }

    if(!formData.email.trim()){
      newErrors.email = "Ce champ est obligatoire"
    }else if (!isValidEmail(formData.email)){
      newErrors.email = "l'email doit etre valide"
    }

    if(!formData.message.trim()){
      newErrors.message = "téléphone est obligatoire"
    }

    setErrors(newErrors);

    if(Object.keys(newErrors).length===0){
        setSucces("Form submitted");
      
      setTimeout(() => {
        setSucces("");
        setFormdata({name : "",
          email : "",
          message : "",})

      }, 2000);
      
    }

  }



  return (
    <div>
      <div className='header'>
        <h1>Get in Touch</h1>
        <p>Have questions about an event or need assistance? We're here to help. Send us a message and we'll get back to you soon.</p>
        
        <div className='formDiv'>
          <h3>Customer informations</h3>
          <form onSubmit={handelSubmit}>  
            <div className='fromGroup'>
              <label htmlFor="">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handelChange}/>
               {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className='fromGroup'>
              <label htmlFor="">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handelChange} />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>  
            <div className='fromGroup'>
              <label htmlFor="">Your Message</label>
              <textarea    name="message" value={formData.message} onChange={handelChange}/>
              {errors.message && <p className="error">{errors.message}</p>} 
            </div>  
            <button type='submit'>Complete order</button>
            {succes && (<p className='succes'>{succes}</p>)}
          </form>
        </div>
      </div>

    </div>
  )
}
