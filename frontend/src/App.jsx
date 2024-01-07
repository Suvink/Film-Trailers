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

const UserData = createContext();

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
        }}
      >
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/:id" element={<IDWisePage></IDWisePage>}></Route>
          <Route path="/home" element={<LandingPage></LandingPage>}></Route>
          <Route path="/manage" element={<DisplayUsers></DisplayUsers>}></Route>
          <Route path="/newuser" element={<NewUser></NewUser>}></Route>
          <Route path="/addfilm" element={<AddFilm />} />
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/manageuser"
            element={<DisplayUsers></DisplayUsers>}
          ></Route>
          <Route path="/forgotpass" element={<ForgotPass></ForgotPass>}></Route>
          <Route path="/chats" element={<ChatPage></ChatPage>}></Route>
          <Route path="/updateshop" element={<Cart></Cart>}></Route>
          <Route
            path="/viewShop"
            element={<ViewExisting></ViewExisting>}
          ></Route>
          {/**last resort, if all other routes are not met */}
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </UserData.Provider>
    </BrowserRouter>
  );
}
