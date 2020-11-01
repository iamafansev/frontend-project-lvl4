import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { UserProvider } from './components/UserContext';
import App from './components/App';

const renderApp = (store, element) => {
  ReactDOM.render(
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>,
    element,
  );
};

export default renderApp;
