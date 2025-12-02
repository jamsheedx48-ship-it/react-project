import React, { useEffect, useState } from 'react'
import "./css/AdminProducts.css"
import { Card,Row,Col,Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminProducts = () => {
  const navigate=useNavigate()
   const [category,setCategory]=useState("all")
   const [product,setProduct]=useState([])
 
  useEffect(()=>{
     fetch(`http://localhost:5000/products`)
  .then((res)=>res.json())
  .then((data)=>setProduct(data))
  },[])

  const FilteredProducts=product.filter((curr)=>{
    if(category==="featured"){
      return curr.featured===true
    }
    return curr;
    
})
   const handleRemove=(id)=>{
     fetch(`http://localhost:5000/products/${id}`,{
      method:"DELETE",
     })
     .then(()=>{
      setProduct(product.filter((curr)=>curr.id!==id))
      toast.success("Product removed")
     })
   }
   
  return (
    <div>
       <h2 className='mt-5 mb-5 text-center' >Manage Products</h2>

       
      { <div className='btn-category text-center mb-4'>
        <Button variant={category==="all"? "dark" : "outline-dark"} className='me-2' onClick={()=>setCategory('all')}>All</Button>
      <Button variant={category==="featured"?"dark" : "outline-dark"} className='ms-2' onClick={()=>setCategory('featured')}>Featured</Button>
      </div> }
      
        <div className='text-end my-4 me-3'>
        <Button variant='success' onClick={()=>navigate("/admin/addproduct")}>Add products</Button>
        </div>
        <Row>
       {FilteredProducts.map((curr)=>(
        <Col md={4} sm={6} xs={12} className='mb-4' key={curr.id}>
        
            <Card className='shadow-sm mb-4 p-3 shadow-sm rouned-3'  >
              <Card.Img  className="product-img"src={curr.image} alt={curr.name}/>
              <Card.Body>
                <Card.Title >{curr.name}</Card.Title>
                <Card.Text >
                  {curr.type}
                </Card.Text>
                <Card.Text>
                  ₹{curr.price}
                </Card.Text>
                  <Button variant="dark" className='me-1' onClick={()=>navigate(`/admin/editproduct/${curr.id}`)}>Edit</Button>
                  <Button variant="warning" className='ms-1' onClick={() => handleRemove(curr.id)}>                 
                   Remove</Button>
              </Card.Body>
            </Card>
          </Col>
      
      
       ))}
       
      </Row>
      

    </div>
  )
}

export default AdminProducts