/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createLatinDailyModel } from "../graphql/mutations.ts";
const client = generateClient();
export default function LatinDailyModelCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    sentence: "",
    higPitch: "",
    lowPitch: "",
  };
  const [sentence, setSentence] = React.useState(initialValues.sentence);
  const [higPitch, setHigPitch] = React.useState(initialValues.higPitch);
  const [lowPitch, setLowPitch] = React.useState(initialValues.lowPitch);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setSentence(initialValues.sentence);
    setHigPitch(initialValues.higPitch);
    setLowPitch(initialValues.lowPitch);
    setErrors({});
  };
  const validations = {
    sentence: [],
    higPitch: [],
    lowPitch: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          sentence,
          higPitch,
          lowPitch,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createLatinDailyModel.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "LatinDailyModelCreateForm")}
      {...rest}
    >
      <TextField
        label="Sentence"
        isRequired={false}
        isReadOnly={false}
        value={sentence}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              sentence: value,
              higPitch,
              lowPitch,
            };
            const result = onChange(modelFields);
            value = result?.sentence ?? value;
          }
          if (errors.sentence?.hasError) {
            runValidationTasks("sentence", value);
          }
          setSentence(value);
        }}
        onBlur={() => runValidationTasks("sentence", sentence)}
        errorMessage={errors.sentence?.errorMessage}
        hasError={errors.sentence?.hasError}
        {...getOverrideProps(overrides, "sentence")}
      ></TextField>
      <TextField
        label="Hig pitch"
        isRequired={false}
        isReadOnly={false}
        value={higPitch}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              sentence,
              higPitch: value,
              lowPitch,
            };
            const result = onChange(modelFields);
            value = result?.higPitch ?? value;
          }
          if (errors.higPitch?.hasError) {
            runValidationTasks("higPitch", value);
          }
          setHigPitch(value);
        }}
        onBlur={() => runValidationTasks("higPitch", higPitch)}
        errorMessage={errors.higPitch?.errorMessage}
        hasError={errors.higPitch?.hasError}
        {...getOverrideProps(overrides, "higPitch")}
      ></TextField>
      <TextField
        label="Low pitch"
        isRequired={false}
        isReadOnly={false}
        value={lowPitch}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              sentence,
              higPitch,
              lowPitch: value,
            };
            const result = onChange(modelFields);
            value = result?.lowPitch ?? value;
          }
          if (errors.lowPitch?.hasError) {
            runValidationTasks("lowPitch", value);
          }
          setLowPitch(value);
        }}
        onBlur={() => runValidationTasks("lowPitch", lowPitch)}
        errorMessage={errors.lowPitch?.errorMessage}
        hasError={errors.lowPitch?.hasError}
        {...getOverrideProps(overrides, "lowPitch")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
