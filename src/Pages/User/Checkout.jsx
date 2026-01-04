import React, { useState } from 'react'
import './Checkout.css';
import axios from 'axios'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
export default function Checkout() {

  
  const API_URL = "https://694d3b39ad0f8c8e6e201c01.mockapi.io/api/v1/events";
  const WEBHOOK_URL = "https://najwaha.app.n8n.cloud/webhook-test/order-confirmation";
  const cartItems = useSelector(state=>state.cart.items || [] );
  const total = cartItems.reduce((sum, item) => {
        return sum + (Number(item.price) || 0) * (item.quantity || 1);
    }, 0);
    
    console.log("Cart items:", cartItems);
    console.log("Total:", total);

  const [formData, setFormdata] = useState({
    name : "",
    email : "",
    phone : "",
  });

  const [errors, setErrors] = useState({});
  const [succes, setSucces] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState("");


  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const  handelChange = (e) =>{
    const {name,value} = e.target;
    setFormdata({...formData,[name]:value});
    setErrors({...errors,[name]: ""});
  }

    //  ENVOI MOCKAPI + N8N

  const SendOrder = async (orderData) => {
  try {
    setLoading(true);
    setConfirmation(""); // Clear any previous messages
    
    // 1. First send to MockAPI
    await axios.post(API_URL, orderData);

    // 2. Then send to n8n webhook
    console.log("Sending to n8n webhook:", orderData);
    const response = await axios.post(WEBHOOK_URL, orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000 // 10 second timeout
    });

    console.log("n8n response:", response.data);
    
    // Check for successful response (adjust based on n8n's actual response)
    if (response.status === 200) {
      setConfirmation("Commande validée 🎉 Vérifiez votre email");
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }

  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    setConfirmation(
      error.response?.data?.message || 
      "Erreur lors de la validation de la commande. Veuillez réessayer."
    );
  } finally {
    setLoading(false);
  }
};


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

    if(!formData.phone.trim()){
      newErrors.phone = "téléphone est obligatoire"
    }

    setErrors(newErrors);

    if(Object.keys(newErrors).length===0){

      const orderData = {
        customer: formData,
        items: cartItems,
        totalPrice: total,
        createdAt: new Date(),
      };

      SendOrder(orderData);
      // setSucces("Form submitted");
      
      setTimeout(() => {
        setConfirmation("");
        setFormdata({name : "",
          email : "",
          phone : "",})

      }, 2000);
      
    }

  }



  return (
    <div className='checkoutPage'>
      <h1>Checkout</h1>
      <button className='backBtn'><Link to='/Panier'>←-- Back to Cart</Link></button>

      <div className='checkoutContainer'>
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
              <label htmlFor="">Phone</label>
              <input type="tel"  name="phone" value={formData.phone} onChange={handelChange}/>
              {errors.phone && <p className="error">{errors.phone}</p>} 
            </div>  
            <button type='submit'>{loading ? "Processing..." : "Complete order"}</button>
            {confirmation && (<p className='succes'>{confirmation}</p>)}
          </form>
        </div>

      <div className='summaryDiv'>
        <h3>Order Summary</h3>
        <div className='itemCarts'>
          {cartItems.map(item=>(
            <div className='cartItem' key={item.id}> 
              <img src={item.image} alt={item.title} />
              <div className='itemDetails'>
                <h3>{item.title}</h3>
                <p>{item.date}</p>
                <p>{item.quantity}</p>
              </div>
              <div className='priceDive'>
              <h3>{item.price} dh</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-row">
          <span>Subtotal ({cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)} items)</span>
          <span>{total.toFixed(2)} dh</span>
        </div>


      </div>
      </div>
    </div>  
  )
}
