import React, { useContext, useRef } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import Button from 'react-bootstrap/Button';

import { ERRORS } from '../constants';
import UserContext from './UserContext';
import { createMessageAsync } from '../redux/slices/messages';
import Field from './Field';
import InvalidFeedback from './InvalidFeedback';

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
    <Formik initialValues={{ body: '' }} onSubmit={handleSubmit}>
      {({
        isValid, isSubmitting, dirty, errors: { submittingError },
      }) => (
        <Form autoComplete="off">
          <div className="form-group">
            <div className="input-group">
              <Field name="body" forwardRef={bodyRef} disabled={isSubmitting} autoFocus className="mr-2" />
              <Button type="submit" disabled={!isValid || isSubmitting || !dirty}>Submit</Button>
              {!!submittingError && <InvalidFeedback message={submittingError} />}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
