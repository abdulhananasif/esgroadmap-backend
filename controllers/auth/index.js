import validateRequest from '../../utils/validateRequest.js';
import {signupSchema} from '../../validation/schema/auth/index.js';

export const signup = async (req, res) => {
  console.log('🚀 ~ signup ~ req:', req.body);
  let response = {};
  try {
    await validateRequest(signupSchema, req.body);
    response.status = 200;
    response.json = {message: 'success'};
    return res.status(response.status).json(response.json);
  } catch (err) {
    console.log('🚀 ~ signup ~ err:', err);
    response.status = 400;
    response.json = {error: err.message};
  }
  return res.status(response.status).json(response.json);
};
