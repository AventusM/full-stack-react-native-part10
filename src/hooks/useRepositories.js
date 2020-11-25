import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderingOptions) => {
  const [allRepositories, setAllRepositories] = useState();

  const repositories = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: orderingOptions.orderBy,
      orderDirection: orderingOptions.orderDirection,
    },
    onCompleted: ({ repositories }) => {
      setAllRepositories(repositories);
    },
  });

  return {
    repositories: allRepositories,
    loading: repositories.loading,
    error: repositories.error,
  };
};

export default useRepositories;
