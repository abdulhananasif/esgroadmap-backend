const otpStore = {};
export const saveOtp = (email, otp, expiresInMs) => {
    otpStore[email] = {
        otp,
        expiresAt: expiresInMs.getTime(),
    };
};
export const getOtp = (email) => {
    const entry = otpStore[email];
    if (!entry)
        return undefined;
    if (Date.now() > entry.expiresAt) {
        delete otpStore[email];
        return undefined;
    }
    return entry;
};
export const deleteOtp = (email) => {
    delete otpStore[email];
};
export const verifiedUser = new Map();
