import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { renameChannel } from '../../redux/slices/channels';
import modalSlice from '../../redux/slices/modal';

const { actions: { closeModal } } = modalSlice;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(20, 'Must be no more than 20 characters')
    .required('Field is required'),
});

const ModalRenameChannel = () => {
  const dispatch = useDispatch();
  const id = useSelector(({ modal: { data } }) => data.channelId);

  const handleClose = () => dispatch(closeModal());

  const handleSubmit = ({ name }, { resetForm, setErrors }) => (
    dispatch(renameChannel({ id, name }))
      .then(unwrapResult)
      .then(() => {
        resetForm();
        handleClose();
      })
      .catch(() => setErrors({ submittingError: 'Network error. Please try again.' }))
  );

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
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
                  className={cn('mb-2', 'form-control', { 'is-invalid': touched.name && errors.name })}
                />
                {errors.name && touched.name && (
                  <div className="d-block mb-2 invalid-feedback">{errors.name}</div>
                )}
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
