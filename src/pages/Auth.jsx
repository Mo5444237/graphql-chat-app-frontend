import { useSearchParams } from "react-router-dom";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

function Auth() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  if (isLogin) {
    return <Login />;
  } else {
    return <Signup />;
  }
}

export default Auth;
