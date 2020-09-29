import React from 'react';
import { useSelector } from 'react-redux';

import ModalAddChannel from './ModalAddChannel';
import ModalRenameChannel from './ModalRenameChannel';

const Modal = () => {
  const { isOpened, type } = useSelector(({ modal }) => modal);

  if (!isOpened) {
    return null;
  }

  switch (type) {
    case 'addChannel':
      return <ModalAddChannel />;
    case 'renameChannel':
      return <ModalRenameChannel />;
    default:
      return null;
  }
};

export default Modal;
