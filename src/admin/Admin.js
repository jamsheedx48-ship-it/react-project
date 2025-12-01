import React, { useState } from 'react'
import { Row,Col, Button } from 'react-bootstrap'
import "./css/Admin.css"
import AdminProducts from './AdminProducts'
import AdminUsers from './AdminUsers'
import AdminOrders from './AdminOrders'
import AdminDashboard from './AdminDashboard'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const Admin= () => {
  const navigate=useNavigate()
    const [btn,setBtn]=useState("dashboard")

    const handleLogout=()=>{
      Swal.fire({
       title: "Are you sure?",
       text: "Do you want to logout?",
       icon: "warning",
       showCancelButton: true,
       confirmButtonText: "Logout",
       cancelButtonText: "Cancel"
     }).then((res)=>{
       if(res.isConfirmed){
         localStorage.removeItem("adminLogin")
          navigate("/admin")
       }
     
     })
     
    }
  return (
    <div >
        <Row>
         <Col md={2} className='sidebar'>
           <h4 className='text-center mb-2'>Admin Panel</h4>
           <div className='text-center'>
            <Button variant={btn==="dashboard"?"info":"dark"} className='m-2' onClick={()=>setBtn("dashboard")}>Dashboard</Button><br/> 
            <Button variant={btn==="products"?"info":"dark"} className='m-2' onClick={()=>setBtn("products")}>Manage Products</Button><br/> 
            <Button variant={btn==="users"?"info":"dark"} className='m-2' onClick={()=>setBtn("users")}>Manage Users</Button><br/>
            <Button variant={btn==="orders"?"info":"dark"} className='m-2' onClick={()=>setBtn("orders")}>Orders</Button> <br/>
            <Button variant='danger'className='m-2' onClick={handleLogout}>Logout</Button> <br/>
           </div>
         </Col>

         <Col md={10}>
            {btn === "dashboard" && <AdminDashboard />}
            {btn === "products" && <AdminProducts />}
            {btn === "users" && <AdminUsers />}
            {btn === "orders" && <AdminOrders />}
            

         </Col>
        </Row>

    </div>
  )
}

export default Admin