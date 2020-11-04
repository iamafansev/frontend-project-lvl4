import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { openModal } from '../redux/slices/modal';
import ChannelItem from './ChannelItem';
import { getChannels } from '../redux/slices/channels';

const ChannelList = () => {
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const handleClickOpenModal = useCallback((params) => () => dispatch(openModal(params)), []);

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

export default memo(ChannelList);
