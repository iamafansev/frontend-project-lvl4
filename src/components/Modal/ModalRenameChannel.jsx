import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { ERRORS, formFieldsError } from '../../constants';
import { renameChannel } from '../../redux/slices/channels';
import modalSlice from '../../redux/slices/modal';
import Field from '../Field';
import Feedback from '../Feedback';

const { actions: { closeModal } } = modalSlice;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, formFieldsError.min(3))
    .max(20, formFieldsError.max(20))
    .required(formFieldsError.required()),
});

const ModalRenameChannel = () => {
  const dispatch = useDispatch();
  const id = useSelector(({ modal: { data } }) => data.channelId);
  const currentName = useSelector(({ channels: { byId } }) => byId[id].name);

  const handleClose = () => dispatch(closeModal());

  const handleSubmit = ({ name }, { resetForm, setErrors }) => (
    dispatch(renameChannel({ id, name }))
      .then(unwrapResult)
      .then(() => {
        resetForm();
        handleClose();
      })
      .catch(() => setErrors({ submittingError: ERRORS.network }))
  );

  return (
    <Modal show onHide={handleClose} restoreFocus={false}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: currentName }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({
            errors, touched, isSubmitting, dirty, isValid, errors: { submittingError },
          }) => (
            <Form autoComplete="off">
              <div className="form-group">
                <Field
                  name="name"
                  autoFocus
                  isInvalid={touched.name && errors.name}
                />
                {!!submittingError && <Feedback message={submittingError} />}
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="mr-2" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || !dirty || !isValid}
                  >
                    Rename
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
