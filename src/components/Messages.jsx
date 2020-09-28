import React from 'react';
import { useSelector } from 'react-redux';

const selectCurrentMessages = (state) => {
  const {
    channels: { currentChannelId },
    messages: { list: messageList },
  } = state;

  return messageList.filter(({ channelId }) => channelId === currentChannelId);
};

const Messages = () => {
  const currentMessages = useSelector(selectCurrentMessages);

  return (
    <div className="chat-messages overflow-auto mb-3">
      {currentMessages.map(({ id, nickname, body }) => (
        <div key={id}>
          <b>{nickname}</b>
          {': '}
          {body}
        </div>
      ))}
    </div>
  );
};

export default Messages;
