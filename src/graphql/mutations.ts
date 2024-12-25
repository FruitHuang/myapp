/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createLatinDailyModel = /* GraphQL */ `mutation CreateLatinDailyModel(
  $input: CreateLatinDailyModelInput!
  $condition: ModelLatinDailyModelConditionInput
) {
  createLatinDailyModel(input: $input, condition: $condition) {
    id
    sentence
    higPitch
    lowPitch
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLatinDailyModelMutationVariables,
  APITypes.CreateLatinDailyModelMutation
>;
export const updateLatinDailyModel = /* GraphQL */ `mutation UpdateLatinDailyModel(
  $input: UpdateLatinDailyModelInput!
  $condition: ModelLatinDailyModelConditionInput
) {
  updateLatinDailyModel(input: $input, condition: $condition) {
    id
    sentence
    higPitch
    lowPitch
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLatinDailyModelMutationVariables,
  APITypes.UpdateLatinDailyModelMutation
>;
export const deleteLatinDailyModel = /* GraphQL */ `mutation DeleteLatinDailyModel(
  $input: DeleteLatinDailyModelInput!
  $condition: ModelLatinDailyModelConditionInput
) {
  deleteLatinDailyModel(input: $input, condition: $condition) {
    id
    sentence
    higPitch
    lowPitch
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLatinDailyModelMutationVariables,
  APITypes.DeleteLatinDailyModelMutation
>;
