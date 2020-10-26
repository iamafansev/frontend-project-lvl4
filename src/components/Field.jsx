import React, { useCallback, memo } from 'react';
import { useField } from 'formik';
import trimStart from 'lodash/trimStart';
import last from 'lodash/last';
import Form from 'react-bootstrap/Form';

const TextField = ({
  name, disabled, autoFocus, isInvalid, className, forwardRef = null,
}) => {
  const [{ onChange, ...restFieldProps }, meta] = useField({ name });

  const handleOnChange = useCallback((e) => {
    const { target: { value } } = e;

    if (last(value) === ' ') {
      const trimmedFirstValue = trimStart(value);
      e.target.value = trimmedFirstValue.replace(/\s+/g, ' ');
    }

    return onChange(e);
  }, []);

  return (
    <>
      <Form.Control
        {...restFieldProps}
        name={name}
        disabled={disabled}
        autoFocus={autoFocus}
        ref={forwardRef}
        onChange={handleOnChange}
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
