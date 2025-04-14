import Joi from 'joi';
import {errors} from '../../message';

export const signupSchema = Joi.object({
  name: Joi.string().required().messages(errors.auth.signup.name),
}).required();
