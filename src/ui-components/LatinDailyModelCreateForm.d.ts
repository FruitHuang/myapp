/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type LatinDailyModelCreateFormInputValues = {
    sentence?: string;
    higPitch?: string;
    lowPitch?: string;
};
export declare type LatinDailyModelCreateFormValidationValues = {
    sentence?: ValidationFunction<string>;
    higPitch?: ValidationFunction<string>;
    lowPitch?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LatinDailyModelCreateFormOverridesProps = {
    LatinDailyModelCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    sentence?: PrimitiveOverrideProps<TextFieldProps>;
    higPitch?: PrimitiveOverrideProps<TextFieldProps>;
    lowPitch?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LatinDailyModelCreateFormProps = React.PropsWithChildren<{
    overrides?: LatinDailyModelCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LatinDailyModelCreateFormInputValues) => LatinDailyModelCreateFormInputValues;
    onSuccess?: (fields: LatinDailyModelCreateFormInputValues) => void;
    onError?: (fields: LatinDailyModelCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LatinDailyModelCreateFormInputValues) => LatinDailyModelCreateFormInputValues;
    onValidate?: LatinDailyModelCreateFormValidationValues;
} & React.CSSProperties>;
export default function LatinDailyModelCreateForm(props: LatinDailyModelCreateFormProps): React.ReactElement;
