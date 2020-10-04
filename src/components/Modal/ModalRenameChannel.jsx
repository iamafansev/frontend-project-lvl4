import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { ERRORS, formFieldsError } from '../../constants';
import { renameChannelAsync } from '../../redux/slices/channels';
import modalSlice from '../../redux/slices/modal';
import Field from '../Field';
import Feedback from '../Feedback';

const { actions: { closeModal } } = modalSlice;

const schema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, formFieldsError.min(3))
    .max(20, formFieldsError.max(20))
    .required(formFieldsError.required()),
});

const ModalRenameChannel = () => {
  const dispatch = useDispatch();
  const id = useSelector(({ modal: { data } }) => data.channelId);
  const currentName = useSelector(({ channels: { list } }) => {
    const { name } = list.find((channel) => channel.id === id);
    return name;
  });

  const handleClose = () => dispatch(closeModal());

  const handleSubmit = ({ name }, { resetForm, setErrors }) => (
    dispatch(renameChannelAsync({ id, name: name.trim() }))
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
            errors, touched, isSubmitting, dirty, isValid,
          }) => (
            <Form autoComplete="off">
              <div className="form-group">
                <Field
                  name="name"
                  autoFocus
                  className="mb-2"
                  disabled={isSubmitting}
                  isInvalid={touched.name && errors.name}
                />
                {!!errors.submittingError && <Feedback message={errors.submittingError} />}
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
