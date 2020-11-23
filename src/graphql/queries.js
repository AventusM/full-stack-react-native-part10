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
  query {
    repositories {
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
  query getUsers($id: ID!){
    repository(id: $id){
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
    }
  }
`;
