
import httpStatus from "http-status-codes";
import type { IAuthProvider, IUser } from "./user.interface.js";
import bcryptjs from "bcryptjs";
import AppError from "../../helpers/AppError.js";
import config from "../../config/index.js";
import { userModel } from "./user.model.js";
import { QueryBuilder } from "../../utils/QueryBuilder.js";
import { userSearchableFields } from "./user.constant.js";

const createUser = async (payload:IUser) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await userModel.findOne({ email })

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
    }

    const hashedPassword = await bcryptjs.hash(password as string, Number(config.bcrypt_salt_round))

    const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }


    const user = await userModel.create({
        email,
        password: hashedPassword,
        ...rest,
        auths: [authProvider],
    })

    return user

}

const getAllUsers = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(userModel.find(), query)
    const usersData = queryBuilder
        .filter()
        .search(userSearchableFields)
        .sort()
        .fields()
        .paginate()
         .apply();

    const [data, meta] = await Promise.all([
        usersData.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};


const getSingleUser = async (id: string) => {
    const user = await userModel.findById(id).select("-password");
    return {
        data: user
    }
};
const getMe = async (userId: string) => {
    const user = await userModel.findById(userId).select("-password");
    return {
        data: user
    }
};

const updateSingleUser= async (id: string, updateUser: IUser) => {
  const result = await userModel.findByIdAndUpdate(id, updateUser, {
    new: true,
  });
  return result;
};

const deleteSingleUser = async (id: string) => {
  const result = await userModel.findByIdAndDelete(id);
  return result;
};

export const userServices = {
    createUser,
    getAllUsers,
    getSingleUser,
    getMe,
    deleteSingleUser,
    updateSingleUser
}