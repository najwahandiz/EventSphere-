import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import UpdatePopUp from '../../Components/Admin/UpdatePopUp'
import ManageEvents from './ManageEvents'
import Orders from './Orders'
import './Dashboard.css'
import {LogOut, LayoutGrid, ShoppingBag } from "lucide-react"


export default function Dashboard() {

  const [selectedPage,setSelectedpage]= useState("ManageEvents")
  const [openUpdatePopUp,setOpenUpdatePopUp]=useState(false);



  return (
    <div className='Dashboard'>

        <section className='sideBar'>
          <h1>Admin</h1>
          <div className='navLink'> 
            <button className='manageBtn' onClick={()=>{setSelectedpage("ManageEvents")}}><LayoutGrid size={20}/>Events</button>
            <button className='orderBtn' onClick={()=>{setSelectedpage("Orders")}}><ShoppingBag size={20}/>Orders</button>
          </div>
          <div className='logOutDiv'>
            <button className='logOutBtn'> <LogOut size={20}/>Logout</button>
          </div>
        </section>  


        <section className='content'>
          {selectedPage=="ManageEvents" ? <ManageEvents size={2000} /> : <Orders />}
        </section>
                  
                
           
    </div>
  )
}
