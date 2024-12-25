/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { LatinDailyModel } from "../API.ts";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LatinDailyModelUpdateFormInputValues = {
    sentence?: string;
    higPitch?: string;
    lowPitch?: string;
};
export declare type LatinDailyModelUpdateFormValidationValues = {
    sentence?: ValidationFunction<string>;
    higPitch?: ValidationFunction<string>;
    lowPitch?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LatinDailyModelUpdateFormOverridesProps = {
    LatinDailyModelUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    sentence?: PrimitiveOverrideProps<TextFieldProps>;
    higPitch?: PrimitiveOverrideProps<TextFieldProps>;
    lowPitch?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LatinDailyModelUpdateFormProps = React.PropsWithChildren<{
    overrides?: LatinDailyModelUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    latinDailyModel?: LatinDailyModel;
    onSubmit?: (fields: LatinDailyModelUpdateFormInputValues) => LatinDailyModelUpdateFormInputValues;
    onSuccess?: (fields: LatinDailyModelUpdateFormInputValues) => void;
    onError?: (fields: LatinDailyModelUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LatinDailyModelUpdateFormInputValues) => LatinDailyModelUpdateFormInputValues;
    onValidate?: LatinDailyModelUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LatinDailyModelUpdateForm(props: LatinDailyModelUpdateFormProps): React.ReactElement;
