import React, { useEffect, useContext, useState } from "react";
import UserContext from "../pages/Context";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Home from "../pages/Home";

export default function Payment() {
  const { totalamounts, totalitem1 } = useContext(UserContext);
  const [payments, setPayment] = useState([]);
  const [paymentsmeth, setPaymentmeth] = useState("");
  const location = useLocation();
  const { productname} = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/payment`, {
          withCredentials: true,
        });
        setPayment(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPayment();
  }, []);

  const razorpay = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/create-order`,
        { totalamounts },
        { withCredentials: true }
      );
      const order = response.data;

      const options = {
        key: "rzp_test_WfJWPDv4Q8k2mb",
        amount: order.amount,
        currency: "INR",
        name: "My Shop",
        description: "Test Transaction",
        order_id: order.id,
        handler: function (response) {
          alert(
            "Payment successful! Payment ID: " + response.razorpay_payment_id
          );
        },
        theme: {
          color: "#35ac75",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("Razorpay error:", err.message);
    }
  };
  //apisend data  admin//
  const senddata = async () => {
    try {
      const response = await axios.post(
       `${process.env.REACT_APP_BACKEND_URL}/admin/order-detail`,
        {
          username: payments[0]?.username,
           address: payments[0]?.address,
           city: payments[0]?.city,
           state: payments[0]?.state,
          pincode: payments[0]?.pincode,
          productname,
          totalamounts,
          totalitem1,
         
        },
        {
          withCredentials: true,
        }
      );
      if(response.status===200){
        alert(response.data.message)
    
      }
        navigate("/thank");
      
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <Home />
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f3f3f3",
          minHeight: "100vh",
        }}
        className="container-fluid"
      >
        <div className="row">
          {/* Left Section */}
          <div className="col-12 col-md-8 mx-auto">
            {/* Address Box */}
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                marginBottom: "20px",
              }}
            >
              {payments.length > 0 ? (
                <>
                  {payments.map((item, index) => (
                    <div key={index}>
                      <h4
                        style={{ color: "black", textTransform: "capitalize" }}
                      >
                        Delivering to: {item.username}
                      </h4>
                      <p style={{ textTransform: "capitalize", color: "#555" }}>
                        {item.address}, {item.city}, {item.state},{" "}
                        {item.pincode}
                      </p>
                    </div>
                  ))}
                  <Link
                    to="/address"
                    style={{
                      color: "#007185",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Change
                  </Link>
                </>
              ) : (
                <Link
                  to="/address"
                  style={{
                    color: "#007185",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Add Address
                </Link>
              )}
            </div>

            {/* Payment Method Box */}
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  color: "#35ac75",
                  marginBottom: "15px",
                }}
              >
                Payment Method
              </h2>

              {payments.length > 0 ? (
                <>
                  <label style={{ marginBottom: "10px", display: "block" }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentsmeth === "cod"}
                      onChange={(e) => setPaymentmeth(e.target.value)}
                      style={{ marginRight: "8px" }}
                    />
                    Cash on Delivery
                  </label>
                  <label style={{ marginBottom: "10px", display: "block" }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentsmeth === "online"}
                      onChange={(e) => setPaymentmeth(e.target.value)}
                      style={{ marginRight: "8px" }}
                    />
                    Pay Online
                  </label>

                  {paymentsmeth === "online" && (
                    <button
                      onClick={razorpay}
                      style={{
                        width: "100%",
                        backgroundColor: "#35ac75",
                        color: "#fff",
                        padding: "12px",
                        marginTop: "15px",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      Pay online
                    </button>
                  )}

                  {paymentsmeth === "cod" && (
                    <Link
                      
                      onClick={senddata}
                      style={{
                        display: "block",
                        textAlign: "center",
                        marginTop: "15px",
                        backgroundColor: "#35ac75",
                        color: "#fff",
                        padding: "12px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "16px",
                        textDecoration: "none",
                      }}
                    >
                      Place Your Order (COD)
                    </Link>
                  )}
                </>
              ) : (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  Please add a delivery address first.
                </p>
              )}
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="col-12 col-md-4">
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                position: "sticky",
                top: "100px",
                height: "fit-content",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  color: "#333",
                  marginBottom: "15px",
                }}
              >
                Order Summary
              </h3>
              <div
                style={{
                  fontSize: "15px",
                  color: "#555",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Items Total</span>
                  <span>{totalitem1}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5px",
                  }}
                >
                  <span>Delivery</span>
                  <span style={{ color: "#35ac75" }}>Free</span>
                </div>
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                <span>Total Amount</span>
                <span>₹{totalamounts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>{productname}</p>
    </div>
  );
}
