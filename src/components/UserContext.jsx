import React from 'react';
import faker from 'faker';
import cookies from 'js-cookie';
import isEmpty from 'lodash/isEmpty';

// eslint-disable-next-line functional/no-let
let nickname = cookies.get('nickname');

if (isEmpty(nickname)) {
  nickname = faker.name.findName();
  cookies.set('nickname', nickname);
}

const UserContext = React.createContext();
const { Consumer } = UserContext;

const UserProvider = ({ children }) => (
  <UserContext.Provider value={{ nickname }}>
    {children}
  </UserContext.Provider>
);

export { UserProvider, Consumer as UserConsumer };
export default UserContext;
