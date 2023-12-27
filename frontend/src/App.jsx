import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./Components/Movies";
import AddFilm from "./Components/AddFilm";
import NewUser from "./Components/NewUser";
import "./App.css";
import DisplayUsers from "./Components/DisplayUsers";
import Register from "./Components/Register";
import LandingPage from "./Components/Landing";
import { useState, createContext } from "react";

export default function App() {
  const [logged, setLogged] = useState();

  const UserData = createContext();

  const setLogin = async (user) => {
    setLogged(user);
  };

  return (
    <BrowserRouter>
      <UserData.Provider va>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route
            path="/home"
            element={
              <LandingPage
                setLogged={true}
                changeSignup={setLogin}
              ></LandingPage>
            } //not registered by default
          ></Route>
          <Route path="/manage" element={<DisplayUsers></DisplayUsers>}></Route>
          <Route path="/newuser" element={<NewUser></NewUser>}></Route>
          <Route path="/addfilm" element={<AddFilm />} />
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </UserData.Provider>
    </BrowserRouter>
  );
}
