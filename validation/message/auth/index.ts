import {requiredString} from '../../../utils/validation';

export const auth = {
  signup: {
    name: requiredString('name'),
  },
};
