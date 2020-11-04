import React, {
  useEffect, useContext, useRef, useCallback, memo,
} from 'react';
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
import { getCurrentChannelId } from '../redux/slices/channels';
import Field from './Field';
import InvalidFeedback from './InvalidFeedback';

const schema = Yup.object().shape({
  body: Yup.string()
    .max(400, formFieldsError.max(400)),
});

const MessageForm = () => {
  const dispatch = useDispatch();
  const channelId = useSelector(getCurrentChannelId);
  const { nickname } = useContext(UserContext);
  const bodyRef = useRef();

  const setFocusOnBody = useCallback(() => bodyRef.current.focus(), []);

  useEffect(setFocusOnBody, [channelId]);

  const handleSubmit = useCallback(async ({ body }, { resetForm, setErrors }) => {
    try {
      const resultAction = await dispatch(
        createMessageAsync({ channelId, nickname, body: body.trimRight() }),
      );

      unwrapResult(resultAction);
      resetForm();
      setFocusOnBody();
    } catch (err) {
      setTimeout(setFocusOnBody);
      setErrors({ submittingError: ERRORS.network });
    }
  }, [channelId, nickname]);

  return (
    <Formik initialValues={{ body: '' }} onSubmit={handleSubmit} validationSchema={schema}>
      {({
        isValid,
        touched,
        isSubmitting,
        dirty,
        errors: { body: bodyError, submittingError },
        values: { body: bodyValue },
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
                <Button
                  type="submit"
                  disabled={(isSubmitting || !isValid || !dirty) && !bodyValue}
                >
                  Submit
                </Button>
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

export default memo(MessageForm);
