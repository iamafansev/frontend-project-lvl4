const NETWORK_ERROR_MESSAGE = 'Network error. Please try again.';

export const formFieldsError = {
  min: (num) => `Minimum ${num} characters`,
  max: (num) => `Must be no more than ${num} characters`,
  notAvailable: () => 'This name is already taken',
  required: () => 'Field is required',
};

export const ERRORS = {
  network: NETWORK_ERROR_MESSAGE,
};
