import React from "react";
import { StyleSheet, View } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";

import theme from "../theme";
import SingleRepository from "./SingleRepository";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/repositories" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/repositories/:id">
          <SingleRepository />
        </Route>
        <Route path="/createReview">
          <CreateReview />
        </Route>
        <Route path="/myreviews">
          <MyReviews />
        </Route>
        <Redirect to="/repositories" />
      </Switch>
    </View>
  );
};

export default Main;
