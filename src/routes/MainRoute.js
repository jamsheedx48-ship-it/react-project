import React from 'react'
import Register from '../pages/Register'
import Login from '../pages/Login'
import {Routes,Route} from "react-router-dom"
import Home from '../pages/Home'
import Products from '../pages/Products'
import Details from '../pages/Details'
import Cart from '../pages/Cart'
import About from '../pages/About'
import Payment from '../pages/Payment'
import PaymentSuccesful from '../pages/PaymentSuccesful'
import Orders from '../pages/Orders'


const MainRoute = () => {
  return (
    <div>
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/products' element={<Products/>}/>
         <Route path='/details/:id' element={<Details/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/success/:orderid' element={<PaymentSuccesful/>}/>
        <Route path='/payment/:orderid' element={<Payment/>}/>
        <Route path='/orders' element={<Orders/>}/>
       </Routes>
    </div>
  )
}

export default MainRoute