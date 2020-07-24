const Sequelize = require("sequelize");
const db = require("../db/odapsql");

const categoryModel = db.define(
    "newcategory",
    {
        categoryName: {
            type: Sequelize.STRING,
            required: true,
            primaryKey: true,
        },
        image: {
            type: Sequelize.STRING,
            required: true,
        },
        categoryId: {
            type: Sequelize.STRING,
            required: true,
        },
        status: {
            type: Sequelize.STRING,
            required: true,
        },
        parentId: {
            type: Sequelize.STRING,
        },
        Alias:{
            type: Sequelize.STRING, 
        }
    },
    {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
    }
);
module.exports = categoryModel;
