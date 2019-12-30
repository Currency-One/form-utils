export type FormFieldValidatorFn<T> = (value: T) => string

export type FormFieldValidatorFnWithParams<T> = (params: any) => FormFieldValidatorFn<T>

export interface FormFieldValidatorFnWithParamsObject<T> {
  validator: FormFieldValidatorFnWithParams<T>
  params: () => any
}

export interface FormField<T> {
  val: T
  initialVal: T
  err: string
  validators: Array<FormFieldValidatorFn<T> | FormFieldValidatorFnWithParamsObject<T>>
  noValidate?: boolean
  touched: boolean
}

export interface PwdField extends FormField<string> {
  peek: boolean
}

export type GenericTypeOfFormField<T> = T extends FormField<string>
  ? string
  : T extends FormField<string | null>
    ? string | null
    : T extends FormField<number>
      ? number
      : T extends FormField<boolean>
        ? boolean
        : object
