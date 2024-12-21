export const API_BASE_URL = 'http://localhost:8080';

export const APPLICATION_STATUS = {
  PENDING: 'PENDING',
  REVIEWING: 'REVIEWING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.';

export const ROUTES = {
  HOME: '/',
  JOBS: '/jobs',
  NEW_JOB: '/jobs/new',
  JOB_DETAILS: '/jobs/:jobId',
  APPLICATIONS: '/applications',
  SEEKERS: '/seekers'
};

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_SALARY: 'Please enter a valid salary amount',
  MIN_LENGTH: (field, length) => `${field} must be at least ${length} characters long`,
  MAX_LENGTH: (field, length) => `${field} cannot exceed ${length} characters`
};

export const SNACKBAR_DURATION = 5000; // 5 seconds

export const DEBOUNCE_DELAY = 300; // 300 milliseconds
