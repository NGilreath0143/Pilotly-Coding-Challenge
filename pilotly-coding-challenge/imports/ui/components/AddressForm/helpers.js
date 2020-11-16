export const checkErrorBucketForError = (errorBucket, inputName) => {
  return (
    errorBucket &&
    errorBucket.errorSources &&
    errorBucket.errorSources.includes(inputName)
  );
};