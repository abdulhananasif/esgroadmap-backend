import { signupSchema } from '../../validation/schema/auth/index.js';
import validateRequest from '../../utils/validateRequest.js';
export const signup = async (req, res) => {
    let response = {};
    try {
        await validateRequest(signupSchema, req.body);
        response.status = 200;
        response.message = 'success';
    }
    catch (err) {
        response.status = 400;
        response.message = err.message;
    }
    res.status(response.status).json(response.message);
};
