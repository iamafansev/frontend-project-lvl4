import React from 'react';
import faker from 'faker';
import cookies from 'js-cookie';
import isEmpty from 'lodash/isEmpty';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  // eslint-disable-next-line functional/no-let
  let nickname = cookies.get('nickname');

  if (isEmpty(nickname)) {
    nickname = faker.name.findName();
    cookies.set('nickname', nickname);
  }

  return (
    <UserContext.Provider value={{ nickname }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
