import React from 'react';
import cn from 'classnames';

const InvalidFeedback = ({ message, className }) => (
  <div className={cn('d-block', 'invalid-feedback', className)}>{message}</div>
);

export default InvalidFeedback;
