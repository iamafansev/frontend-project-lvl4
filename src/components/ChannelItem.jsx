import React, { memo } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import { setCurrentChannelId } from '../redux/slices/channels';
import { openModal } from '../redux/slices/modal';

const ChannelItem = ({ item: { id, name, removable } }) => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => ({
    currentChannelId: state.channels.currentChannelId,
  }));
  const isCurrentChannel = id === currentChannelId;

  const handleClickOpenModal = (type) => () => (
    dispatch(openModal({ type, data: { channelId: id } }))
  );
  const handleClickChannel = () => dispatch(setCurrentChannelId(id));

  const ChannelItemButton = ({ isDense = false }) => (
    <Button
      type="button"
      block
      className={cn('text-left', { 'mb-2': !isDense })}
      variant={isCurrentChannel ? 'primary' : 'light'}
      onClick={handleClickChannel}
    >
      {name}
    </Button>
  );

  const ItemButtonWithDropdown = () => (
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
  );

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

export default memo(ChannelItem);
