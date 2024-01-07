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

export const UserData = createContext();

export default function App() {
  const [data, setData] = useState({
    username: "",
    password: "",
    mail: "",
    photo: "",
  });
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [id, setID] = useState("");

  return (
    <BrowserRouter>
      <UserData.Provider
        value={{
          logged,
          setLogged,
          status,
          setStatus,
          loading,
          setLoading,
          setID,
          id,
          data,
          setData,
        }}
      >
        <Navbar></Navbar>
        <Routes>
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/addfilm" element={<AddFilm />} />
          <Route path="/manage" element={<DisplayUsers />} />
          <Route path="/manageuser" element={<DisplayUsers />} />
          <Route path="/:id" element={<IDWisePage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/chats" element={<ChatPage />} />
          <Route path="/updateshop" element={<Cart />} />
          <Route path="/viewShop" element={<ViewExisting />} />
          <Route path="/" element={<Movies />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </UserData.Provider>
    </BrowserRouter>
  );
}
