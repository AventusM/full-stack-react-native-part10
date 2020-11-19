import React from "react";
import { FlatList, View, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import ItemSeparator from "./ItemSeparator";
import RepositoryItem from "./RepositoryItem";

import { GET_REPOSITORIES } from "../graphql/queries";

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data.repositories.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem node={item.node} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
