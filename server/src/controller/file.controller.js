const { File, Category, Extention } = require("../model/File.model");
const { User } = require("../model/User.model");
const { db } = require("../database/postgresql");

// console.log(
//   db.query("select * from categories", (error, result) => {
//     if (error) console.log(error.message);
//     else console.log(result.rows);
//   })
// );

exports.createFile = async (req, res, next) => {
  try {
    const file = req.sampleFile;
    const { category, extention } = req.body;
    const user = req.user;
    const file1 = await File.create({
      name: file.name,
      category: category,
      extention: extention,
      uploader: user._id,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.uploadFile = async (req, res, next) => {
  try {
    var { category, extention } = req.body;
    category = await Category.findById(category);
    extention = await Extention.findById(extention);

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were upload.");
    }

    sampleFile = req.files.file;
    splitExtention = sampleFile.name.split(".")[1];
    if (extention.name !== splitExtention)
      throw new Error("File extention must be " + extention.name);
    if (sampleFile.size / 1024 / 1024 >= 5)
      throw new Error("File max size 5mb");
    uploadPath =
      process.cwd() +
      `/public/file/${category.name}/${extention.name}/` +
      sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
      res.send(
        process.env.LOCAL_HOST_PORT +
          `/public/file/${category.name}/${extention.name}/` +
          sampleFile.name
      );
    });
    req.sampleFile = sampleFile;
    next();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAllExtentions = async (req, res, next) => {
  try {
    const { category } = req.body;
    const extentions = await Extention.find({ category: category });
    res.status(200).json(extentions);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAllFiles = async (req, res, next) => {
  try {
    const user = req.user;
    const files = await File.find({ uploader: user._id });
    res.status(200).json(files);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.importFiles = async (req, res, next) => {
  try {
    const { files } = req.body;
    await File.importFile();
    res.status(200).json("files imported");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.importCategories = async (req, res, next) => {
  try {
    const { categories } = req.body;
    await Category.import(categories);
    res.status(200).json("categories imported");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.importExtentions = async (req, res, next) => {
  try {
    const { extentions } = req.body;
    await Extention.import(extentions);
    res.status(200).json("extentions imported");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
