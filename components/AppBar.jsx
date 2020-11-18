import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

import Text from "./Text";
import theme from "../theme";

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
  return (
    <View style={styles.container}>
      <ScrollView style={styles.linkContainer} horizontal>
        <AppBarTab title="Repositories" linkRoute="/" />
        <AppBarTab title="Sign in" linkRoute="/signin" />
      </ScrollView>
    </View>
  );
};

const AppBarTab = ({ title, linkRoute }) => {
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
