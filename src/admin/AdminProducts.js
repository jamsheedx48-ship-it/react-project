import React, { useState } from 'react'
import "./css/AdminProducts.css"
import { Card,Row,Col} from 'react-bootstrap'

const AdminProducts = () => {

  const [product,setProduct]=useState([])
  fetch(`http://localhost:5000/products`)
  .then((res)=>res.json())
  .then((data)=>setProduct(data))
  return (
    <div>
       <h2 className='mt-5 mb-5 text-center' >Manage Products</h2>
              
        <Row>
       {product.map((curr)=>(
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
              </Card.Body>
            </Card>
          </Col>
      
      
       ))}
      </Row>

    </div>
  )
}

export default AdminProducts