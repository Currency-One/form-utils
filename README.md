# form-utils

[![npm version](https://img.shields.io/npm/v/@currency-one/form-utils.svg)](https://www.npmjs.com/package/@currency-one/form-utils)

Typescript form utilities

### Models:
```
export declare type FormFieldValidatorFn<T> = (value: T) => string;
export declare type FormFieldValidatorFnWithParams<T> = (params: any) => FormFieldValidatorFn<T>;
export interface FormFieldValidatorFnWithParamsObject<T> {
    validator: FormFieldValidatorFnWithParams<T>;
    params: () => any;
}
export interface FormField<T> {
    val: T;
    initialVal: T;
    err: string;
    validators: Array<FormFieldValidatorFn<T> | FormFieldValidatorFnWithParamsObject<T>>;
    noValidate?: boolean;
    touched: boolean;
}
export interface PwdField extends FormField<string> {
    peek: boolean;
}
export declare type GenericTypeOfFormField<T> = T extends FormField<string> ? string : T extends FormField<string | null> ? string | null : T extends FormField<number> ? number : T extends FormField<boolean> ? boolean : object;
```

### Functions:
```
export declare const isFormField: (field: any) => boolean;
export declare const isFormFieldUpdated: <T>(ff1: FormField<T>, ff2: FormField<T>) => boolean;
export declare const createFormField: <T>(val: T, validators?: (FormFieldValidatorFn<T> | FormFieldValidatorFnWithParamsObject<T>)[], noValidate?: boolean) => FormField<T>;
export declare const createPasswordFormField: (val: string, validators?: (FormFieldValidatorFn<string> | FormFieldValidatorFnWithParamsObject<string>)[], noValidate?: boolean) => PwdField;
export declare function formFieldsToValues<T extends object, U extends {
    [key in keyof T]: any;
}>(form: T): U;
export declare function setNoValidate<T>(key: string, field: FormField<T>, fieldsToSetValidation: any): {
    noValidate: boolean;
    val: T;
    initialVal: T;
    err: string;
    validators: (FormFieldValidatorFn<T> | FormFieldValidatorFnWithParamsObject<T>)[];
    touched: boolean;
};
export declare function changeFormFieldsValidation<T extends object, U extends {
    [key in keyof T]?: any;
}>(form: T, fieldsToSetValidation: U): T;
export declare function changeFormValue<T, A extends keyof T, U extends T[A]>(formToChange: T, fieldName: A | string, value: GenericTypeOfFormField<U>): T;
export declare function formHasChanged(formToCheck: any): boolean;
export declare function formFieldHasChanged(formField: FormField<any>): boolean;
```
