import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/User/Home'
import Events from './Pages/User/Events'
import Checkout from './Pages/User/Checkout'
import Contact from './Pages/User/Contact'
import Panier from './Pages/User/Panier'

import Userlayout from './Layout/UserLayout'
import AdminRoutes from './Layout/AdminRoutes'

import AdminLogin from './Pages/Admin/AdminLogin'
import AdminAdd from './Pages/Admin/AdminAdd'

import Orders from './Pages/Admin/Orders'
import ManageEvents from './Pages/Admin/ManageEvents'
import CartEvent from './Components/Admin/CartEvent'





function App() {

  return (
    <div>
      <BrowserRouter>

        <Routes>
          {/* USER ROUTES */}
          <Route element={<Userlayout />}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/Events' element={<Events/>}></Route>
            <Route path='/Contact' element={<Contact/>}></Route>
            <Route path='/Panier' element={<Panier/>}></Route>
            <Route path='/Checkout' element={<Checkout/>}></Route>
          </Route>

          {/* Admin ROUTES */}
          <Route element={<AdminRoutes />}>
            <Route path='/AdminAdd' element={<AdminAdd/>}></Route>
            <Route path='/Orders' element={<Orders/>}></Route>
            <Route path='/ManageEvents' element={<ManageEvents/>}></Route>
            <Route path='/CartEvent' element={<CartEvent/>}></Route>
          </Route>
          <Route path='/AdminLogin' element={<AdminLogin/>}></Route>

          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
