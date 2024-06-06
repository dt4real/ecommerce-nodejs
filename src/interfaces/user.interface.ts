import { Document, ObjectId } from 'mongoose';

export interface IUserDocument extends Document {
    _id?: string | ObjectId;
    username: string;
    password: string;
    email: string;
    fullName: string;
    role: string;
    addresses?: IAddress[];
    phone: string;
    cart?: ICart[];
    orderHistory?: ObjectId[];
    profilePicture?: string;
    profilePublicId?: string;
    emailVerified?: number;
    emailVerificationToken?: string;
    browserName?: string;
    deviceType?: string;
    otp?: string;
    otpExpiration?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}

export interface IAddress {
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface ICartItem {
    productId: string | ObjectId;
    quantity: number;
    price?: number;
}

export interface ICart {
    items: ICartItem[];
}