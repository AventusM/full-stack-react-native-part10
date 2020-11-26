import { useQuery } from "@apollo/react-hooks";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const useAuthUser = (variables) => {
  const { data, ...result } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  return {
    data: data ?? undefined,
    ...result,
  };
};

export default useAuthUser;
