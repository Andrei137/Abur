export const handleValidation = async (validator, validationData) => {
    const err = await validator(validationData);
    if (err) throw new Error(err);
};

export const sendError = async errMsg =>
    await handleValidation(() => Promise.resolve(errMsg), {});
