/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getLatinDailyModel = /* GraphQL */ `query GetLatinDailyModel($id: ID!) {
  getLatinDailyModel(id: $id) {
    id
    sentence
    higPitch
    lowPitch
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetLatinDailyModelQueryVariables,
  APITypes.GetLatinDailyModelQuery
>;
export const listLatinDailyModels = /* GraphQL */ `query ListLatinDailyModels(
  $filter: ModelLatinDailyModelFilterInput
  $limit: Int
  $nextToken: String
) {
  listLatinDailyModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      sentence
      higPitch
      lowPitch
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLatinDailyModelsQueryVariables,
  APITypes.ListLatinDailyModelsQuery
>;
