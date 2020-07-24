const  Mongoose = require( 'mongoose');

const brandsSchema = new Mongoose.Schema(
    {
        brandName: {
          type: String,
          required: true,
          trim: true,
          lowercase: true
        },
        brandId: {
          type: String,
          required: true,
          minlength: 6
        },
        productsQuantity: {
          type: Number
        },
        status: {
          type: String,
          enum: ['ACTIVE', 'INACTIVE', 'PENDING', 'BLOCK', 'UNBLOCKED'],
          default: 'INACTIVE'
        },
        isDeleted: {
          type: Boolean
        },
        createdBy: {
          type: Mongoose.Schema.Types.ObjectId,
          ref: 'admin'
        },
        isDeletedBy: {
          type: Mongoose.Schema.Types.ObjectId,
          ref: 'admin',
          default: null
        }
      },
      {
        timestamps: true
      }
);
const Brands = Mongoose.model('Brands', brandsSchema );
module.exports =  Brands 