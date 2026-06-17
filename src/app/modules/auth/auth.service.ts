import { userModel } from "../user/user.model.js";
import AppError from "../../helpers/AppError.js";
import httpStatus from "http-status-codes";
import { createUserTokens } from "../../utils/userTokens.js";
import bcrypt from "bcryptjs";

const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!user.password) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "User password is not set"
    );
  }

  // compare password
  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Invalid password"
    );
  }

  const tokenInfo = createUserTokens(user);

  return {
    user,
    accessToken: tokenInfo.accessToken,
  };
};



export const authServices = {
  loginUser,
};