import { useContext } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { SIGN_IN } from "../graphql/mutations";
import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    return data; // Need to return data for some reason?
  };

  return [signIn, result];
};

export default useSignIn;
