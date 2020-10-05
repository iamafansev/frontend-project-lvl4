import React from 'react';
import { useSelector } from 'react-redux';

const selectCurrentMessages = (state) => {
  const {
    channels: { currentChannelId },
    messages: { list: messages },
  } = state;

  return messages
    .filter(({ channelId }) => channelId === currentChannelId);
};

const Messages = () => {
  const currentMessages = useSelector(selectCurrentMessages);

  return (
    <div className="overflow-auto mb-3">
      {currentMessages.map(({ id, nickname, body }) => (
        <div key={id} className="text-break">
          <b>{nickname}</b>
          {': '}
          {body}
        </div>
      ))}
    </div>
  );
};

export default Messages;
