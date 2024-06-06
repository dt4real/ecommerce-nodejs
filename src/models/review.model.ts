import { IReviewDocument } from '@users/interfaces/review.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const reviewSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        rating: {type: Number, default: 0},
        comment: {type: String},
        commentDate: {type: Date, default: Date.now}
    },
    { versionKey: false}
);

const ReviewModel : Model<IReviewDocument> = model<IReviewDocument>('Review', reviewSchema, 'Review');

export { ReviewModel };