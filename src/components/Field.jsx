import React from 'react';
import { useField } from 'formik';
import cn from 'classnames';

const TextField = ({ isInvalid, ...fieldProps }) => {
  const [field, meta] = useField(fieldProps);

  return (
    <>
      <input
        {...field}
        {...fieldProps}
        className={cn('mb-2', 'form-control', { 'is-invalid': isInvalid })}
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
