const mongoose = require('mongoose');
const genericSchema = new mongoose.Schema(
    {
        adminId: {
          type: String,
          trim: true,
          required: true
        },
        productName: {
          type: String,
          trim: true,
          required: true
        },
        brandproductId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'brandProducts'
        },
        description: {
          type: String,
          minlength: 2,
          required: true
        },
        quantity: {
          type: Number
        },
        categoryId: {
          type: String,
          minlength: 6,
          required: true
        },
        subcategoryIds: [
          {
            level:Number,
            categoryId:String
          }
        ],
    
        subcategoryName: {
          type: Array
        },
        image: {
          type: Array,
          minlength: 1,
          required: true
        },
        createdBy: {
          type: String,
          minlength: 1,
          required: true
        },
        lastEditedBy: {
          type: String,
          minlength: 1,
          required: true
        },
        height: {
          type: Number,
          required: true
        },
        volume: {
          type: Number
        },
        weight: {
          type: Number,
          required: true
        },
        comment: {
          type: String,
          minlength: 1
        },
        width: { type: Number, minlength: 1, required: true },
        length: { type: Number, minlength: 1, required: true },
        brandName: { type: String, minlength: 1, required: true },
        brandId: { type: String },
        categoryName: { type: String, minlength: 1, required: true },
        productId: { type: String, minlength: 3 },
        status: {
          type: String,
          enum: ['PENDING', 'DISAPPROVE', 'APPROVE', 'BLOCK'],
          default: 'PENDING'
        }
      },
      {
        timestamps: true
      }
);

const Generic = mongoose.model('genericproducts', genericSchema );
module.exports =  Generic 
