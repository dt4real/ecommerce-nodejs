import { ICategoryDocument } from '@users/interfaces/category.interface';
import { Model, model, Schema } from 'mongoose';

const categorySchema = new Schema(
    {
        name: {type: String, required: true, index: true, unique: true},
        description: {type: String, required: true},
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const CategoryModel: Model<ICategoryDocument> = model<ICategoryDocument>('Category', categorySchema, 'Category');

export { CategoryModel };