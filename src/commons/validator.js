export const handleAsync = async (validators) => {
  if (!Array.isArray(validators)) {
    throw new Error('Invalid validators argument, expect to be array');
  }

  const validationResults = await Promise.allSettled(validators);

  const errors = validationResults
    .filter((val) => val.status === 'rejected')
    .map((err) => err.reason.message);

  const validationStatus = {
    errors,
    valid: errors.length === 0,
    stringError: errors.toString(),
  };

  return validationStatus;
};

export default { handleAsync };
