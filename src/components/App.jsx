import React from 'react';

import ChannelList from './ChannelList';
import Messages from './Messages';
import MessageForm from './MessageForm';
import Modal from './Modal';

const App = () => (
  <>
    <div className="row h-100 pb-3">
      <div className="col-3 border-right overflow-auto mh-100">
        <ChannelList />
      </div>
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <Messages />
          <div className="mt-auto">
            <MessageForm />
          </div>
        </div>
      </div>
    </div>
    <Modal />
  </>
);

export default App;
