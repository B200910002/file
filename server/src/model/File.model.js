const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String,
  description: String,
});

const extentionSchema = new Schema({
  name: String,
  description: String,
  category: Schema.Types.ObjectId,
});

const fileSchema = new Schema({
  name: { type: String, uniqued: true },
  category: Schema.Types.ObjectId,
  extention: Schema.Types.ObjectId,
  uploader: Schema.Types.ObjectId,
});

categorySchema.statics.import = async function (categories) {
  for (let category of categories) {
    await this.create({
      name: category.name,
      description: category.description,
    });
  }
};

extentionSchema.statics.import = async function (extentions) {
  for (let extention of extentions) {
    await this.create({
      name: extention.name,
      description: extention.description,
      category: extention.category,
    });
  }
};

module.exports.Category = mongoose.model("Category", categorySchema);
module.exports.Extention = mongoose.model("Extention", extentionSchema);
module.exports.File = mongoose.model("File", fileSchema);
