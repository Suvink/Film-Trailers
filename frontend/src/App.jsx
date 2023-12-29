import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./Components/Movies";
import AddFilm from "./Components/AddFilm";
import NewUser from "./Components/NewUser";
import "./App.css";
import DisplayUsers from "./Components/DisplayUsers";
import LandingPage from "./Components/Landing";
import { createContext } from "react";
import Login from "./Components/Login";
import ForgotPass from "./Components/ForgotPass";

export default function App() {
  const UserData = createContext();
  return (
    <BrowserRouter>
      <UserData.Provider>
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
        </Routes>
      </UserData.Provider>
    </BrowserRouter>
  );
}
