import { gql } from "apollo-boost";

export const GET_AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
  ) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
      edges {
        node {
          id
          fullName
          ownerAvatarUrl
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
        }
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query getUsers($id: ID!) {
    repository(id: $id) {
      id
      fullName
      ownerAvatarUrl
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;