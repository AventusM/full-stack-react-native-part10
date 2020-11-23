import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";

import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import { useHistory } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});

/* {...propdrilling allows for TextInput component props to be set from here already} */
const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        testID="usernameField"
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        testID="passwordField"
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <TouchableWithoutFeedback testID="submitButton" onPress={onSubmit}>
        <Text style={styles.signInButton} color="textWhite" fontWeight="bold">
          Sign in
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push("/"); // Repositories view
    } catch (e) {
      console.log("signIn error", e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
