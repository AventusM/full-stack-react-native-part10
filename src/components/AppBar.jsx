import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Link } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import Constants from "expo-constants";

import Text from "./Text";

import { GET_AUTHORIZED_USER } from "../graphql/queries";
import theme from "../theme";
import AuthStorageContext from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appbarBackground,
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  linkContainer: {
    display: "flex",
    flexDirection: "row",
  },
  linkMargin: {
    marginRight: 20,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER); // TODO: skeletons with loading prop
  return (
    <View style={styles.container}>
      <ScrollView style={styles.linkContainer} horizontal>
        <AppBarTab title="Repositories" linkRoute="/repositories" />
        {data && data.authorizedUser ? (
          <AppBarTab title="Sign out" signOut />
        ) : (
          <AppBarTab title="Sign in" linkRoute="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

const AppBarTab = ({ title, linkRoute, signOut }) => {
  if (signOut) return <SignOutButton title={title} />;
  else return <Tab title={title} linkRoute={linkRoute} />;
};

const SignOutButton = ({ title }) => {
  const apolloClient = useApolloClient();
  const authContext = useContext(AuthStorageContext);

  const logout = async () => {
    await authContext.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <TouchableWithoutFeedback onPress={logout}>
      <Text
        style={styles.linkMargin}
        color="textWhite"
        fontWeight="bold"
        fontSize="subheading"
      >
        {title}
      </Text>
    </TouchableWithoutFeedback>
  );
};

const Tab = ({ title, linkRoute }) => {
  return (
    <Link to={linkRoute} component={TouchableWithoutFeedback}>
      <Text
        style={styles.linkMargin}
        color="textWhite"
        fontWeight="bold"
        fontSize="subheading"
      >
        {title}
      </Text>
    </Link>
  );
};

export default AppBar;
