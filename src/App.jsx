import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/User/Home'
import Events from './Pages/User/Events'
import Checkout from './Pages/User/Checkout'
import Navbar from './Layout/Navbar'
import Footer from './Layout/Footer'
import Contact from './Pages/User/Contact'

import AdminLogin from './Pages/Admin/AdminLogin'
import AdminAdd from './Pages/Admin/AdminAdd'
import Dashboard from './Pages/Admin/Dashboard'
import Orders from './Pages/Admin/Orders'
import ManageEvents from './Pages/Admin/ManageEvents'
import CartEvent from './Components/Admin/CartEvent'
import Panier from './Pages/User/Panier'



function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Footer/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Events' element={<Events/>}></Route>
          <Route path='/Chekout' element={<Checkout/>}></Route>
          <Route path='/Contact' element={<Contact/>}></Route>
          <Route path='/AdminLogin' element={<AdminLogin/>}></Route>
          <Route path='/AdminAdd' element={<AdminAdd/>}></Route>
          <Route path='/Dashboard' element={<Dashboard/>}></Route>
          <Route path='/Orders' element={<Orders/>}></Route>
          <Route path='/ManageEvents' element={<ManageEvents/>}></Route>
          <Route path='/CartEvent' element={<CartEvent/>}></Route>
          <Route path='/Panier' element={<Panier/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
