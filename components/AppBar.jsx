import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appbarBackground,
    display: "flex",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab title="Repositories" />
    </View>
  );
};

const AppBarTab = ({ title }) => {
  return (
    <TouchableWithoutFeedback onPress={() => console.log("hello")}>
      <Text color="textWhite" fontWeight="bold" fontSize="subheading">
        {title}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default AppBar;
