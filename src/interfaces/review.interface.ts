import { ObjectId } from 'mongoose';

export interface IReviewDocument {
    user: ObjectId;
    product: ObjectId;
    rating: number;
    comment?: string;
    commentDate: Date;
}