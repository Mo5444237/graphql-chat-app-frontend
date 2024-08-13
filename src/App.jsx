import { RouterProvider } from "react-router-dom";
import router from "./BrowserRouter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import socket from "./services/socket";
import { fetchUserData } from "./store/user-actions";
import client from "./services/graphql";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.mode);
  const token = localStorage.getItem("token");

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  useEffect(() => {
    if (!token) {
      router.navigate("/auth?mode=login");
      socket.disconnect();
    } else {
      router.navigate("/");
      socket.connect();
      dispatch(fetchUserData());
    }
  }, [dispatch, user.isAuthenticated]);

  useEffect(() => {
    document.body.className = theme === "light" ? "light-mode" : "dark-mode";
  }, [theme]);

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
