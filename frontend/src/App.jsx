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
import IDWisePage from "./Components/IDWise";
import Navbar from "./Misc/Navbar";
import PageNotFound from "./Components/404";
// import TestPage from "../../Test";

export default function App() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [id, setID] = useState("");

  const UserData = createContext();
  return (
    <BrowserRouter>
      <UserData.Provider
        value={{ logged, setLogged, status, setStatus, loading, setLoading }}
      >
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Movies logged={logged} setID={setID} />} />
          <Route
            path="/data/:id"
            element={
              <IDWisePage
                status={status}
                setStatus={setStatus}
                id={id}
              ></IDWisePage>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <LandingPage setLogged={setLogged} logged={logged}></LandingPage>
            }
          ></Route>
          <Route
            path="/manage"
            element={
              <DisplayUsers
                loading={loading}
                setLoading={setLoading}
              ></DisplayUsers>
            }
          ></Route>
          <Route
            path="/newuser"
            element={
              <NewUser
                logged={logged}
                setLogged={setLogged}
                status={status}
                setStatus={setStatus}
                loading={loading}
                setLoading={setLoading}
              ></NewUser>
            }
          ></Route>
          <Route
            path="/addfilm"
            element={
              <AddFilm
                status={status}
                setStatus={setStatus}
                loading={loading}
                setLoading={setLoading}
              />
            }
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
            element={
              <DisplayUsers
                loading={loading}
                setLoading={setLoading}
              ></DisplayUsers>
            }
          ></Route>
          <Route
            path="/forgotpass"
            element={
              <ForgotPass
                setLogged={setLogged}
                logged={logged}
                status={status}
                setStatus={setStatus}
              ></ForgotPass>
            }
          ></Route>
          <Route path="/chats" element={<ChatPage></ChatPage>}></Route>
          <Route
            path="/updateshop"
            element={
              <Cart
                status={status}
                setStatus={setStatus}
                loading={loading}
                setLoading={setLoading}
              ></Cart>
            }
          ></Route>
          <Route
            path="/viewShop"
            element={
              <ViewExisting
                loading={loading}
                setLoading={setLoading}
                status={status}
                setStatus={setStatus}
              ></ViewExisting>
            }
          ></Route>

          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          {/**last resort, if all other routes are not met */}
        </Routes>
      </UserData.Provider>
    </BrowserRouter>
  );
}
