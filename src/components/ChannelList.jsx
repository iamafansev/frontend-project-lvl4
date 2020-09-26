import React from 'react';
import cn from 'classnames';

const ChannelList = ({ channels, currentChannelId }) => (
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
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  </>
);

export default ChannelList;
