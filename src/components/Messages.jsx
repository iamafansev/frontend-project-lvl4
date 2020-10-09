import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';

const MESSAGES_CONTAINER_ID = 'messagesContainer';
const scrollMessagesContainerToBottom = () => animateScroll.scrollToBottom({
  duration: 0,
  containerId: MESSAGES_CONTAINER_ID,
});

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

  useEffect(() => {
    scrollMessagesContainerToBottom();
  }, [currentMessages]);

  return (
    <div className="overflow-auto mb-3 pr-3" id={MESSAGES_CONTAINER_ID}>
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
