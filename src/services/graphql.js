import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN_QUERY } from "./auth";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
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
        },
      },
    });
    const newToken = data.refreshToken.token;
    localStorage.setItem("token", newToken);
    return newToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("token");
    return null;
  }
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(err.statusCode);
        if (err.statusCode === 401) {
          return new Promise((resolve, reject) => {
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
                  observer.error(err);
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
