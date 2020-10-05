import React, { useEffect, useRef } from 'react';
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
  const messagesContainerRef = useRef();
  const currentMessages = useSelector(selectCurrentMessages);

  const getHeightMessagesContainer = () => messagesContainerRef.current.clientHeight;
  const setScrollY = (coordY) => messagesContainerRef.current.scrollTo(0, coordY);

  useEffect(() => {
    const messagesContainerHeight = getHeightMessagesContainer();
    setScrollY(messagesContainerHeight);
  }, [currentMessages]);

  return (
    <div ref={messagesContainerRef} className="overflow-auto mb-3 pr-3">
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
