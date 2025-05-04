import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "./Home";
import axios from "axios";
import UserContext from "./Context";
export default function Detailp() {
  const location = useLocation();
  const { detail } = location.state || {};
  const item = detail[0];
  const [select, setselect] = useState(item.image1[0]);
  const navigate = useNavigate();
  const { userId,settotalamount,settotalitem  } = useContext(UserContext);

  const handlebtn = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please login to add to cart");

      return;
    }
    try {
      const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/cart`,
        {
          product: item.product,
          price: item.price,
          discountPrice: item.discountPrice,
          stockStatus: item.stockStatus,
          image1: select,

          // id:userId //DOUBT//
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert(response.data.message);
        navigate("/cart");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const handbuy=async()=>{
    if (!userId) {
      alert("Please log in to proceed with the purchase.");
      return;
    }
    navigate('/buy',{state:{productname:item.product}});
    settotalamount(item.price)
    settotalitem(1)

  }
  return (
    <div>
      <Home />

      <div
        className="container-fluid"
        style={{
          background:
            "linear-gradient(135deg, #2b1055 0%, #7597de 50%, #858ae3 100%)",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <div className="row">
          {detail.map((item) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "720px",
                overflow: "scroll",
                gap: "10px",
                marginTop: "4rem",
                background: "#34495E",
              }}
              className="col-12 col-sm-12 col-md-4 col-lg-4 text-end  order-2 order-md-1 imgdisplay"
            >
              {item.image1.map((imgsrc) => (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${imgsrc}`}
                  className="img-fluid"
                  onClick={() => setselect(imgsrc)}
                  style={{
                    height: "40%",
                    width: "40%",
                    marginTop: "rem",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease-in-out",
                    boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                  }}
                />
              ))}
            </div>
          ))}
          {detail.map((item) => (
            <div className="col-12 col-sm-12 col-md-8 col-lg-8 order-1 order-md-2 ">
              <div
                className="row img2 "
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#34495E",
                  borderRadius: "15px",
                  margin: "4rem 0rem 4rem -0.7rem",
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",

                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <div
                  className="col-12 col-sm-12 col-md-6 col-lg-6"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}${select}`}
                    className="img-fluid"
                    alt={item.product}
                    style={{
                      height: "80%",
                      width: "70%",
                      margin: "3rem",
                      borderRadius: "10px",
                      transition: "transform 0.3s ease-in-out",
                      boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>

                <div
                  className="col-12 col-sm-12 col-md-6 col-lg-6 text-start"
                  style={{
                    padding: "20px",
                    color: "#fff",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      color: "#f1c40f",
                      marginBottom: "10px",
                    }}
                  >
                    {item.product}
                  </h2>
                  <p style={{ fontSize: "1.5rem", color: "#fff" }}>
                    Price: ₹{item.price}
                  </p>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      color: "#2ecc71",
                      fontWeight: "bold",
                    }}
                  >
                    Discount Price: ₹{item.discountPrice}
                  </p>
                  <p style={{ fontSize: "1.2rem", color: "#ecf0f1" }}>
                    {item.description}
                  </p>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      color:
                        item.stockStatus === "in-stock" ? "#42b883" : "red",
                    }}
                  >
                    {item.stockStatus === "in-stock"
                      ? "✔ In Stock"
                      : "❌ Out of Stock"}
                  </p>

                  <div
                    style={{ marginTop: "20px", display: "flex", gap: "15px" }}
                  >
                  
                    <button
                  
                     onClick={handbuy}
                      style={{
                        background: "#e74c3c",
                        color: "white",
                        padding: "12px 20px",
                        border: "none",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        borderRadius: "8px",
                        transition: "0.3s ease-in-out",
                        boxShadow: "0px 5px 10px rgba(231, 76, 60, 0.3)",
                        cursor:item.stockStatus==='in-stock'?'pointer':'not-allowed'
                      }}
                      disabled={item.stockStatus !== "in-stock"}
                    >
                      Buy Now
                    </button>

                    {/* <Link
                      to="/cart"
                      state={{
                        details: detail.filter(
                          (p) => p.product === item.product
                        ),
                        select,
                        name1
                      }}
                    > */}
                    <button   
                      onClick={handlebtn}
                      style={{
                        background: "#3498db",
                        color: "white",
                        padding: "12px 20px",
                        border: "none",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        borderRadius: "8px",
                        transition: "0.3s ease-in-out",
                        boxShadow: "0px 5px 10px rgba(52, 152, 219, 0.3)",
                        cursor:item.stockStatus==='in-stock'?'pointer':'not-allowed'
                      }}
                      disabled={item.stockStatus !== "in-stock"}
                    >
                      Add to Cart
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <h1>{userId}</h1> */}
    </div>
  );
}
