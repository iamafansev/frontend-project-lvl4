import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { animateScroll } from 'react-scroll';

import { getCurrentChannelId } from '../redux/slices/channels';
import { getMessagesByChannelId } from '../redux/slices/messages';

const MESSAGES_CONTAINER_ID = 'messagesContainer';
const scrollMessagesContainerToBottom = () => animateScroll.scrollToBottom({
  duration: 0,
  containerId: MESSAGES_CONTAINER_ID,
});

const Messages = ({ currentMessages }) => {
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

export default connect((state) => {
  const currentChannelId = getCurrentChannelId(state);
  return { currentMessages: getMessagesByChannelId(currentChannelId)(state) };
})(memo(Messages));
