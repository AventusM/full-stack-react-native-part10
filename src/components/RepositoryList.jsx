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

  const repositoryNodes = data.repositories
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
