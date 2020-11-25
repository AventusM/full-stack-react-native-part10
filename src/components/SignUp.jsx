import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";

import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import { useHistory } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup.string().min(1).max(30).required("Username is required"),
  password: yup.string().min(5).max(50).required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords dont match!")
    .required("Password confirmation is required"),
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  signUpButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.signUpButton} color="textWhite" fontWeight="bold">
          Sign up
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async ({ username, password }) => {
    try {
      // 1. Sign up
      await signUp({ username, password });
      // 2. Sign in
      await signIn({ username, password });
      history.push("/repositories"); // Repositories view
    } catch (e) {
      console.log("signIn error", e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
