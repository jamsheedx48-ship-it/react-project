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
    

  const handleBlock=(id,status)=>{
    const newstatus = status==="active"?"blocked":"active"
    fetch(`http://localhost:5000/users/${id}`,{
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({status:newstatus})
    })
    .then(()=>{
      fetch("http://localhost:5000/users")
    .then(res => res.json())
    .then(data => setUser(data));
    })
    
  }

  const handleRemove=(id)=>{
    fetch(`http://localhost:5000/users/${id}`,{
      method:"DELETE"
    })

    setUser((prev)=>prev.filter((curr)=>curr.id!==id))
  }
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
          <td>{curr.status==="active" ? <Button variant='danger' className='me-2' onClick={()=>handleBlock(curr.id,curr.status)}>Block</Button> :
           <Button variant='success' className='me-2' onClick={()=>handleBlock(curr.id,curr.status)}>Unblock</Button>}
          <Button variant='warning' className='ms-2' onClick={()=>handleRemove(curr.id)}>Remove</Button></td>
        </tr>
        ))}
       
        
      
      </tbody>
    </Table>
        </div>
       
       
    </div>
  )
}

export default AdminUsers