import React from 'react';
import { useField } from 'formik';
import cn from 'classnames';

const TextField = ({
  name, disabled, autoFocus, isInvalid, className, forwardRef = null,
}) => {
  const [field, meta] = useField({ name });

  return (
    <>
      <input
        {...field}
        name={name}
        disabled={disabled}
        autoFocus={autoFocus}
        ref={forwardRef}
        className={cn('form-control', className, { 'is-invalid': isInvalid })}
      />
      {isInvalid && (
        <div className="d-block mb-2 invalid-feedback">
          {meta.error}
        </div>
      )}
    </>
  );
};

export default TextField;
