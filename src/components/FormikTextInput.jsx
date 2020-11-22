import React from "react";
import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";

import theme from "../theme";

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.error,
    marginBottom: 10,
    marginTop: -5,
  },
  inputField: {
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={[
          styles.inputField,
          {
            borderColor: showError
              ? theme.colors.error
              : theme.colors.grayishTransparent,
          },
        ]}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
