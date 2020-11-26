import React, { useContext, Fragment } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Link, useHistory } from "react-router-native";
import { useApolloClient } from "@apollo/react-hooks";
import Constants from "expo-constants";

import Text from "./Text";

import theme from "../theme";
import AuthStorageContext from "../contexts/AuthStorageContext";
import useAuthUser from "../hooks/useAuthUser";

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
  const { data } = useAuthUser({ includeReviews: false });
  return (
    <View style={styles.container}>
      <ScrollView style={styles.linkContainer} horizontal>
        <AppBarTab title="Repositories" linkRoute="/repositories" />
        {data && data.authorizedUser ? (
          <Fragment>
            <AppBarTab title="Create a review" linkRoute="/createReview" />
            <AppBarTab title="My reviews" linkRoute="/myreviews" />
            <AppBarTab title="Sign out" signOut />
          </Fragment>
        ) : (
          <Fragment>
            <AppBarTab title="Sign in" linkRoute="/signin" />
            <AppBarTab title="Sign up" linkRoute="/signup" />
          </Fragment>
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
  const history = useHistory();

  const logout = async () => {
    history.push("/repositories");
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
