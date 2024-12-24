export const handleValidation = async (validator, validationData) => {
    const err = await validator(validationData);
    if (err) throw new Error(err);
};
