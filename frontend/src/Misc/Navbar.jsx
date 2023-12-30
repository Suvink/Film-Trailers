import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul
      className="flex space-x-4 bg-gray-800 p-4"
      style={{ textDecorationLine: "none" }}
    >
      <li>
        <Link to="/" className="text-white hover:text-gray-300">
          Home
        </Link>
      </li>
      <li>
        <Link to="/newuser" className="text-white hover:text-gray-300">
          Register
        </Link>
      </li>
      <li>
        <Link to="/login" className="text-white hover:text-gray-300">
          Login
        </Link>
      </li>
      <li>
        <Link to="/addfilm" className="text-white hover:text-gray-300">
          Add Film
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
