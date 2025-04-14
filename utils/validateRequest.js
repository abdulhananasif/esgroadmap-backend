const validateRequest = async (schema, requestBody) => {
  console.log('🚀 ~ validateRequest ~ requestBody:', requestBody);
  try {
    await schema.validateAsync(requestBody);
    console.log('try block');
  } catch (err) {
    console.log('catch block');

    throw err;
  }
};

export default validateRequest;
