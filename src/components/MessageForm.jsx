import React, { useContext } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Formik, Form } from 'formik';
import Button from 'react-bootstrap/Button';

import UserContext from '../UserContext';
import { createMessage } from '../redux/slices/messages';
import Field from './Field';

const MessageForm = () => {
  const dispatch = useDispatch();
  const channelId = useSelector(({ channels: { currentChannelId } }) => currentChannelId);
  const nickname = useContext(UserContext);

  const handleSubmit = ({ body }, { resetForm, setErrors }) => (
    dispatch(createMessage({ channelId, nickname, body }))
      .then(unwrapResult)
      .then(resetForm)
      .catch(() => setErrors({ submittingError: 'Network error. Please try again.' }))
  );

  return (
    <Formik initialValues={{ body: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting, dirty, errors: { submittingError } }) => (
        <Form autoComplete="off">
          <div className="form-group">
            <div className="input-group">
              <Field name="body" autoFocus className={cn('mr-2', 'form-control', { 'is-invalid': !!submittingError })} />
              <Button type="submit" disabled={isSubmitting || !dirty}>Submit</Button>
              {!!submittingError && (
                <div className="d-block invalid-feedback">{submittingError}</div>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
