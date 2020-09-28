import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import { Formik, Form, Field } from 'formik';

import routes from '../routes';
import UserContext from '../UserContext';

const MessageForm = () => {
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const nickname = useContext(UserContext);

  const handleSubmit = ({ body }, { resetForm, setErrors }) => {
    const route = routes.channelMessagesPath(channelId);
    const attributes = { nickname, body };

    return axios
      .post(route, { data: { attributes } })
      .then(resetForm)
      .catch(() => setErrors({ submittingError: 'Network error. Please try again.' }));
  };

  return (
    <Formik initialValues={{ body: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting, dirty, errors: { submittingError } }) => (
        <Form autoComplete="off">
          <div className="form-group">
            <div className="input-group">
              <Field name="body" className={cn('mr-2', 'form-control', { 'is-invalid': !!submittingError })} />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !dirty}
              >
                Submit
              </button>
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
