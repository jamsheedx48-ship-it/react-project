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
import AdminDashboard from '../admin/AdminDashboard'
import AdminProducts from '../admin/AdminProducts'
import AdminUsers from '../admin/AdminUsers'
import AdminOrders from '../admin/AdminOrders'
import Admin from '../admin/Admin'
import AdminLogin from '../admin/AdminLogin'
import AdminUsersDetails from '../admin/AdminUsersDetails'
import AdminAddproducts from '../admin/AdminAddproducts'
import EditProduct from '../admin/EditProduct'
import ProtectedAdminRoute from '../admin/ProtectedAdminRoute'

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
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/adminpanel' element={
          <ProtectedAdminRoute>
            <Admin/>
          </ProtectedAdminRoute>
        }/>
        <Route path='/admin/dashboard' element={
          <ProtectedAdminRoute>
            <AdminDashboard/>
          </ProtectedAdminRoute>
        }/>
        <Route path='/admin/products' element={
          <ProtectedAdminRoute>
            <AdminProducts/>
          </ProtectedAdminRoute>
        }/>
        <Route path='/admin/orders' element={
          <ProtectedAdminRoute>
            <AdminOrders/>
          </ProtectedAdminRoute>
        }/>
        <Route path='/admin/users' element={
          <ProtectedAdminRoute>
            <AdminUsers/>
          </ProtectedAdminRoute>
        }/>
        <Route path='/admin/userdetails/:userid' element={
          <ProtectedAdminRoute>
            <AdminUsersDetails/>
          </ProtectedAdminRoute>
        }/>
        <Route path='/admin/addproduct' element={
          <ProtectedAdminRoute>
            <AdminAddproducts/>
          </ProtectedAdminRoute>
        }/>
        <Route path='/admin/editproduct/:id' element={
          <ProtectedAdminRoute>
            <EditProduct/>
          </ProtectedAdminRoute>
        }/>
       </Routes>
    </div>
  )
}

export default MainRoute