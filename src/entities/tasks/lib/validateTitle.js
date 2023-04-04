export const validateTitle = (title) => {
  if (!title) {
    return 'Required';
  }
  if (title.length < 2) {
    return 'Must be at least 2 characters';
  }
  return '';
};
