import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./Components/Movies";
import AddFilm from "./Components/AddFilm";
import NewUser from "./Components/NewUser";
import DisplayUsers from "./Components/DisplayUsers";
import LandingPage from "./Components/Landing";
import { createContext } from "react";
import Login from "./Components/Login";
import ForgotPass from "./Components/ForgotPass";
import "./App.css";
import ChatPage from "./Components/Socket";
import Cart from "./Components/Cart";
import ViewExisting from "./Components/ViewExisting";

export default function App() {
  const user = "oof";
  const UserData = createContext();
  return (
    <BrowserRouter>
      <UserData.Provider value={user}>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route
            path="/home"
            element={<LandingPage setLogged={false}></LandingPage>} //not registered by default
          ></Route>
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
        </Routes>
      </UserData.Provider>
    </BrowserRouter>
  );
}
