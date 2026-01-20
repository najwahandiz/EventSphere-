import React from 'react'
import { Outlet } from "react-router-dom";
import SideBar from '../Components/Admin/sideBar';
import './AdminRoutes.css'


export default function AdminRoutes() {
  return (
    <div className="app-container">
        <SideBar/>
        <main className="main-content">
            <Outlet/>
        </main>
    </div>
  )
}
