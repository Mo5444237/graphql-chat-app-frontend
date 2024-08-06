import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN_QUERY } from "./auth";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { redirect } from "react-router-dom";

const httpLink = createUploadLink({
  uri: "http://localhost:3000/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const refreshToken = async (client) => {
  try {
    const { data } = await client.query({
      query: REFRESH_TOKEN_QUERY,
      context: {
        headers: {
          "Content-Type": "application/json",
        },
        fetchOptions: {
          credentials: "include",
          fetchPolicy: "no-cache",
        },
      },
    });
    const newToken = data.refreshToken.token;
    localStorage.setItem("token", newToken);
    return newToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("token");
    redirect("/login");
    return null;
  }
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(err.statusCode);
        if (err.statusCode === 401) {
          return new Observable((observer) => {
            refreshToken(client)
              .then((newToken) => {
                if (newToken) {
                  const oldHeaders = operation.getContext().headers;
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      Authorization: `Bearer ${newToken}`,
                    },
                  });
                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  };
                  forward(operation).subscribe(subscriber);
                } else {
                  localStorage.removeItem("token");
                  observer.error(err);
                  return redirect("/");
                }
              })
              .catch(observer.error.bind(observer));
          });
        }
      }
    }
    if (networkError) {
      console.error("Network error:", networkError);
    }
  }
);

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
