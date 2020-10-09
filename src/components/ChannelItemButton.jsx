import React from 'react';
import cn from 'classnames';
import Button from 'react-bootstrap/Button';

const ChannelItemButton = ({
  text, isCurrent, isDense = false, handleClick,
}) => (
  <Button
    type="button"
    block
    className={cn('text-left', { 'mb-2': !isDense })}
    variant={isCurrent ? 'primary' : 'light'}
    onClick={handleClick}
  >
    {text}
  </Button>
);

export default ChannelItemButton;
