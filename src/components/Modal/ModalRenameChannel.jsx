import React, {
  useEffect, useMemo, useRef, memo, useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik, Form } from 'formik';
import FormBootstrap from 'react-bootstrap/Form';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { ERRORS, formFieldsError } from '../../constants';
import { getChannelNames, getCurrentChannelName, renameChannelAsync } from '../../redux/slices/channels';
import { closeModal, getChannelId } from '../../redux/slices/modal';
import Field from '../Field';
import InvalidFeedback from '../InvalidFeedback';

const getSсhema = (channelNames) => Yup.object().shape({
  name: Yup.string()
    .min(3, formFieldsError.min(3))
    .max(20, formFieldsError.max(20))
    .notOneOf(channelNames, formFieldsError.notAvailable())
    .required(formFieldsError.required()),
});

const ModalRenameChannel = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { channelId, channelNames, currentChannelName } = useSelector((state) => {
    const id = getChannelId(state);
    return {
      channelId: id,
      currentChannelName: getCurrentChannelName(id)(state),
      channelNames: getChannelNames(state),
    };
  });

  const schema = useMemo(() => getSсhema(channelNames), [channelNames]);

  const setFocusOnField = useCallback(() => {
    inputRef.current.focus();
  }, []);

  const selectInputText = useCallback(() => {
    setFocusOnField();
    inputRef.current.select();
  }, []);

  useEffect(selectInputText, []);

  const handleClose = useCallback(() => dispatch(closeModal()), []);

  const handleSubmit = useCallback(async ({ name }, { resetForm, setErrors }) => {
    try {
      const resultAction = await dispatch(renameChannelAsync(
        { id: channelId, name: name.trimRight() },
      ));
      unwrapResult(resultAction);
      resetForm();
      handleClose();
    } catch (error) {
      setTimeout(setFocusOnField);
      setErrors({ submittingError: ERRORS.network });
    }
  }, []);

  return (
    <Modal show onHide={handleClose} restoreFocus={false}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: currentChannelName }}
          validationSchema={schema}
          validateOnBlur={false}
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
                  forwardRef={inputRef}
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

export default memo(ModalRenameChannel);
