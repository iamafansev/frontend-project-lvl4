import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import BootstrapModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import modalSlice from '../redux/slices/modal';

const { actions: { closeModal } } = modalSlice;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(20, 'Must be no more than 20 characters')
    .required('Field is required'),
});

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpened } = useSelector(({ modal }) => modal);

  const handleSubmit = () => {};
  const handleClose = () => dispatch(closeModal());

  return (
    <BootstrapModal show={isOpened} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Add channel</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
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
                    Add
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;
