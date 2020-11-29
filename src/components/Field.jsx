/* eslint-disable no-param-reassign */
import React, { memo, useRef } from 'react';
import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import trimStart from 'lodash/trimStart';
import trimEnd from 'lodash/trimEnd';
import cond from 'lodash/cond';

const isTextType = (type) => type === 'text';
const isEmailType = (type) => type === 'email';

const filterEmailValue = (value) => value.replace(/\s+/g, '');
const filterTextValue = (value) => {
  const trimmedFirstValue = trimStart(value);
  return trimmedFirstValue.replace(/\s+/g, ' ');
};

export const filterValue = cond([
  [isEmailType, () => filterEmailValue],
  [isTextType, () => filterTextValue],
]);

const TextField = ({
  name, type, disabled, autoFocus, isInvalid, className, forwardRef = null,
}) => {
  const ref = forwardRef || useRef();
  const [{ onChange, onBlur, value }, meta] = useField({ name });

  const handleChange = (event) => {
    const {
      target: { value: targetValue, selectionStart },
    } = event;

    if (isTextType(type) || isEmailType(type)) {
      const nextValue = filterValue(type)(targetValue);
      const lengthDiff = nextValue.length - targetValue.length;

      event.target.value = nextValue;

      // So that the cursor does not jump to the end
      ref.current.selectionStart = selectionStart + lengthDiff;
      ref.current.selectionEnd = selectionStart + lengthDiff;
    }

    onChange(event);
  };

  const handleBlur = (event) => {
    const {
      target: { value: targetValue },
    } = event;

    event.target.value = trimEnd(targetValue);

    onChange(event);
    onBlur(event);
  };

  return (
    <>
      <Form.Control
        name={name}
        value={value}
        type={isEmailType(type) ? 'text' : type} // Native input with type email doesn't support selectionStart/End
        disabled={disabled}
        autoFocus={autoFocus}
        ref={ref}
        onChange={handleChange}
        onBlur={handleBlur}
        isInvalid={isInvalid}
        className={className}
      />
      {meta.touched && meta.error && (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      )}
    </>
  );
};

export default memo(TextField);
