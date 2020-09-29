import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

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

  const handleAddChannel = () => dispatch(openModal({ type: 'addChannel' }));
  const handleClickChannel = (id) => () => dispatch(setCurrentChannelId(id));

  return (
    <>
      <div className="d-flex mb-2">
        <span>Channels</span>
        <Button className="ml-auto p-0" variant="link" onClick={handleAddChannel}>+</Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => (
          <li key={id} className="nav-item">
            <Button
              type="button"
              block
              className="mb-2 text-left"
              variant={id === currentChannelId ? 'primary' : 'light'}
              onClick={handleClickChannel(id)}
            >
              {name}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelList;
