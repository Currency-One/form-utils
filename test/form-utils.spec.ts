import {
  changeFormFieldsValidation,
  changeFormValue, changeFormValues,
  createFormField,
  createPasswordFormField,
  formFieldsToValues, isForm,
  isFormField, isFormFieldValueUpdated,
} from '../lib/form-utils'

describe('form-utils', () => {
  it('should isForm() return correct value', () => {
    const formField = createFormField('')

    expect(isForm(null)).toBe(false)
    expect(isForm(undefined)).toBe(false)
    expect(isForm('')).toBe(false)
    expect(isForm('string')).toBe(false)
    expect(isForm(['string'])).toBe(false)
    expect(isForm({})).toBe(false)
    expect(isForm({ field1: formField, field2: 'string' })).toBe(false)
    expect(isForm({ field1: formField, field2: null })).toBe(false)
    expect(isForm({ field1: formField, field2: null, field3: formField })).toBe(false)
    expect(isForm({ field1: formField, field2: { subfield1: formField, subfield2: 'string' } })).toBe(false)
    expect(isForm({ field1: formField, field2: { subfield1: formField, subfield2: { subfield1: 'string' } } })).toBe(false)
    expect(isForm({ field1: formField })).toBe(true)
    expect(isForm({ field1: formField, field2: formField })).toBe(true)
    expect(isForm({ field1: formField, field2: { subfield1: formField, subfield2: { subfield1: formField } } })).toBe(true)
  })

  it('should isFormField() return correct value', () => {
    const formField = createFormField('')

    expect(isFormField(null)).toBe(false)
    expect(isFormField(undefined)).toBe(false)
    expect(isFormField('')).toBe(false)
    expect(isFormField('string')).toBe(false)
    expect(isFormField(['string'])).toBe(false)
    expect(isFormField({})).toBe(false)
    expect(isFormField(formField)).toBe(true)
  })

  it('should formFieldsToValues() transform form to object without form fields', () => {
    const form = {
      field1: createFormField('PLN', []),
      field2: createFormField('', [() => '']),
      field3: {
        subfield1: createFormField('', []),
        subfield2: createFormField('text', [() => 'not valid']),
        subfield3: createFormField('', [() => 'not valid'], true),
      },
      field4: 'field4',
      password: createPasswordFormField(''),
    }
    const transformedForm = formFieldsToValues(form)

    expect(typeof transformedForm.field1.err).toBe('undefined')
    expect(typeof transformedForm.field1).toBe('string')
    expect(transformedForm.field1).toEqual('PLN')
    expect(transformedForm.field2).toEqual('')
    expect(typeof transformedForm.field3.subfield1.err).toBe('undefined')
    expect(transformedForm.field3.subfield1).toEqual('')
    expect(transformedForm.field3.subfield2).toEqual('text')
    expect(transformedForm.field4).toEqual(form.field4)
  })

  it('should changeFormFieldsValidation() set noValidate field', () => {
    const form = {
      field1: createFormField('PLN', []),
      field2: createFormField('', []),
      field3: 'string',
      field4: {
        subfield1: createFormField('', []),
        subfield2: createFormField('text', []),
      },
    }
    expect(form.field1.noValidate).toBeFalsy()
    expect(form.field2.noValidate).toBeFalsy()
    expect(form.field4.subfield1.noValidate).toBeFalsy()
    expect(form.field4.subfield2.noValidate).toBeFalsy()

    const formUpdated = changeFormFieldsValidation(form, {
      field1: false,
      field2: true,
      field4: {
        subfield1: false,
        subfield2: true,
      },
    })
    expect(formUpdated.field1.noValidate).toBeTruthy()
    expect(formUpdated.field2.noValidate).toBeFalsy()
    expect(formUpdated.field4.subfield1.noValidate).toBeTruthy()
    expect(formUpdated.field4.subfield2.noValidate).toBeFalsy()
  })

  it('should changeFormValue() change value in form field', () => {
    const form = {
      field1: createFormField('PLN', []),
      field2: createFormField('', []),
      field3: 'string',
      field4: {
        subfield1: createFormField('', []),
        subfield2: createFormField('text', []),
      },
      field5: createFormField<boolean | undefined>(undefined, []),
    }

    expect(form.field1.touched).toBeFalsy()

    let formUpdated = changeFormValue(form, 'field1', 'EUR')
    expect(formUpdated.field1.val).toEqual('EUR')
    expect(formUpdated.field1.touched).toBeTruthy()

    formUpdated = changeFormValue(form, 'field4.subfield1', 'changedText')
    expect(formUpdated.field4.subfield1.val).toEqual('changedText')
    expect(formUpdated.field4.subfield1.touched).toBeTruthy()

    formUpdated = changeFormValue(form, 'field5', true)
    expect(formUpdated.field5.val).toBeTruthy()
    expect(formUpdated.field5.touched).toBeTruthy()
  })

  it('should changeFormValues() change many values in form', () => {
    const form = {
      field1: createFormField('PLN', []),
      field2: createFormField('', []),
      field3: 'string',
      field4: {
        subfield1: createFormField('', []),
        subfield2: createFormField('text', []),
      },
      field5: createFormField<boolean | undefined>(undefined, []),
    }

    expect(form.field1.touched).toBeFalsy()

    const formUpdated = changeFormValues(form, {
      field1: 'EUR',
      field4: {
        subfield1: 'changedText',
      },
      field5: true,
    })
    expect(formUpdated.field1.val).toEqual('EUR')
    expect(formUpdated.field1.touched).toBeTruthy()
    expect(formUpdated.field4.subfield1.val).toEqual('changedText')
    expect(formUpdated.field4.subfield1.touched).toBeTruthy()
    expect(formUpdated.field5.val).toBeTruthy()
    expect(formUpdated.field5.touched).toBeTruthy()
  })

  it('should isFormFieldValueUpdated() return correct value', () => {
    const formField1 = createFormField('')
    const formField2 = createFormField('test')
    const formField3 = createFormField(false)
    const formField4 = createFormField(true)
    const formField5 = createFormField(0)
    const formField6 = createFormField(1)
    const formField7 = createFormField({test: ''})
    const formField8 = createFormField({test: 'test'})
    const formField9 = createFormField('errorTest')
    const formField10 = createFormField('errorTest')
    formField10.err = 'error'

    expect(isFormFieldValueUpdated(formField1, formField1)).toBe(false)
    expect(isFormFieldValueUpdated(formField3, formField3)).toBe(false)
    expect(isFormFieldValueUpdated(formField5, formField5)).toBe(false)
    expect(isFormFieldValueUpdated(formField7, formField7)).toBe(false)

    expect(isFormFieldValueUpdated(formField1, formField2)).toBe(true)
    expect(isFormFieldValueUpdated(formField3, formField4)).toBe(true)
    expect(isFormFieldValueUpdated(formField5, formField6)).toBe(true)
    expect(isFormFieldValueUpdated(formField7, formField8)).toBe(true)

    expect(isFormFieldValueUpdated(formField9, formField10)).toBe(false)
  })
})
