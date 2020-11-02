import React, { useMemo, useCallback, memo } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import { setCurrentChannelId, getCurrentChannelId } from '../redux/slices/channels';
import { openModal } from '../redux/slices/modal';

const ChannelItem = ({ dispatch, currentChannelId, item: { id, name, removable } }) => {
  const isCurrentChannel = useMemo(() => id === currentChannelId, [id, currentChannelId]);

  const handleClickOpenModal = (type) => () => (
    dispatch(openModal({ type, data: { channelId: id } }))
  );

  const handleClickChannel = useCallback(() => dispatch(setCurrentChannelId(id)), [id]);

  const ChannelItemButton = useCallback(({ isDense = false }) => (
    <Button
      type="button"
      block
      className={cn('text-left', { 'mb-2': !isDense })}
      variant={isCurrentChannel ? 'primary' : 'light'}
      onClick={handleClickChannel}
    >
      {name}
    </Button>
  ), [name, isCurrentChannel, handleClickChannel]);

  const ItemButtonWithDropdown = useCallback(() => (
    <Dropdown as={ButtonGroup} className="d-flex mb-2">
      <ChannelItemButton isDense />
      <Dropdown.Toggle split variant={isCurrentChannel ? 'primary' : 'light'} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={handleClickOpenModal('removeChannel')}
        >
          Remove
        </Dropdown.Item>
        <Dropdown.Item
          onClick={handleClickOpenModal('renameChannel')}
        >
          Rename
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ), [handleClickOpenModal, handleClickOpenModal]);

  return (
    <li className="nav-item">
      {removable
        ? <ItemButtonWithDropdown />
        : (
          <ChannelItemButton />
        )}
    </li>
  );
};

export default connect((state) => ({
  currentChannelId: getCurrentChannelId(state),
}))(memo(ChannelItem));
