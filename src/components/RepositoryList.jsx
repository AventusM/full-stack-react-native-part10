import React, { useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import ItemSeparator from "./ItemSeparator";
import RepositoryItem from "./RepositoryItem";
import RepositoryListSort from "./RepositoryListSort";

import { GET_REPOSITORIES } from "../graphql/queries";
import useRepositories from "../hooks/useRepositories";

export const RepositoryListContainer = ({ repositories }) => {
  return (
    <FlatList
      testID="repositoryList"
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem {...item} />}
      ListHeaderComponent={RepositoryListSort}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return <RepositoryListContainer repositories={repositoryNodes} />;
};

export default RepositoryList;
