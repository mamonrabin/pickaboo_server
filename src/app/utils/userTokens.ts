import type { IUser } from '../modules/user/user.interface.js';
import { generateToken } from './jwt.js';
import config from '../config/index.js';

export const createUserTokens = (user: IUser) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_acess_token_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  return {
    accessToken,
  };
};