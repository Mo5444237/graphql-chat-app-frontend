import { userActions } from "./user-slice";
import { GET_USER_QUERY } from "../services/auth";
import client from "../services/graphql";
import socket from "../services/socket";

export const fetchUserData = () => {
  return async (dispatch) => {
    try {
      const { data } = await client.query({ query: GET_USER_QUERY });
      if (data.getUser) {
        dispatch(userActions.setUser(data.getUser));
        socket.emit("joinRoom", data.getUser._id );
      }
    } catch (error) {
      console.log(error.graphQLErrors[0]);
    }
  };
};
