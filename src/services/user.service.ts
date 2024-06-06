import { config } from '@users/config';
import { IUserDocument } from '@users/interfaces/user.interface';
import { UserModel } from '@users/models/user.model';
import { lowerCase } from '@users/utils/helper';
import { sign } from 'jsonwebtoken';

export const createUser = async (data: IUserDocument): Promise<IUserDocument | undefined> => {
    const authUser: IUserDocument = await UserModel.create(data) as IUserDocument;
    return authUser;
};

export const getUserById = async (userId: string) : Promise<IUserDocument | undefined> => {
    const user: IUserDocument  = await UserModel.findById(userId) as IUserDocument;
    return user;
};

export const getUserByUsernameOrEmail = async (identifier: string) : Promise<IUserDocument | undefined> => {
    const user: IUserDocument  = (await UserModel.findOne({
        $or: [
            { email: lowerCase(identifier) },
            { username: lowerCase(identifier) }
        ]
    }).exec()) as IUserDocument;
    return user;
};

export async function getAuthUserByVerificationToken(token: string): Promise<IUserDocument | undefined> {
    const user : IUserDocument = (await UserModel.findOne({
        emailVerificationToken: token
    }).exec()) as IUserDocument;
    return user;
}
  
  export async function getAuthUserByPasswordToken(token: string): Promise<IUserDocument | undefined> {
    const user: IUserDocument = (await UserModel.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() }
      }).exec()) as IUserDocument;
      return user;
  }
  
  export async function getAuthUserByOTP(otp: string): Promise<IUserDocument | undefined> {
    const user: IUserDocument = (await UserModel.findOne({
        otp,
        otpExpiration: { $gt: Date.now()}
    }).exec()) as IUserDocument;
    return user;
  }
  
  export async function updateVerifyEmailField(authId: number, emailVerified: number, emailVerificationToken?: string): Promise<void> {
    await UserModel.updateOne(
        { _id: authId },
        { 
            emailVerified,
            emailVerificationToken
        }
    );
  }
  
  export async function updatePasswordToken(authId: number, token: string, tokenExpiration: Date): Promise<void> {
    await UserModel.updateOne(
        { _id: authId },
        {
            passwordResetToken: token,
            passwordResetExpires: tokenExpiration
        }
    );
  }
  
  export async function updatePassword(authId: number, password: string): Promise<void> {
    await UserModel.updateOne(
        { _id: authId },
        {
            password,
            passwordResetToken: '',
            passwordResetExpires: new Date()
        }
    );
  }
  
  export async function updateUserOTP(authId: number, otp: string, otpExpiration: Date, browserName: string, deviceType: string): Promise<void> {
    await UserModel.updateOne(
        { _id: authId },
        {
            otp,
            otpExpiration,
            ...(browserName.length > 0 && { browserName }),
            ...(deviceType.length > 0 && { deviceType })
        }
    );
  }
  
  export function signToken(id: number, email: string, username: string): string {
    return sign(
      {
        id,
        email,
        username
      },
      config.JWT_TOKEN!
    );
  }
