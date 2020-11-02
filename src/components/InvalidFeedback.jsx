import React, { memo } from 'react';
import cn from 'classnames';

const InvalidFeedback = ({ message, className }) => (
  <div className={cn('d-block', 'invalid-feedback', className)}>{message}</div>
);

export default memo(InvalidFeedback);
