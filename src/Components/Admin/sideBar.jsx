import React from 'react';
import { LayoutGrid, ShoppingBag, LogOut } from 'lucide-react';
import './SideBar.css';
import { Link, useLocation } from 'react-router-dom';

export default function SideBar() {
  const location = useLocation();
  
  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      {/* Profil Section */}
      <div className="sidebar-profile">
        <div className="profile-avatar">E</div>
        <span className="profile-name">Admin</span>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <Link to="/ManageEvents" className={`nav-item ${isActive('/ManageEvents') ? 'active' : ''}`}>
          <LayoutGrid size={20} />
          <span>Events</span>
        </Link>

        <Link to="/Orders" className={`nav-item ${isActive('/Orders') ? 'active' : ''}`}>
          <ShoppingBag size={20} />
          <span>Orders</span>
        </Link>
      </nav>

      {/* Logout at Bottom */}
      <div className="sidebar-footer">
        <div className="nav-item logout">
          <Link className={`nav-item ${isActive('/Orders') ? 'active' : ''}`} to="/"> 
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}