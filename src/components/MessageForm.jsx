import React, { useContext } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import Button from 'react-bootstrap/Button';

import { ERRORS } from '../constants';
import UserContext from './UserContext';
import { createMessageAsync } from '../redux/slices/messages';
import Field from './Field';
import Feedback from './Feedback';

const MessageForm = () => {
  const dispatch = useDispatch();
  const channelId = useSelector(({ channels: { currentChannelId } }) => currentChannelId);
  const { nickname } = useContext(UserContext);

  const handleSubmit = ({ body }, { resetForm, setErrors }) => (
    dispatch(createMessageAsync({ channelId, nickname, body }))
      .then(unwrapResult)
      .then(resetForm)
      .catch(() => setErrors({ submittingError: ERRORS.network }))
  );

  return (
    <Formik initialValues={{ body: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting, dirty, errors: { submittingError } }) => (
        <Form autoComplete="off">
          <div className="form-group">
            <div className="input-group">
              <Field name="body" disabled={isSubmitting} autoFocus className="mr-2" isInvalid={!!submittingError} />
              <Button type="submit" disabled={isSubmitting || !dirty}>Submit</Button>
              {!!submittingError && <Feedback message={submittingError} />}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
