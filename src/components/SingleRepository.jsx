import React, { Fragment } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useHistory, useParams } from "react-router-native";
import { format } from "date-fns";

import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import ItemSeparator from "./ItemSeparator";
import theme from "../theme";

import useSingleRepository from "../hooks/useSingleRepository";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  reviewActionRow: {
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  blueishBackground: {
    backgroundColor: theme.colors.opaquePrimary,
    borderColor: theme.colors.opaquePrimary,
  },
  redBorder: {
    borderColor: theme.colors.error,
  },
  elementMarginRight: {
    marginRight: 10,
  },
  reviewRatingContainer: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    height: 35,
    justifyContent: "center",
    width: 35,
  },
  reviewTextContainer: { flexDirection: "column", flex: 1 },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <Fragment>
      <RepositoryItem {...repository} showLink />
      <ItemSeparator />
    </Fragment>
  );
};

export const ReviewItem = ({ review, isMyReview, refetch }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.reviewRatingContainer, styles.elementMarginRight]}>
          <Text color="textWhite" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewTextContainer}>
          <Text fontWeight="bold">
            {isMyReview ? review.repository.fullName : review.user.username}
          </Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), "dd.MM.yyyy")}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {isMyReview && <ReviewActions review={review} refetch={refetch} />}
    </View>
  );
};

const ReviewActions = ({ review, refetch }) => {
  const [deleteReview] = useDeleteReview();
  const history = useHistory();

  const showDeleteAlert = (reviewId) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await deleteReview({ id: reviewId });
            await refetch();
          },
        },
      ],
      { cancelable: false }
    );

  return (
    <View style={[styles.row, styles.reviewActionRow]}>
      <View style={[styles.button, styles.blueishBackground]}>
        <TouchableWithoutFeedback
          onPress={() => history.push(`repositories/${review.repositoryId}`)}
        >
          <Text style={{ color: theme.colors.primary }}>View repository</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={[styles.button, styles.redBorder]}>
        <TouchableWithoutFeedback onPress={() => showDeleteAlert(review.id)}>
          <Text style={{ color: theme.colors.error }}>Delete repository</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const variables = { id, first: 5 };
  const { repository, fetchMore } = useSingleRepository(variables);

  const repositoryInfo = repository ? repository : null;
  const repositoryReviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={repositoryReviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repositoryInfo} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
