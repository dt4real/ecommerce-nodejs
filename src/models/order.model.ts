import { IOrderDocument } from '@users/interfaces/order.interfcae';
import mongoose, { model, Model, Schema } from 'mongoose';

const orderSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        items: [
            {
                product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
                quantity: { type: Number, min: 1},
                price: { type: Number, required: true }
            }
        ],
        paymentIntent: { type: String },
        totalAmount: { type: Number, required: true },
        billingAddress:  {
            street: {type: String},
            city: {type: String},
            postalCode: {type: String},
            country: {type: String},
        },
        status: { type: String },
        orderDate: {type: Date, default: Date.now}
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const OrderModel: Model<IOrderDocument> = model<IOrderDocument>('Order', orderSchema, 'Order');

export { OrderModel };