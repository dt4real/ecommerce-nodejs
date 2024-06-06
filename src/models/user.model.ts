import { IUserDocument } from '@users/interfaces/user.interface';
import { compare, hash } from 'bcryptjs';
import mongoose, { Model, model, Schema } from 'mongoose';

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema: Schema = new Schema(
    {
        username: { 
            type: String,
            required: [true, 'Please enter your username'],
            unique: true,
            index: true
        },
        password: {
            type: String,
            minlength: [6, 'Password must be at least 6 characters'],
            select: false,
        },
        email: { 
            type: String,
            required: [true, 'Please enter your email'],
            validate: {
                validator: function (value: string) {
                    return emailRegexPattern.test(value);
                },
                message: 'please enter a valid email',
            },
        unique: true, 
        },
        fullName: {
            type: String,
            required: true
        },
        profilePicture: {type: String},
        profilePublicId: {type: String},
        role: {
            type: String,
            required: true
        },
        addresses: [
            {
                street: {type: String},
                city: {type: String},
                postalCode: {type: String},
                country: {type: String},
            }
        ],
        phone: {type: String},
        cart: {
            items: [
                {
                    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
                    quantity: { type: Number, min: 0}
                }
            ]
        },
        orderHistory: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
        ],
        emailVerificationToken: { type: String, required: true },
        emailVerified: { type: Boolean, required: true, default: false },
        browserName: {type: String},
        deviceType: {type: String},
        otp: {type: String},
        otpExpiration: {type: Date, default: Date.now},
        passwordResetToken: {type: String},
        passwordResetExpires: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

// Hash Password before saving
userSchema.pre<IUserDocument>('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    this.password = await hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await compare(enteredPassword, this.password);
};

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'User');

export { UserModel };