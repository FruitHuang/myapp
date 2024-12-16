/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateLatinDailyModel = /* GraphQL */ `subscription OnCreateLatinDailyModel(
  $filter: ModelSubscriptionLatinDailyModelFilterInput
) {
  onCreateLatinDailyModel(filter: $filter) {
    id
    sentence
    higPitch
    lowPitch
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLatinDailyModelSubscriptionVariables,
  APITypes.OnCreateLatinDailyModelSubscription
>;
export const onUpdateLatinDailyModel = /* GraphQL */ `subscription OnUpdateLatinDailyModel(
  $filter: ModelSubscriptionLatinDailyModelFilterInput
) {
  onUpdateLatinDailyModel(filter: $filter) {
    id
    sentence
    higPitch
    lowPitch
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLatinDailyModelSubscriptionVariables,
  APITypes.OnUpdateLatinDailyModelSubscription
>;
export const onDeleteLatinDailyModel = /* GraphQL */ `subscription OnDeleteLatinDailyModel(
  $filter: ModelSubscriptionLatinDailyModelFilterInput
) {
  onDeleteLatinDailyModel(filter: $filter) {
    id
    sentence
    higPitch
    lowPitch
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLatinDailyModelSubscriptionVariables,
  APITypes.OnDeleteLatinDailyModelSubscription
>;
