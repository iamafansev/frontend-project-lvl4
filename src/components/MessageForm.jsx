import React, { useContext, useRef } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormBootstrap from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { ERRORS, formFieldsError } from '../constants';
import UserContext from './UserContext';
import { createMessageAsync } from '../redux/slices/messages';
import Field from './Field';
import InvalidFeedback from './InvalidFeedback';

const schema = Yup.object().shape({
  body: Yup.string()
    .max(400, formFieldsError.max(400)),
});

const MessageForm = () => {
  const dispatch = useDispatch();
  const channelId = useSelector(({ channels: { currentChannelId } }) => currentChannelId);
  const { nickname } = useContext(UserContext);
  const bodyRef = useRef();

  const setFocusOnBody = () => bodyRef.current.focus();

  const handleSubmit = ({ body }, { resetForm, setErrors }) => (
    dispatch(createMessageAsync({ channelId, nickname, body: body.trimRight() }))
      .then(unwrapResult)
      .then(resetForm)
      .then(setFocusOnBody)
      .catch(() => setErrors({ submittingError: ERRORS.network }))
  );

  return (
    <Formik initialValues={{ body: '' }} onSubmit={handleSubmit} validationSchema={schema}>
      {({
        touched, isValid, isSubmitting, dirty, errors: { body: bodyError, submittingError },
      }) => (
        <Form autoComplete="off">
          <FormBootstrap.Group>
            <InputGroup>
              <Field
                name="body"
                forwardRef={bodyRef}
                disabled={isSubmitting}
                isInvalid={submittingError}
                autoFocus
                className="mr-2"
              />
              <InputGroup.Append>
                <Button type="submit" disabled={!isValid || isSubmitting || !dirty}>Submit</Button>
              </InputGroup.Append>
            </InputGroup>
            {touched.body && bodyError && <InvalidFeedback message={bodyError} />}
            {!!submittingError && <InvalidFeedback message={submittingError} />}
          </FormBootstrap.Group>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
