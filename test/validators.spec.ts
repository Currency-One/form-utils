import { createFormField, formHasError, validateForm, validateOneFormField } from '../lib'

describe('validators', () => {
  const getSampleForm = () => ({
    field1: createFormField('PLN', []),
    field2: createFormField('', [() => '']),
    field3: createFormField('', [() => 'not valid']),
    field4: createFormField(false, [() => 'not valid']),
    field5: {
      subfield1: createFormField('', []),
      subfield2: createFormField('', [() => 'not valid']),
      subfield3: createFormField('', [() => 'not valid'], true),
    },
    field6: 'field6',
    field7: createFormField('', [
      {
        validator: () => () => 'not valid',
        params: () => ({}),
      },
    ]),
    field8: createFormField('', [
      {
        validator: () => () => '',
        params: () => ({}),
      },
    ]),
  })

  it('should validateForm() validate correctly', () => {
    const form = getSampleForm()
    const validate = validateForm(form)

    expect(typeof validate).toEqual(typeof form)
    expect(validate.field1.err).toHaveLength(0)
    expect(validate.field2.err).toHaveLength(0)
    expect(validate.field3.err).not.toHaveLength(0)
    expect(validate.field4.err).not.toHaveLength(0)
    expect(validate.field5.subfield1.err).toHaveLength(0)
    expect(validate.field5.subfield2.err).not.toHaveLength(0)
    expect(validate.field5.subfield3.err).toHaveLength(0)
    expect(validate.field6).toEqual(form.field6)
    expect(validate.field7.err).not.toHaveLength(0)
    expect(validate.field8.err).toHaveLength(0)
  })

  it('should formHasError() return correct value', () => {
    const form = getSampleForm()
    const validate = validateForm(form)

    expect(formHasError(form)).toBeFalsy()
    expect(formHasError(validate)).toBeTruthy()
  })

  it('should validateOneFormField() validate correctly', () => {
    const form = getSampleForm()
    const validate = validateOneFormField(form, 'field3')

    expect(typeof validate).toEqual(typeof form)
    expect(validate.field1.err).toHaveLength(0)
    expect(validate.field2.err).toHaveLength(0)
    expect(validate.field3.err).not.toHaveLength(0)
    expect(validate.field4.err).toHaveLength(0)
    expect(validate.field5.subfield1.err).toHaveLength(0)
    expect(validate.field5.subfield2.err).toHaveLength(0)
    expect(validate.field5.subfield3.err).toHaveLength(0)
    expect(validate.field6).toEqual(form.field6)
    expect(validate.field7.err).toHaveLength(0)
    expect(validate.field8.err).toHaveLength(0)
  })
})
