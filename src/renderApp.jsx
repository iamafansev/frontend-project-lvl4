import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { UserProvider } from './components/UserContext';
import App from './components/App';

const renderApp = (store) => {
  ReactDOM.render(
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default renderApp;
