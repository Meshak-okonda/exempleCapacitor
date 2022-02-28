import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  concat,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const httpLink = new HttpLink({
  uri: "https://cpsfleets.herokuapp.com/graphql",
});
// const wsLink = new WebSocketLink({
// 	uri: 'ws://cpsfleets.herokuapp.com/graphql',
// 	timeout: 300000,
// 	options: {
// 		reconnect: true,
// 	},
// });
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" ||
      definition.operation === "subscription"
    );
  },
  // wsLink,
  httpLink
);

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      // authorization: localStorage.getItem("token") || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, splitLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
