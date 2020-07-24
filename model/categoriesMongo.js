const  Mongoose = require( 'mongoose');
const Float = require('mongoose-float').loadType(Mongoose);

const categorySchema = new Mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      //unique: true,
      trim: true,
      lowercase: true
    },
    categoryId: {
      type: String,
      required: true,
      minlength: 6
    },
    hasSubCategories: {
      type: Boolean
    },
    parentId: { type: String, minlength: 3 },
    topcategory: {
      type: Boolean,
      default: false
    },
    productsQuantity: {
      type: Number
    },
    image: {
      type: String
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'PENDING', 'BLOCK', 'UNBLOCKED'],
      default: 'INACTIVE'
    },
    commission: {
      type: Float 
  },
  },
  {
    timestamps: true
  }
);
const Category = Mongoose.model('Categories', categorySchema );
module.exports =   Category 