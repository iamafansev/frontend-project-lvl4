import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

import modalSlice from '../redux/slices/modal';
import ChannelItem from './ChannelItem';

const { actions: { openModal } } = modalSlice;

const ChannelList = () => {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => ({
    channels: state.channels.list,
  }));

  const handleClickOpenModal = (params) => () => dispatch(openModal(params));

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
        {channels.map((item) => <ChannelItem key={item.id} item={item} />)}
      </ul>
    </>
  );
};

export default ChannelList;
