# Form-utils

[![npm version](https://img.shields.io/npm/v/@currency-one/form-utils.svg)](https://www.npmjs.com/package/@currency-one/form-utils)
![](https://github.com/Currency-One/form-utils/workflows/Node%20CI/badge.svg)
[![License](https://img.shields.io/npm/l/@currency-one/form-utils.svg)](https://github.com/Currency-One/form-utils/blob/master/LICENSE.md)

This is typescript package of form utilities

## Installation

To install run:
```
npm i @currency-one/form-utils
```
or

```
yarn add @currency-one/form-utils
```

Basic usage with React and build systems (webpack, parcel etc.):

```js
import {
  changeFormValue,
  createFormField,
  createPasswordFormField,
  FormField,
  formHasError,
  GenericTypeOfFormField,
  PwdField,
  validateForm,
  FormFieldValidatorFn,
} from '@currency-one/form-utils'

export const notEmptyValidator: FormFieldValidatorFn<string> = (value) => {
  return value === '' ? 'This field cant be empty' : ''
}

export interface LoginForm {
  email: FormField<string>
  password: PwdField
}

export interface LoginViewState {
  loginForm: LoginForm
}

export default class LoginFormView extends Component<{}, LoginViewState> {
  public constructor(props) {
    super(props)

    this.state = {
      loginForm: {
        email: createFormField('', [notEmptyValidator]),
        password: createPasswordFormField('', [notEmptyValidator]),
      },
    }
  }

  public render() {
    return (
      <form id="login-form" name="login-form" method="POST" onSubmit={this.handleSubmit}>
        <div className="login__fieldset">
          <input
            type={'username'}
            name={'username'}
            value={this.state.loginForm.email.val}
            onChange={this.handleEmail}
          />
          {this.state.loginForm.email.err && (
            <div className={'error'}>{this.state.loginForm.email.err}</div>
          )}
        </div>
        <div className="login__fieldset">
          <input
            type={'password'}
            name={'password'}
            value={this.state.loginForm.password.val}
            onChange={this.handlePassword}
          />
          {this.state.loginForm.password.err && (
            <div className={'error'}>{this.state.loginForm.password.err}</div>
          )}
        </div>
        <div className="login__submit">
          <button type="submit">Login</button>
        </div>
      </form>
    )
  }

  public changeFormValue<T extends keyof LoginForm, U extends LoginForm[T]>(
    fieldName: T,
    value: GenericTypeOfFormField<U>,
  ) {
    this.setState({ loginForm: changeFormValue(this.state.loginForm, fieldName, value) })
  }

  public handleEmail = (event): void => {
    this.changeFormValue('email', event.target.value.trim())
  }

  public handlePassword = (event): void => {
    this.changeFormValue('password', event.target.value)
  }

  public formHasErrors = (): boolean => formHasError(this.state.loginForm)

  public validateForm = (): LoginForm => validateForm(this.state.loginForm)

  public handleSubmit = (event): void => {
    event.preventDefault()

    const loginFormValidated = this.validateForm()
    this.setState(
      {
        loginForm: loginFormValidated,
      },
      () => !this.formHasErrors() && this.submitLogin(),
    )
  }

  public submitLogin = async (): Promise<void> => {
    // Submit form
  }
}
```

## Documentation

See [documentation](DOCS.md) for more details
