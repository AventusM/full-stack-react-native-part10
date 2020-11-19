import ApolloClient from "apollo-boost";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://87.92.189.153:5000/graphql",
  });
};

export default createApolloClient;
