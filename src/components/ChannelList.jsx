import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import channelsSlice from '../redux/slices/channels';

const { actions: { setCurrentChannelId } } = channelsSlice;

const ChannelList = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => ({
    channels: state.channels.list,
    currentChannelId: state.channels.currentChannelId,
  }));

  const handleClickChannel = (id) => () => dispatch(setCurrentChannelId(id));

  return (
    <>
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => (
          <li key={id} className="nav-item">
            <button
              type="button"
              className={cn('nav-link', 'btn-block', 'mb-2', 'text-left', 'btn', {
                'btn-primary': id === currentChannelId,
                'btn-light': id !== currentChannelId,
              })}
              onClick={handleClickChannel(id)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelList;
