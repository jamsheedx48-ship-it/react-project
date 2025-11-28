import {  createContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";


export const CartContext=createContext()


export const CartProvider=({children})=>{

    const navigate=useNavigate()
    const userId= localStorage.getItem("userid")
     const [cart,setCart]=useState([])
    useEffect(()=>{
        if(!userId) return;

     fetch(`http://localhost:5000/cart?userId=${userId}`)
     .then((res)=>res.json())
     .then((data)=>setCart(data))
},[userId])
   

    const addTocart=(p)=>{
        if(!userId){
            alert("Please login to continue")
            navigate("/login")
            return
        }
        
         const exist=cart.find((curr)=>curr.id===p.id)

         if(exist){
            fetch(`http://localhost:5000/cart/${exist.id}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({qty:exist.qty+1})
            })
            .then(()=>{
               setCart(prev=>
                prev.map(curr=>
                    curr.id===exist.id
                    ?{...curr,qty:curr.qty+1} :curr
                )
               )
            })
            

         }
         else{
            fetch("http://localhost:5000/cart",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    ...p,
                    qty:1,
                    userId:userId
                })
            }) 
            .then((res)=>res.json())
            .then(newItem=>{
                setCart(prev => [...prev, newItem]);
            })
         }
        
       
    }

    const RemoveTask=(id)=>{
        fetch(`http://localhost:5000/cart/${id}`,{
            method:"DELETE"
        })
     .then(()=>{
          setCart((prev)=>prev.filter((curr)=>curr.id!==id))
     })
    }

    const IncreaseQty=(id)=>{
      const item= cart.find((curr)=>curr.id===id)
      if(!item) return;
       fetch(`http://localhost:5000/cart/${id}`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({qty:item.qty+1})
        })
        setCart((prev)=>
            prev.map((curr)=>
                curr.id===id ? {...curr, qty:curr.qty+1} :curr
            )
        )
        
    }

    const DecreaseQty=(id)=>{
         const item= cart.find((curr)=>curr.id===id)
      if(!item) return;

        if(item.qty===1){
            fetch(`http://localhost:5000/cart/${id}`,{
                method:"DELETE"
            })
        }
         
        fetch(`http://localhost:5000/cart/${id}`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({qty: item.qty-1})
        })

        setCart((prev)=>
        prev
        .map((curr)=>
            curr.id===id ? {...curr,qty:curr.qty-1} : curr

        )
         .filter((curr)=>curr.qty>0)
        )

    }

    const BuySingleProduct=(product)=>{
       
        
       const userId=localStorage.getItem("userid")

       const OrderData={
        userId:userId,
        items:[product],
        total:product.price*product.qty,
        status:"pending",
        date: new Date().toISOString(),
       }

        if(!userId){
            alert("please login to continue")
            navigate("login")
            return;
        }
        

       fetch("http://localhost:5000/orders",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(OrderData)
       })
       .then((res)=>res.json())
       .then((data)=>{
        
        fetch(`http://localhost:5000/cart/${product.id}`,{
            method:"DELETE"
        })
        setCart((prev)=>prev.filter((curr)=>curr.id!==product.id))
        navigate(`/payment/${data.id}`)
       })
       
    
        
       

       
       
    }

    const PayForAll=()=>{
        const userId=localStorage.getItem("userid");

        const TotalPrice=cart.reduce((acc,curr)=>{
           return acc=acc+curr.price*curr.qty
        },0)

        const OrderData={
            userId:userId,
            items:cart,
            total:TotalPrice,
            status:"pending",
           date: new Date().toISOString()
        };

        fetch("http://localhost:5000/orders",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(OrderData)
        })
        .then((res)=>res.json())
        .then((data)=>{
            cart.forEach((curr)=>{
            fetch(`http://localhost:5000/cart/${curr.id}`,{
                method:"DELETE",
            })
            setCart([]);
            navigate(`/payment/${data.id}`)
            })
        })

        
       
    }


    return(
        <CartContext.Provider value={{addTocart,cart,RemoveTask,IncreaseQty,DecreaseQty,BuySingleProduct,PayForAll}}>
            {children}
        </CartContext.Provider>
    )
}