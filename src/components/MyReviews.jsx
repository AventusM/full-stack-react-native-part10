import React from "react";
import { FlatList } from "react-native";

import { ReviewItem } from "./SingleRepository";
import ItemSeparator from "./ItemSeparator";

import useAuthUser from "../hooks/useAuthUser";

const MyReviews = () => {
  const { data } = useAuthUser({ includeReviews: true });

  const reviewNodes = data.authorizedUser.reviews
    ? data.authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} showRepoName />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
