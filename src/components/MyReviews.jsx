import React from "react";
import { FlatList, View, Text } from "react-native";

import { ReviewItem } from "./SingleRepository";
import ItemSeparator from "./ItemSeparator";

import useAuthUser from "../hooks/useAuthUser";

const MyReviews = () => {
  const { data, loading, refetch } = useAuthUser({ includeReviews: true });

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  const reviewNodes = data.authorizedUser.reviews
    ? data.authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem review={item} refetch={refetch} isMyReview />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
