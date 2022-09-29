import {
  FormField,
  FormFieldValidatorFn,
  FormFieldValidatorFnWithParamsObject,
  GenericTypeOfFormField,
  PwdField,
} from './models'

/**
 * Indicates if FormField's value or error has changed.
 * @param {FormField} ff1 - First FormField.
 * @param {FormField} ff2 - Second FormField.
 * @returns {boolean}
 */
export function isFormFieldUpdated<T>(ff1: FormField<T>, ff2: FormField<T>): boolean {
  return ff1.val !== ff2.val || ff1.err !== ff2.err
}

/**
 * Indicates if passed param is FormField object.
 * @param {any} field - Field to check.
 * @returns {boolean}
 */
export function isFormField(field: any): boolean {
  return field && typeof field.validators !== 'undefined'
}

/**
 * Creates FormField object.
 * @param {T} val - Initial value for FormField.
 * @param {Array<FormFieldValidatorFn<T> | FormFieldValidatorFnWithParamsObject<T>>} [validators] - Array of validators.
 * @param {boolean} [noValidate] - If true, FormField will not be validated.
 * @returns {FormField}
 */
export function createFormField<T>(
  val: T,
  validators?: (FormFieldValidatorFn<T> | FormFieldValidatorFnWithParamsObject<T>)[],
  noValidate?: boolean,
): FormField<T> {
  return {
    val,
    initialVal: val,
    err: '',
    validators: validators || [],
    noValidate: noValidate || false,
    touched: false,
  }
}

/**
 * Creates PwdField object.
 * @param {string} val - Initial value for PwdField.
 * @param {Array<FormFieldValidatorFn<string> | FormFieldValidatorFnWithParamsObject<string>>} [validators] - Array
 * of validators.
 * @param {boolean} [noValidate] - If true, FormField will not be validated.
 * @returns {PwdField}
 */
export function createPasswordFormField(
  val: string,
  validators?: (FormFieldValidatorFn<string> | FormFieldValidatorFnWithParamsObject<string>)[],
  noValidate?: boolean,
): PwdField {
  return { ...createFormField(val, validators, noValidate), peek: false }
}

/**
 * Converts all FormFields in passed object into {[key]: value}
 * @param {Object} form - Form.
 * @returns {Object}
 */
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

/**
 * Toggles noValidate on FormField.
 * @param {string} key - Key of FormField.
 * @param {FormField} field - FormField.
 * @param {Object} fieldsToSetValidation.
 * @returns {FormField}
 */
export function setNoValidate<T>(key: string, field: FormField<T>, fieldsToSetValidation) {
  const shouldValidate = fieldsToSetValidation[key]
  return { ...field, ...(typeof shouldValidate !== 'undefined' && { noValidate: !shouldValidate }) }
}

/**
 * Toggles noValidate on Form
 * @param {Object} form - Form with FormFields.
 * @param {Object} fieldsToSetValidation.
 * @returns {Object}
 */
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

/**
 * Changes FormField value.
 * @param {string} formToChange - Form.
 * @param {string} fieldName - Key of FormField in form.
 * @param {GenericTypeOfFormField<U>} value - Value to change
 * @returns {Object}
 */
export function changeFormValue<T, A extends keyof T, U extends T[A]>(
  formToChange: T,
  fieldName: A | string,
  value: GenericTypeOfFormField<U>,
): T {
  const fieldNameArr: string[] = typeof fieldName === 'string' ? fieldName.split('.') : [fieldName as unknown as string]
  const firstKey = fieldNameArr.shift()
  return Object.keys(formToChange).reduce((prev: T, key) => {
    const field = formToChange[key]
    if (key !== firstKey || typeof field !== 'object') {
      return prev
    }
    return isFormField(field)
      ? // tslint:disable-next-line prefer-object-spread
      Object.assign({}, prev, { [key]: { ...prev[key], val: value, err: '', touched: true } })
      : // tslint:disable-next-line prefer-object-spread
      Object.assign({}, prev, { [key]: changeFormValue(field, fieldNameArr.join('.'), value) })
  }, formToChange)
}

/**
 * Indicated if any value in form is different than initial value.
 * @param {Object} formToCheck - Form.
 * @returns {boolean}
 */
export function formHasChanged(formToCheck): boolean {
  return Object.keys(formToCheck).some((key) => {
    const field = formToCheck[key]
    if (typeof field !== 'object') {
      return false
    }
    return isFormField(field) ? formFieldHasChanged(formToCheck[key]) : formHasChanged(field)
  })
}

/**
 * Indicated if FormField value is different than initial value.
 * @param {FormField} formField - FormField.
 * @returns {boolean}
 */
export function formFieldHasChanged(formField: FormField<any>): boolean {
  return formField.val !== formField.initialVal
}

/**
 * Indicated if form has error.
 * @param {Object} formToCheck - Form.
 * @returns {boolean}
 */
export function formHasError(formToCheck): boolean {
  return Object.keys(formToCheck).some((key) => {
    const field = formToCheck[key]
    if (typeof field !== 'object') {
      return false
    }
    return isFormField(field) ? formToCheck[key].err !== '' : formHasError(field)
  })
}

/**
 * Validates FormFields in form.
 * @param {Object} formToValidate - Form.
 * @returns {Object}
 */
export function validateForm<T extends object>(formToValidate: T): T {
  return Object.keys(formToValidate).reduce((prev: T, key) => {
    const field = formToValidate[key]
    if (typeof field !== 'object') {
      return prev
    }
    return isFormField(field)
      ? // tslint:disable-next-line prefer-object-spread
      Object.assign({}, prev, { [key]: validateFormField(field) })
      : // tslint:disable-next-line prefer-object-spread
      Object.assign({}, prev, { [key]: validateForm(field) })
  }, formToValidate)
}

/**
 * Validates FormField.
 * @param {FormField} formField - FormField.
 * @returns {FormField}
 */
export function validateFormField<T>(formField: FormField<T>): FormField<T> {
  const err = formField.noValidate
    ? ''
    : formField.validators.reduce((error, validator) => {
      if (error) {
        return error
      }
      return typeof validator === 'function'
        ? validator(formField.val)
        : validator.validator(validator.params())(formField.val)
    }, '')
  return { ...formField, err }
}

/**
 * Validates one specified FormField in form.
 * @param {Object} formToValidate - Form.
 * @param {string} fieldName - Key of FormField to validate.
 * @returns {Object}
 */
export function validateOneFormField<T extends object, U extends keyof T>(formToValidate: T, fieldName: U): T {
  const field = formToValidate[fieldName] as any
  if (typeof field !== 'object') {
    return formToValidate
  }
  // tslint:disable-next-line prefer-object-spread
  return Object.assign({}, formToValidate, { [fieldName]: validateFormField(field) })
}
