import {requiredString} from '../../../utils/validation.js';

export const auth = {
  signup: {
    username: requiredString('name'),
  },
};
