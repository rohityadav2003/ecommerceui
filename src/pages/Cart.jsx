import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./Context";
import Home from "./Home";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const {settotalitem,settotalamount } = useContext(UserContext);
 const navigate=useNavigate();

 
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/apicarts`, {
          withCredentials: true,
        });
        const updated = Array.isArray(res.data)
          ? res.data.map((item) => ({ ...item, quantity: 1 }))
          : [];
        setCarts(updated);
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    fetchCarts();
  }, []);

  const handleDelete = async (index, id) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/deletecart`, { id }, { withCredentials: true });
      setCarts((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const changeQty = (index, type) => {
    const updated = carts.map((item, i) => {
      if (i === index) {
        const qty = type === "plus" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: qty };
      }
      return item;
    });
    setCarts(updated);
  };
  useEffect(() => {
    // Auto update context when carts change
    const totalAmount = carts.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = carts.reduce((sum, item) => sum + item.quantity, 0);
    settotalamount(totalAmount);
    settotalitem(totalItems);
  }, [carts, settotalamount, settotalitem]);

   const totalAmount = carts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  //  const totalItems = carts.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const productNames = carts.map(item => item.product);
    navigate("/payment",{state:{productname:productNames}});
  };

  return (
    <div>
      <Home />
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <h3 className="text-center py-3">Shopping Cart</h3>
        <div className="container-fluid bg-white">
          {carts.map((item, index) => (
            <div className="row py-4 border-bottom" key={index}>
              <div className="col-12 col-md-8">
                <div className="row">
                  <div className="col-4">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}${item.image1}`}
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
                      <button
                      onClick={() => changeQty(index, "minus")}
                        className="btn btn-outline-dark"
                      >
                        -
                      </button>
                      <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => changeQty(index, "plus")}
                        className="btn btn-outline-dark"
                      >
                        +
                      </button>
                      <button
                     onClick={() => handleDelete(index, item._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>

                    <p style={{ fontWeight: "bold" }}>
                      Subtotal ({item.quantity} item): ₹{item.quantity * item.price}
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
                <h4 className="mt-2 text-dark">₹{item.quantity * item.price}</h4>
              </div>
            </div>
          ))}

          {/* Total Summary */}
          <div className="row mt-4">
            <div className="col-12 text-end">
              <h3>Total Amount: ₹{totalAmount}</h3>
            </div>
          </div>
        </div>

       {carts.length>0 ?(
 <button   onClick={handleCheckout}
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
       ):(
        <p>item are remove</p>
       )}
         
        
      </div>
    </div>
  );
}
