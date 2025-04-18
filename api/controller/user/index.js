import validateRequest from '../../utils/validateRequest.js';
import { editProfileSchema } from '../../validation/schema/user/index.js';
import { prisma } from '../../server.js';
import { comparePasswords, hashPassword } from '../../utils/password.js';
export const editProfile = async (req, res) => {
    const { id } = req.user;
    let response = {};
    try {
        await validateRequest(editProfileSchema, req.body);
        const { username, email } = req.body;
        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                username,
                email,
            },
        });
        response.status = 200;
        response.message = user;
    }
    catch (err) {
        response.status = 400;
        response.message = err.message;
    }
    res.status(response.status).json(response.message);
};
export const activate = async (req, res) => {
    const { id } = req.user;
    let response = {};
    try {
        await prisma.user.update({ where: { id }, data: { isActive: true } });
        response.status = 200;
        response.message = 'success';
    }
    catch (err) {
        response.status = 400;
        response.message = err.message;
    }
    res.status(response.status).json(response.message);
};
export const editPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;
    let response = {};
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw { message: 'User not found' };
        }
        const isMatch = comparePasswords(oldPassword, user.password);
        if (!isMatch) {
            throw { message: 'old password is incorrect' };
        }
        const hashedPassword = await hashPassword(newPassword);
        await prisma.user.update({
            where: {
                id,
            },
            data: {
                password: hashedPassword,
            },
        });
        response.status = 200;
        response.message = 'password changed';
    }
    catch (err) {
        response.status = 400;
        response.message = err.message;
    }
    res.status(response.status).json(response.message);
};
