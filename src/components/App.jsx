import React from 'react';

import ChannelList from './ChannelList';

const App = ({ data }) => {
  const { channels, currentChannelId } = data;

  return (
    <div className="row h-100 pb-3">
      <div className="col-3 border-right">
        <ChannelList channels={channels} currentChannelId={currentChannelId} />
      </div>
    </div>
  );
};

export default App;
