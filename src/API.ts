/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLatinDailyModelInput = {
  id?: string | null,
  sentence?: string | null,
  higPitch?: string | null,
  lowPitch?: string | null,
};

export type ModelLatinDailyModelConditionInput = {
  sentence?: ModelStringInput | null,
  higPitch?: ModelStringInput | null,
  lowPitch?: ModelStringInput | null,
  and?: Array< ModelLatinDailyModelConditionInput | null > | null,
  or?: Array< ModelLatinDailyModelConditionInput | null > | null,
  not?: ModelLatinDailyModelConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type LatinDailyModel = {
  __typename: "LatinDailyModel",
  id: string,
  sentence?: string | null,
  higPitch?: string | null,
  lowPitch?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateLatinDailyModelInput = {
  id: string,
  sentence?: string | null,
  higPitch?: string | null,
  lowPitch?: string | null,
};

export type DeleteLatinDailyModelInput = {
  id: string,
};

export type ModelLatinDailyModelFilterInput = {
  id?: ModelIDInput | null,
  sentence?: ModelStringInput | null,
  higPitch?: ModelStringInput | null,
  lowPitch?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelLatinDailyModelFilterInput | null > | null,
  or?: Array< ModelLatinDailyModelFilterInput | null > | null,
  not?: ModelLatinDailyModelFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelLatinDailyModelConnection = {
  __typename: "ModelLatinDailyModelConnection",
  items:  Array<LatinDailyModel | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionLatinDailyModelFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  sentence?: ModelSubscriptionStringInput | null,
  higPitch?: ModelSubscriptionStringInput | null,
  lowPitch?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLatinDailyModelFilterInput | null > | null,
  or?: Array< ModelSubscriptionLatinDailyModelFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateLatinDailyModelMutationVariables = {
  input: CreateLatinDailyModelInput,
  condition?: ModelLatinDailyModelConditionInput | null,
};

export type CreateLatinDailyModelMutation = {
  createLatinDailyModel?:  {
    __typename: "LatinDailyModel",
    id: string,
    sentence?: string | null,
    higPitch?: string | null,
    lowPitch?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLatinDailyModelMutationVariables = {
  input: UpdateLatinDailyModelInput,
  condition?: ModelLatinDailyModelConditionInput | null,
};

export type UpdateLatinDailyModelMutation = {
  updateLatinDailyModel?:  {
    __typename: "LatinDailyModel",
    id: string,
    sentence?: string | null,
    higPitch?: string | null,
    lowPitch?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLatinDailyModelMutationVariables = {
  input: DeleteLatinDailyModelInput,
  condition?: ModelLatinDailyModelConditionInput | null,
};

export type DeleteLatinDailyModelMutation = {
  deleteLatinDailyModel?:  {
    __typename: "LatinDailyModel",
    id: string,
    sentence?: string | null,
    higPitch?: string | null,
    lowPitch?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetLatinDailyModelQueryVariables = {
  id: string,
};

export type GetLatinDailyModelQuery = {
  getLatinDailyModel?:  {
    __typename: "LatinDailyModel",
    id: string,
    sentence?: string | null,
    higPitch?: string | null,
    lowPitch?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLatinDailyModelsQueryVariables = {
  filter?: ModelLatinDailyModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLatinDailyModelsQuery = {
  listLatinDailyModels?:  {
    __typename: "ModelLatinDailyModelConnection",
    items:  Array< {
      __typename: "LatinDailyModel",
      id: string,
      sentence?: string | null,
      higPitch?: string | null,
      lowPitch?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateLatinDailyModelSubscriptionVariables = {
  filter?: ModelSubscriptionLatinDailyModelFilterInput | null,
};

export type OnCreateLatinDailyModelSubscription = {
  onCreateLatinDailyModel?:  {
    __typename: "LatinDailyModel",
    id: string,
    sentence?: string | null,
    higPitch?: string | null,
    lowPitch?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLatinDailyModelSubscriptionVariables = {
  filter?: ModelSubscriptionLatinDailyModelFilterInput | null,
};

export type OnUpdateLatinDailyModelSubscription = {
  onUpdateLatinDailyModel?:  {
    __typename: "LatinDailyModel",
    id: string,
    sentence?: string | null,
    higPitch?: string | null,
    lowPitch?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLatinDailyModelSubscriptionVariables = {
  filter?: ModelSubscriptionLatinDailyModelFilterInput | null,
};

export type OnDeleteLatinDailyModelSubscription = {
  onDeleteLatinDailyModel?:  {
    __typename: "LatinDailyModel",
    id: string,
    sentence?: string | null,
    higPitch?: string | null,
    lowPitch?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
