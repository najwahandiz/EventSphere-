import React, { useState } from 'react'
import { Form } from 'react-router-dom'

export default function AddPopUp() {

    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("Music");
    const [price,setPrice]=useState("");
    const [url,setUrl]=useState("");
    const [date,setDate]=useState("");
    const [location,setLocation]=useState("");

    const HandelTask=(e)=>{
        e.preventDefault();

    }


  return (
    <div className='popUpOverley'>

        <div className='popUpContainer'>
            <div className='popUpHeader'>
                <h2>Add New Event</h2>
                <span className='closeBtn'>x</span>
            </div>

            <form action="">
                <label htmlFor="">Name</label>
                <input type="text"  />

                <label htmlFor="">Description</label>
                <input type="text" />

                <label htmlFor="">Category</label>
                <select name="" id="">
                    <option value="">Art</option>
                    <option value="">Sport</option>
                    <option value="">Conference</option>
                    <option value="">Music</option>
                </select>

                <label htmlFor="">Price</label>
                <input type="range" id="price" min="1" max="3000"/>

                <label htmlFor="">Image URL</label> 
                <input type="url" placeholder='https://...' />

                <label htmlFor="">Date</label>
                <input type="date" /> 

                <label htmlFor="">Location</label>
                <input type="text" />  


            </form>

        </div>
        
    </div>
  )
}
