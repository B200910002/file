const { db } = require("../database/postgresql");

class Category {
  static async create({ name, description }) {
    return db.query(
      "insert into categories (name, description) values ($1, $2)",
      [name, description]
    );
  }

  static async import(categories) {
    for (let category of categories) {
      await this.create({
        name: category.name,
        description: category.description,
      });
    }
  }

  static async find() {
    return db.query("select * from categories");
  }

  static async findById(id) {
    const result = await db.query("select * from categories where _id = $1", [
      id,
    ]);
    return result.rows[0];
  }
}

class Extention {
  static async create({ name, description, category_id }) {
    return db.query(
      "insert into extentions (name, description, category_id) values ($1, $2, $3)",
      [name, description, category_id]
    );
  }

  static async import(extentions) {
    for (let extention of extentions) {
      await this.create({
        name: extention.name,
        description: extention.description,
        category_id: extention.category,
      });
    }
  }

  static async findByCate({ category_id }) {
    return db.query("select * from extentions where category_id = $1", [
      category_id,
    ]);
  }

  static async findById(id) {
    const result = await db.query("select * from extentions where _id = $1", [
      id,
    ]);
    return result.rows[0];
  }
}

class File {
  static async create({ name, extention_id, owner_id }) {
    return db.query(
      "insert into files (name, extention_id, owner_id) values ($1,$2,$3)",
      [name, extention_id, owner_id]
    );
  }

  static async find({ owner_id }) {
    return db.query("select * from files where owner_id = $1", [owner_id]);
  }
}

module.exports.Category = Category;
module.exports.Extention = Extention;
module.exports.File = File;
