
import httpStatus from "http-status-codes";
import type { IAuthProvider, IUser } from "./user.interface.js";
import bcryptjs from "bcryptjs";
import AppError from "../../helpers/AppError.js";
import config from "../../config/index.js";
import { userModel } from "./user.model.js";

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

// const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

//     if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
//         if (userId !== decodedToken.userId) {
//             throw new AppError(401, "You are not authorized")
//         }
//     }

//     const ifUserExist = await User.findById(userId);

//     if (!ifUserExist) {
//         throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
//     }

//     if (decodedToken.role === Role.ADMIN && ifUserExist.role === Role.SUPER_ADMIN) {
//         throw new AppError(401, "You are not authorized")
//     }

//     /**
//      * email - can not update
//      * name, phone, password address
//      * password - re hashing
//      *  only admin superadmin - role, isDeleted...
//      * 
//      * promoting to superadmin - superadmin
//      */

//     if (payload.role) {
//         if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
//             throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
//         }

//         // if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
//         //     throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
//         // }
//     }

//     if (payload.isActive || payload.isDeleted || payload.isVerified) {
//         if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
//             throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
//         }
//     }

//     const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

//     return newUpdatedUser
// }


// const getAllUsers = async (query: Record<string, string>) => {

//     const queryBuilder = new QueryBuilder(User.find(), query)
//     const usersData = queryBuilder
//         .filter()
//         .search(userSearchableFields)
//         .sort()
//         .fields()
//         .paginate();

//     const [data, meta] = await Promise.all([
//         usersData.build(),
//         queryBuilder.getMeta()
//     ])

//     return {
//         data,
//         meta
//     }
// };
// const getSingleUser = async (id: string) => {
//     const user = await User.findById(id).select("-password");
//     return {
//         data: user
//     }
// };
// const getMe = async (userId: string) => {
//     const user = await User.findById(userId).select("-password");
//     return {
//         data: user
//     }
// };

export const userServices = {
    createUser
}