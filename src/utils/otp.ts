interface OtpEntry {
  otp: string;
  expiresAt: number;
}

const otpStore: Record<string, OtpEntry> = {};

export const saveOtp = (email: string, otp: string, expiresInMs: Date) => {
  otpStore[email] = {
    otp,
    expiresAt: expiresInMs.getTime(),
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

export const verifiedUser = new Map<string, boolean>();
