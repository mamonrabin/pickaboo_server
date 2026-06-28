import type { Response } from 'express';

export interface AuthTokens {
  accessToken: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  res.cookie('accessToken', tokenInfo.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
};

// secure: false,
// sameSite: "lax",
// when local host
