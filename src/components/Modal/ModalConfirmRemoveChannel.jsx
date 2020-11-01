import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { ERRORS } from '../../constants';
import { removeChannelAsync } from '../../redux/slices/channels';
import { closeModal } from '../../redux/slices/modal';
import InvalidFeedback from '../InvalidFeedback';

const ModalConfirmRemoveChannel = () => {
  const [submittingError, setSubmittingError] = useState(null);
  const dispatch = useDispatch();
  const id = useSelector(({ modal: { data } }) => data.channelId);

  const handleClose = () => dispatch(closeModal());

  const handleConfirmDelete = async () => {
    try {
      const resultAction = await dispatch(removeChannelAsync(id));
      unwrapResult(resultAction);
      handleClose();
    } catch (error) {
      setSubmittingError(ERRORS.network);
    }
  };

  return (
    <Modal show onHide={handleClose} restoreFocus={false}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure?
        {!!submittingError && <InvalidFeedback message={submittingError} />}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="danger" onClick={handleConfirmDelete}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(ModalConfirmRemoveChannel);
