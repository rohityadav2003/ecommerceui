import React, { useEffect, useState } from "react";
import axios from "axios";
import "./myorder.css"; // External CSS file for clean styling
import Home from "../pages/Home";

export default function Myorders() {
  const [myorders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/myorders`, {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div>
      <Home></Home>
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>

      {myorders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        myorders.map((order, index) => (
          <div className="order-card" key={index}>
            <div className="order-header">
              <span>Order Date: {formatDate(order.createdAt)}</span>
              <span>Order ID: #{order._id?.toUpperCase()}</span>
            </div>

            <div className="order-body">
              

              <div className="order-summary">
              <p><strong>productName:</strong> {order.productname.join(',')}</p>
                <p><strong>Total Items:</strong> {order.totalitem1}</p>
                <p><strong>Total Amount:</strong> ₹{order.totalamounts}</p>
                <p>
                  <strong>Shipping Address:</strong><br />
                  {order.address}, {order.city}, {order.state} - {order.pincode}
                </p>
                <span className={`status ${order.status?.toLowerCase()}`}>
                  {order.status}
                </span>

                {order.shippedAt && <p>📦 Shipped: {formatDate(order.shippedAt)}</p>}
                {order.deliveredAt && <p>✅ Delivered: {formatDate(order.deliveredAt)}</p>}

            
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
}
