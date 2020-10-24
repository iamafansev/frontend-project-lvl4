import React, { useMemo, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik, Form } from 'formik';
import FormBootstrap from 'react-bootstrap/Form';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { ERRORS, formFieldsError } from '../../constants';
import { createChannelAsync } from '../../redux/slices/channels';
import modalSlice from '../../redux/slices/modal';
import Field from '../Field';
import InvalidFeedback from '../InvalidFeedback';

const { actions: { closeModal } } = modalSlice;

const getSсhema = (channelNames) => Yup.object().shape({
  name: Yup.string()
    .min(3, formFieldsError.min(3))
    .max(20, formFieldsError.max(20))
    .notOneOf(channelNames, formFieldsError.notAvailable())
    .required(formFieldsError.required()),
});

const ModalAddChannel = () => {
  const dispatch = useDispatch();
  const channelNames = useSelector((state) => state.channels.channels.map(({ name }) => name));

  const schema = useMemo(() => getSсhema(channelNames), [channelNames]);

  const handleClose = () => dispatch(closeModal());

  const handleSubmit = async ({ name }, { resetForm, setErrors }) => {
    try {
      const resultAcion = await dispatch(createChannelAsync(name.trimRight()));
      unwrapResult(resultAcion);
      resetForm();
      handleClose();
    } catch (error) {
      setErrors({ submittingError: ERRORS.network });
    }
  };

  return (
    <Modal show onHide={handleClose} restoreFocus={false} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
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
              <FormBootstrap.Group>
                <Field
                  name="name"
                  autoFocus
                  className="mb-2"
                  disabled={isSubmitting}
                  isInvalid={touched.name && errors.name}
                />
                {!!errors.submittingError && <InvalidFeedback message={errors.submittingError} />}
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
              </FormBootstrap.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default memo(ModalAddChannel);
