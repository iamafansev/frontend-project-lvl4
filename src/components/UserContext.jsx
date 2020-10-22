import React from 'react';
import faker from 'faker';
import cookies from 'js-cookie';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const nickname = cookies.get('nickname') || faker.name.findName();

  if (!nickname) {
    cookies.set('nickname', nickname);
  }

  return (
    <UserContext.Provider value={{ nickname }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
