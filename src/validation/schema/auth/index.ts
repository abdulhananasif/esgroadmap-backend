import Joi from 'joi';
import {errors} from '../../message/index.js';

export const signupSchema = Joi.object({
  name: Joi.string().required().messages(errors.auth.signup.name),
}).required();
