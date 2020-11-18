import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import Text from "./Text";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

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
  inputField: {
    borderColor: theme.colors.grayishTransparent,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

/* {...propdrilling allows for TextInput component props to be set from here already} */
const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.inputField}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={styles.inputField}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.signInButton} color="textWhite" fontWeight="bold">
          Sign in
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log("submitted values:", values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
