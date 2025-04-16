import { requiredString } from '../../../utils/validation.js';
export const auth = {
    signup: {
        name: requiredString('name'),
    },
};
