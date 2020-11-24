import React, { Fragment } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-native";
import { format } from "date-fns";

import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import ItemSeparator from "./ItemSeparator";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import theme from "../theme";
import useSingleRepository from "../hooks/useSingleRepository";

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: theme.colors.white,
    display: "flex",
    flexDirection: "row",
    padding: 10,
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

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={[styles.reviewRatingContainer, styles.elementMarginRight]}>
        <Text color="textWhite" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewTextContainer}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useSingleRepository(id);

  const repositoryInfo = repository ? repository : null;
  const repositoryReviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryReviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repositoryInfo} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
