import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./pages/Main";
import Headmain from "./components/Headmain";
import Sub from "./pages/Sub";
import Contact from "./pages/Contact";
import Detailp from "./pages/Detailp";
import Cart from "./pages/Cart";
import UserContext from "./pages/Context";
import Address from "./components/Address";
import Payment from "./components/Payment";
import Cartsp from "./pages/Cartsp";
import Search from "./pages/Search";
import Thanks from "./pages/Thanks";
import Myorders from "./components/Myorders";

function App() {
  const [userId, setUserId] = useState(null);
 
  const[totalamounts,settotalamount]=useState(()=>{
   const totalam= localStorage.getItem("totalsam");
   return totalam?JSON.parse(totalam):0;
  })
  const[totalitem1,settotalitem]=useState(()=>{
    const totalit=localStorage.getItem("totam");
    return totalit?JSON.parse(totalit):[];
  })
  useEffect(()=>{
    localStorage.setItem("totalsam",JSON.stringify(totalamounts))
  },[totalamounts])

  useEffect(()=>{
    localStorage.setItem("totam",JSON.stringify(totalitem1))
  },[totalitem1])
// const[totalamunt1,settotalbuy]=useState(()=>{
//   consttotbuy=localStorage.getItem("totabuys");
//   return totbuy?JSON.parse(totbuy):[];
// });
// useEffect(()=>{
//   localStorage.setItem("totabuys",JSON.stringify(totalamunt1));
// },[totalamunt1])
  return (
    <UserContext.Provider value={{ userId, setUserId,totalamounts,settotalamount,totalitem1,settotalitem}}>
      <div className="App">
        <Router>
        
          <Routes>
            <Route path="/" element={<Headmain />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/results" element={<Sub />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/see" element={<Detailp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/carts" element={<Cart />} />
            <Route path="/payment" element={<Payment></Payment>} />
            <Route path="/buy" element={<Payment></Payment>} />
            <Route path="/address" element={<Address />} />
            <Route path="/search" element={<Search />} />
            <Route path="/thank" element={<Thanks/>} />
            <Route path="/myorder" element={<Myorders/>} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
