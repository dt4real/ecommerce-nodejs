import { IProductDocument } from '@users/interfaces/product.interface';
import { Model, model, Schema } from 'mongoose';

const productSchema = new Schema(
    {
        name: {type: String, required: true, index: true, unique: true},
        description: {type: String, required: true},
        category: [ {type: String} ],
        price: { type: Number, min: 0},
        stock: { type: Number, min: 0},
        images: [ {type: String} ],
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const ProductModel: Model<IProductDocument> = model<IProductDocument>('Product', productSchema, 'Product');

export { ProductModel };