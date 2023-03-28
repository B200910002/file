const { sequelize } = require("../database/postgresql");
const { DataTypes } = require("sequelize");

const Category = sequelize.define("categories", {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
});

const Extention = sequelize.define("extentions", {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "categories",
      key: "_id",
    },
  },
});

const File = sequelize.define("files", {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  extention_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "extentions", key: "_id" },
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "_id" },
  },
});

Category.import = async function (categories) {
  for (let category of categories) {
    await this.create({
      name: category.name,
      description: category.description,
    });
  }
};

Extention.import = async function (extentions) {
  for (let extention of extentions) {
    await this.create({
      name: extention.name,
      description: extention.description,
      category_id: extention.category,
    });
  }
};

module.exports.Category = Category;
module.exports.Extention = Extention;
module.exports.File = File;
