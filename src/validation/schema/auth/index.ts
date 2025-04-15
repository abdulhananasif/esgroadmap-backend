import Joi from 'joi';
import {errors} from '../../message/index.js';

export const signupSchema = Joi.object({
  username: Joi.string().required().messages(errors.auth.signup.username),
}).required();
