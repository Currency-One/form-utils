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

export const isFormField = (field: any): boolean => field && typeof field.validators !== 'undefined'

export const isFormFieldUpdated = <T>(ff1: FormField<T>, ff2: FormField<T>): boolean =>
  ff1.val !== ff2.val || ff1.err !== ff2.err

export const createFormField = <T>(
  val: T,
  validators?: Array<FormFieldValidatorFn<T> | FormFieldValidatorFnWithParamsObject<T>>,
  noValidate?: boolean,
): FormField<T> => ({
  val,
  initialVal: val,
  err: '',
  validators: validators || [],
  noValidate: noValidate || false,
  touched: false,
})

export const createPasswordFormField = (
  val: string,
  validators?: Array<FormFieldValidatorFn<string> | FormFieldValidatorFnWithParamsObject<string>>,
  noValidate?: boolean,
): PwdField => ({ ...createFormField(val, validators, noValidate), peek: false })

export function formFieldsToValues<T extends object, U extends { [key in keyof T]: any }>(form: T): U {
  return Object.keys(form).reduce((prev, key) => {
    const field = form[key]
    if (typeof field !== 'object') {
      return { ...prev, [key]: field }
    }
    return isFormField(field)
      ? // tslint:disable-next-line prefer-object-spread
        Object.assign({}, prev, { [key]: field.val })
      : // tslint:disable-next-line prefer-object-spread
        Object.assign({}, prev, { [key]: formFieldsToValues(field) })
  }, {}) as U
}

export function setNoValidate<T>(key: string, field: FormField<T>, fieldsToSetValidation) {
  const shouldValidate = fieldsToSetValidation[key]
  return { ...field, ...(typeof shouldValidate !== 'undefined' && { noValidate: !shouldValidate }) }
}

export function changeFormFieldsValidation<T extends object, U extends { [key in keyof T]?: any }>(
  form: T,
  fieldsToSetValidation: U,
): T {
  return Object.keys(form).reduce((prev, key) => {
    const field = form[key]
    if (typeof field !== 'object') {
      return prev
    }
    return isFormField(field)
      ? // tslint:disable-next-line prefer-object-spread
        Object.assign({}, prev, { [key]: setNoValidate(key, field, fieldsToSetValidation) })
      : // tslint:disable-next-line prefer-object-spread
        Object.assign({}, prev, { [key]: changeFormFieldsValidation(field, fieldsToSetValidation[key] || {}) })
  }, form)
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

export function changeFormValue<T, A extends keyof T, U extends T[A]>(
  formToChange: T,
  fieldName: A | string,
  value: GenericTypeOfFormField<U>,
): T {
  const fieldNameArr: string[] = typeof fieldName === 'string' ? fieldName.split('.') : [fieldName as string]
  const firstKey = fieldNameArr.shift()
  return Object.keys(formToChange).reduce((prev: T, key) => {
    const field = formToChange[key]
    if (key !== firstKey || typeof field !== 'object') {
      return prev
    }
    return isFormField(field)
      ? // tslint:disable-next-line prefer-object-spread
        Object.assign({}, prev, { [key]: { ...prev[key], val: value, err: '' } })
      : // tslint:disable-next-line prefer-object-spread
        Object.assign({}, prev, { [key]: changeFormValue(field, fieldNameArr.join('.'), value) })
  }, formToChange)
}

export function formHasChanged(formToCheck): boolean {
  return Object.keys(formToCheck).some((key) => {
    const field = formToCheck[key]
    if (typeof field !== 'object') {
      return false
    }
    return isFormField(field) ? formFieldHasChanged(formToCheck[key]) : formHasChanged(field)
  })
}

export function formFieldHasChanged(formField: FormField<any>): boolean {
  return formField.val !== formField.initialVal
}
