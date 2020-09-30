import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

import channelsSlice from '../redux/slices/channels';
import modalSlice from '../redux/slices/modal';

const { actions: { setCurrentChannelId } } = channelsSlice;
const { actions: { openModal } } = modalSlice;

const ChannelList = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => ({
    channels: state.channels.list,
    currentChannelId: state.channels.currentChannelId,
  }));

  const handleClickOpenModal = (params) => () => dispatch(openModal(params));
  const handleClickChannel = (id) => () => dispatch(setCurrentChannelId(id));

  const renderItemButton = ({ id, name, isDense = false }) => (
    <Button
      type="button"
      block
      className={cn('text-left', { 'mb-2': !isDense })}
      variant={id === currentChannelId ? 'primary' : 'light'}
      onClick={handleClickChannel(id)}
    >
      {name}
    </Button>
  );

  const renderItemButtonWithDropdown = ({ id, name }) => (
    <Dropdown as={ButtonGroup} className="d-flex mb-2">
      {renderItemButton({ id, name, isDense: true })}
      <Dropdown.Toggle split variant={id === currentChannelId ? 'primary' : 'light'} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={handleClickOpenModal({ type: 'removeChannel', data: { channelId: id } })}
        >
          Remove
        </Dropdown.Item>
        <Dropdown.Item
          onClick={handleClickOpenModal({ type: 'renameChannel', data: { channelId: id } })}
        >
          Rename
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <>
      <div className="d-flex mb-2">
        <span>Channels</span>
        <Button
          className="ml-auto p-0"
          variant="link"
          onClick={handleClickOpenModal({ type: 'addChannel' })}
        >
          +
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name, removable }) => (
          <li key={id} className="nav-item">
            {removable
              ? renderItemButtonWithDropdown({ id, name, isDense: true })
              : renderItemButton({ id, name })}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelList;
