import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom';
import Home from './Home';
const reducer=(state,action)=>{
    switch(action.type){
        case 'minus':
            return {count:state.count-1}
            case 'plus':
            return {count:state.count+1}
            case'delete':
            return{count:0}
            default:
                throw new Error(`unknown action type${action.type}`) 
    }
}
export default function Cartsp() {
    const[carts,setcarts]=useState([]);
    useEffect(() => {
        const fetchapi = async () => {
          try {
            const response = await axios.get(
              `http://localhost:1900/user/apicarts`,
              {
                withCredentials: true,
              }
            );
           setcarts(response.data);
          } catch (err) {
            console.error("Error fetching carts:", err.message);
          }
        };
    
        fetchapi();
      }, []);
      const initialstate={count:1};
      const[state,dispatch]=useReducer(reducer,initialstate);
      const totalAmount = carts.reduce(
        (acc, item) => acc + item.price * 1,  
        0
      );

      
  return (
    <div>
   <Home></Home>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <h3 className="text-center py-3">Shopping Cart</h3>
        <div className="container-fluid bg-white">
          {carts.map((item, index) => (
            <div className="row py-4 border-bottom" key={index}>
              <div className="col-12 col-md-8">
                <div className="row">
                  <div className="col-4">
                    <img
                      src={`http://localhost:1900${item.image1}`}
                      className="img-fluid"
                      style={{
                        height: "80%",
                        width: "80%",
                        borderRadius: "10px",
                        boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                      }}
                      alt=""
                    />
                  </div>

                  <div className="col-8">
                    <h4 style={{ color: "orangered", textTransform: "capitalize" }}>
                      {item.product}
                    </h4>
                    <p
                      style={{
                        color: item.stockStatus === "in-stock" ? "green" : "red",
                      }}
                    >
                      {item.stockStatus}
                    </p>
                    <p style={{ color: "blue" }}>{item.description}</p>

                    <div className="d-flex gap-3 align-items-center my-2">
                      <button onClick={()=>dispatch({type:'minus'})}
                       
                        className="btn btn-outline-dark"
                      >
                        -
                      </button>
                      <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {state.count}
                      </span>
                      <button onClick={()=>dispatch({type:'plus'})}
                       
                        className="btn btn-outline-dark"
                      >
                        +
                      </button>
                      <button onClick={()=>dispatch({type:'delete'})}
                       
                      >
                        Delete
                      </button>
                    </div>

                    <p style={{ fontWeight: "bold" }}>
                      {/* Subtotal ({item.quantity} item): ₹{item.quantity * item.price} */}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4 d-flex flex-column align-items-end">
                <span
                  className="bg-danger text-white px-2 py-1 mb-2 rounded"
                  style={{ fontSize: "0.9rem" }}
                >
                  {item.discountPrice} off
                </span>
                <span style={{ color: "#cc0c39", fontWeight: "600" }}>
                  Limited time deal
                </span>
                <h4 className="mt-2 text-dark">₹{item.price}</h4>
              </div>
            </div>
          ))}

          {/* Total Summary */}
          <div className="row mt-4">
            <div className="col-12 text-end">
              <h3>Total Amount:{totalAmount}</h3>
            </div>
          </div>
        </div>

        <Link
          to="/payment"
         
        >
          <button
            style={{
              backgroundColor: "#35ac75",
              color: "white",
              padding: "12px 30px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              margin: "20px auto",
            }}
          >
            Checkout
          </button>
        </Link>
      </div>

    </div>
  )
}
