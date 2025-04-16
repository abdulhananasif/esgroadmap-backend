import Joi from 'joi';
import {errors} from '../../message/index.js';

export const signupSchema = Joi.object({
  username: Joi.string().required().messages(errors.auth.signup.username),
  email: Joi.string().required().messages(errors.auth.signup.email),
  password: Joi.string().required().messages(errors.auth.signup.password),
}).required();

export const signinSchema = Joi.object({
  email: Joi.string().required().messages(errors.auth.signin.email),
  password: Joi.string().required().messages(errors.auth.signin.password),
});
