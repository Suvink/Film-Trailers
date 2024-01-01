import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./Components/Movies";
import AddFilm from "./Components/AddFilm";
import NewUser from "./Components/NewUser";
import DisplayUsers from "./Components/DisplayUsers";
import LandingPage from "./Components/Landing";
import { createContext, useState } from "react";
import Login from "./Components/Login";
import ForgotPass from "./Components/ForgotPass";
import "./App.css";
import ChatPage from "./Components/Socket";
import Cart from "./Components/Cart";
import ViewExisting from "./Components/ViewExisting";
import Navbar from "./Misc/Navbar";

export default function App() {
  const [logged, setLogged] = useState(false);
  const [status, setStatus] = useState("");

  const UserData = createContext();
  return (
    <BrowserRouter>
      <UserData.Provider value={(logged, setLogged, status, setStatus)}>
        {/**To pass across all components and their children */}
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route
            path="/home"
            element={
              <LandingPage setLogged={setLogged} logged={logged}></LandingPage>
            } //not registered by default
          ></Route>
          <Route path="/manage" element={<DisplayUsers></DisplayUsers>}></Route>
          <Route path="/newuser" element={<NewUser></NewUser>}></Route>
          <Route
            path="/addfilm"
            element={<AddFilm status={status} setStatus={setStatus} />}
          />
          <Route
            path="/login"
            element={
              <Login
                setLogged={setLogged}
                status={status}
                setStatus={setStatus}
              ></Login>
            }
          ></Route>
          <Route
            path="/manageuser"
            element={<DisplayUsers></DisplayUsers>}
          ></Route>
          <Route
            path="/forgotpass"
            element={
              <ForgotPass setLogged={setLogged} logged={logged}></ForgotPass>
            }
          ></Route>
          <Route path="/chats" element={<ChatPage></ChatPage>}></Route>
          <Route path="/updateshop" element={<Cart></Cart>}></Route>
          <Route
            path="/viewShop"
            element={<ViewExisting></ViewExisting>}
          ></Route>
        </Routes>
      </UserData.Provider>
    </BrowserRouter>
  );
}
