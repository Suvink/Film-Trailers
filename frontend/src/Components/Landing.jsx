import NewUser from "./NewUser";
import Login from "./Login";

const LandingPage = (props) => {
  const { setLogged, changeSignup } = props;

  if (!setLogged) {
    return <NewUser></NewUser>;
  } else {
    return <Login></Login>;
  }
};

export default LandingPage;
