interface OtpEntry {
  otp: string;
  expiresAt: number;
}

const otpStore: Record<string, OtpEntry> = {};

export const saveOtp = (email: string, otp: string, expiresInMs: number) => {
  otpStore[email] = {
    otp,
    expiresAt: Date.now() + expiresInMs,
  };
};

export const getOtp = (email: string): OtpEntry | undefined => {
  const entry = otpStore[email];
  if (!entry) return undefined;

  if (Date.now() > entry.expiresAt) {
    delete otpStore[email];
    return undefined;
  }

  return entry;
};

export const deleteOtp = (email: string) => {
  delete otpStore[email];
};
