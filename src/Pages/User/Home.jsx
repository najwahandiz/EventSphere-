import React from 'react'
import './Home.css'

export default function Home() {
  return (
    <div className='homeSection'>
      <div className='heroSection'>
        <h1>Discover & Book Amazing Events</h1>
        <h3>Concerts, Art Exhibitions, Sports & More</h3>
        <div className="heroButtons">
          <button className="primaryBtn">Explore Events</button>
          <button className="secondaryBtn">Contact Us</button>
        </div>
      </div>
</div>
  )
}
