import React, { useCallback } from 'react';
import { useField } from 'formik';
import cn from 'classnames';
import trimStart from 'lodash/trimStart';
import last from 'lodash/last';

import InvalidFeedback from './InvalidFeedback';

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
      <input
        {...restFieldProps}
        name={name}
        disabled={disabled}
        autoFocus={autoFocus}
        ref={forwardRef}
        onChange={handleOnChange}
        className={cn('form-control', className, { 'is-invalid': isInvalid })}
      />
      {isInvalid && <InvalidFeedback className="mb-2" message={meta.error} />}
    </>
  );
};

export default TextField;
