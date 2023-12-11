import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import Movies from "./Components/Movies";
import AddFilm from "./Components/AddFilm";
import DeleteFilm from "./Components/DeleteFilm";
import NewUser from "./Components/NewUser";
import "./App.css";
import DisplayUsers from "./Components/DisplayUsers";
import Register from "./Components/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/manage" element={<DisplayUsers></DisplayUsers>}></Route>
        <Route path="/newuser" element={<NewUser></NewUser>}></Route>
        <Route path="/addfilm" element={<AddFilm />} />
        <Route path="/delete" element={<DeleteFilm></DeleteFilm>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
