import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik, Form } from 'formik';
import FormBootstrap from 'react-bootstrap/Form';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { ERRORS, formFieldsError } from '../../constants';
import { renameChannelAsync } from '../../redux/slices/channels';
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

const ModalRenameChannel = () => {
  const dispatch = useDispatch();
  const id = useSelector(({ modal: { data } }) => data.channelId);

  const { currentName, channelNames } = useSelector(({ channels: { list } }) => {
    const { name } = list.find((channel) => channel.id === id);
    const allNames = list.map((channel) => channel.name);
    return { currentName: name, channelNames: allNames };
  });

  const schema = useMemo(() => getSсhema(channelNames), [channelNames]);

  const handleClose = () => dispatch(closeModal());

  const handleSubmit = ({ name }, { resetForm, setErrors }) => (
    dispatch(renameChannelAsync({ id, name: name.trimRight() }))
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
                    Rename
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

export default ModalRenameChannel;
