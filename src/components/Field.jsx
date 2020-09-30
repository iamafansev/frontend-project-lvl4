import React from 'react';
import { useField } from 'formik';

const TextField = (props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="d-block mb-2 invalid-feedback">
          {meta.error}
        </div>
      )}
    </>
  );
};

export default TextField;
