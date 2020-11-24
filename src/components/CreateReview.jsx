import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";

import theme from "../theme";
import { useHistory } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";

const validationSchema = yup.object().shape({
  repositoryOwner: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  repositoryRating: yup.number().min(0).max(100).required("Rating is required"),
});

const initialValues = {
  repositoryOwner: "",
  repositoryName: "",
  repositoryRating: "",
  repositoryReview: "", // Optional
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  createReviewButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="repositoryOwner"
        placeholder="Repository owner name"
      />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput
        name="repositoryRating"
        placeholder="Rating between 0 and 100"
      />
      <FormikTextInput
        name="repositoryReview"
        placeholder="Review"
        multiline={true}
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text
          style={styles.createReviewButton}
          color="textWhite"
          fontWeight="bold"
        >
          Create a review
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async ({
    repositoryOwner,
    repositoryName,
    repositoryRating,
    repositoryReview,
  }) => {
    try {
      const review = {
        repositoryName,
        ownerName: repositoryOwner,
        rating: Number(repositoryRating),
        text: repositoryReview,
      };

      const data = await createReview({ review });
      history.push(`/repositories/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log("Unable to create a review", e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
