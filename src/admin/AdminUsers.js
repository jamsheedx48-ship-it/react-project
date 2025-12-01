import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import "./css/AdminUsers.css"
import { useNavigate } from 'react-router-dom'
const AdminUsers = () => {
  const navigate=useNavigate()
  const [user,setUser]=useState([])
  useEffect(()=>{
     fetch(`http://localhost:5000/users`)
  .then((res)=>res.json())
  .then((data)=>setUser(data))
  },[])
  return (
    <div>
       <h2 className='mt-5 text-center  mb-4' >Manage Users</h2>
       
        <div>
        <Table striped bordered hover className='mt-4'>
      <thead>
        <tr>
          <th>#</th>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {user.map((curr,index)=>(
             <tr key={curr.id}>
          <td  onClick={()=>navigate(`/admin/userdetails/${curr.id}`)}>{index+1}</td>
          <td  onClick={()=>navigate(`/admin/userdetails/${curr.id}`)}>{curr.id}</td>
          <td  onClick={()=>navigate(`/admin/userdetails/${curr.id}`)}>{curr.name}</td>
          <td  onClick={()=>navigate(`/admin/userdetails/${curr.id}`)}>{curr.email}</td>
          <td><Button variant='danger' className='me-2'>Block</Button>
          <Button variant='warning' className='ms-2'>Remove</Button></td>
        </tr>
        ))}
       
        
      
      </tbody>
    </Table>
        </div>
       
       
    </div>
  )
}

export default AdminUsers