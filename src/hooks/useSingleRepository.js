import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepository = (repositoryID) => {
  const [singleRepository, setSingleRepository] = useState();

  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id: repositoryID },
    onCompleted: ({ repository }) => {
      setSingleRepository(repository);
    },
  });

  return { repository: singleRepository, loading, error };
};

export default useSingleRepository;
