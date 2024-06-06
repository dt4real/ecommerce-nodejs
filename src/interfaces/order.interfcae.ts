import { IAddress, ICartItem } from '@users/interfaces/user.interface';
import { ObjectId } from 'mongoose';

export interface IOrderDocument {
    user: ObjectId;
    items: ICartItem[];
    paymentIntent?: string;
    totalAmount: number;
    billingAddress: IAddress;
    status: string;
    orderDate: Date;
}