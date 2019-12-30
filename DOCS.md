## Functions

<dl>
<dt><a href="#isFormField">isFormField(field)</a> ⇒ <code>boolean</code></dt>
<dd><p>Indicates if passed param is FormField object.</p></dd>
<dt><a href="#createFormField">createFormField(val, [validators], [noValidate])</a> ⇒ <code>FormField</code></dt>
<dd><p>Creates FormField object.</p></dd>
<dt><a href="#createPasswordFormField">createPasswordFormField(val, [validators], [noValidate])</a> ⇒ <code>PwdField</code></dt>
<dd><p>Creates PwdField object.</p></dd>
<dt><a href="#formFieldsToValues">formFieldsToValues(form)</a> ⇒ <code>Object</code></dt>
<dd><p>Converts all FormFields in passed object into {[key]: value}</p></dd>
<dt><a href="#setNoValidate">setNoValidate(key, field)</a> ⇒ <code>FormField</code></dt>
<dd><p>Toggles noValidate on FormField.</p></dd>
<dt><a href="#changeFormFieldsValidation">changeFormFieldsValidation(form)</a> ⇒ <code>Object</code></dt>
<dd><p>Toggles noValidate on Form</p></dd>
<dt><a href="#changeFormValue">changeFormValue(formToChange, fieldName, value)</a> ⇒ <code>Object</code></dt>
<dd><p>Changes FormField value.</p></dd>
<dt><a href="#formHasChanged">formHasChanged(formToCheck)</a> ⇒ <code>boolean</code></dt>
<dd><p>Indicated if any value in form is different than initial value.</p></dd>
<dt><a href="#formFieldHasChanged">formFieldHasChanged(formField)</a> ⇒ <code>boolean</code></dt>
<dd><p>Indicated if FormField value is different than initial value.</p></dd>
<dt><a href="#formHasError">formHasError(formToCheck)</a> ⇒ <code>boolean</code></dt>
<dd><p>Indicated if form has error.</p></dd>
<dt><a href="#validateForm">validateForm(formToValidate)</a> ⇒ <code>Object</code></dt>
<dd><p>Validates FormFields in form.</p></dd>
<dt><a href="#validateFormField">validateFormField(formField)</a> ⇒ <code>FormField</code></dt>
<dd><p>Validates FormField.</p></dd>
</dl>

<a name="isFormField"></a>

## isFormField(field) ⇒ <code>boolean</code>
<p>Indicates if passed param is FormField object.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>any</code> | <p>Field to check.</p> |

<a name="createFormField"></a>

## createFormField(val, [validators], [noValidate]) ⇒ <code>FormField</code>
<p>Creates FormField object.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>T</code> | <p>Initial value for FormField.</p> |
| [validators] | <code>Array.&lt;(FormFieldValidatorFn.&lt;T&gt;\|FormFieldValidatorFnWithParamsObject.&lt;T&gt;)&gt;</code> | <p>Array of validators.</p> |
| [noValidate] | <code>boolean</code> | <p>If true, FormField will not be validated.</p> |

<a name="createPasswordFormField"></a>

## createPasswordFormField(val, [validators], [noValidate]) ⇒ <code>PwdField</code>
<p>Creates PwdField object.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | <p>Initial value for PwdField.</p> |
| [validators] | <code>Array.&lt;(FormFieldValidatorFn.&lt;string&gt;\|FormFieldValidatorFnWithParamsObject.&lt;string&gt;)&gt;</code> | <p>Array of validators.</p> |
| [noValidate] | <code>boolean</code> | <p>If true, FormField will not be validated.</p> |

<a name="formFieldsToValues"></a>

## formFieldsToValues(form) ⇒ <code>Object</code>
<p>Converts all FormFields in passed object into {[key]: value}</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| form | <code>Object</code> | <p>Form.</p> |

<a name="setNoValidate"></a>

## setNoValidate(key, field) ⇒ <code>FormField</code>
<p>Toggles noValidate on FormField.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Key of FormField.</p> |
| field | <code>FormField</code> | <p>FormField.</p> |
| fieldsToSetValidation. | <code>Object</code> |  |

<a name="changeFormFieldsValidation"></a>

## changeFormFieldsValidation(form) ⇒ <code>Object</code>
<p>Toggles noValidate on Form</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| form | <code>Object</code> | <p>Form with FormFields.</p> |
| fieldsToSetValidation. | <code>Object</code> |  |

<a name="changeFormValue"></a>

## changeFormValue(formToChange, fieldName, value) ⇒ <code>Object</code>
<p>Changes FormField value.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| formToChange | <code>string</code> | <p>Form.</p> |
| fieldName | <code>string</code> | <p>Key of FormField in form.</p> |
| value | <code>GenericTypeOfFormField.&lt;U&gt;</code> | <p>Value to change</p> |

<a name="formHasChanged"></a>

## formHasChanged(formToCheck) ⇒ <code>boolean</code>
<p>Indicated if any value in form is different than initial value.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| formToCheck | <code>Object</code> | <p>Form.</p> |

<a name="formFieldHasChanged"></a>

## formFieldHasChanged(formField) ⇒ <code>boolean</code>
<p>Indicated if FormField value is different than initial value.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| formField | <code>FormField</code> | <p>FormField.</p> |

<a name="formHasError"></a>

## formHasError(formToCheck) ⇒ <code>boolean</code>
<p>Indicated if form has error.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| formToCheck | <code>Object</code> | <p>Form.</p> |

<a name="validateForm"></a>

## validateForm(formToValidate) ⇒ <code>Object</code>
<p>Validates FormFields in form.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| formToValidate | <code>Object</code> | <p>Form.</p> |

<a name="validateFormField"></a>

## validateFormField(formField) ⇒ <code>FormField</code>
<p>Validates FormField.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| formField | <code>FormField</code> | <p>FormField.</p> |

