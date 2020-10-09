import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import channelsSlice from '../redux/slices/channels';
import modalSlice from '../redux/slices/modal';
import ChannelItemButton from './ChannelItemButton';

const { actions: { setCurrentChannelId } } = channelsSlice;
const { actions: { openModal } } = modalSlice;

const ChannelItem = ({ item: { id, name, removable } }) => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => ({
    channels: state.channels.list,
    currentChannelId: state.channels.currentChannelId,
  }));

  const handleClickOpenModal = (type) => () => (
    dispatch(openModal({ type, data: { channelId: id } }))
  );
  const handleClickChannel = () => dispatch(setCurrentChannelId(id));

  const ItemButtonWithDropdown = () => (
    <Dropdown as={ButtonGroup} className="d-flex mb-2">
      <ChannelItemButton
        text={name}
        isCurrent={id === currentChannelId}
        handleClick={handleClickChannel}
        isDense
      />
      <Dropdown.Toggle split variant={id === currentChannelId ? 'primary' : 'light'} />
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
        ? <ItemButtonWithDropdown isDense />
        : (
          <ChannelItemButton
            text={name}
            isCurrent={id === currentChannelId}
            handleClick={handleClickChannel}
          />
        )}
    </li>
  );
};

export default ChannelItem;
