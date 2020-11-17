import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View} from "react-native";

import RepositoryList from "./components/RepositoryList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RepositoryList />
    </View>
  );
};

export default Main;
