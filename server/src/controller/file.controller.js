// const { File, Category, Extention } = require("../model/File.model");
const { Category, Extention, File } = require("../model2/File.model");

exports.createFile = async (req, res, next) => {
  try {
    const file = req.sampleFile;
    const { category, extention } = req.body;
    const user = req.user;
    const file1 = await File.create({
      name: file.name,
      extention_id: extention,
      owner_id: user._id,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.uploadFile = async (req, res, next) => {
  try {
    var { category, extention } = req.body;
    category = await Category.findByPk(category);
    extention = await Extention.findByPk(extention);

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were upload.");
    }

    sampleFile = req.files.file;
    splitExtention = sampleFile.name.split(".");
    if (extention.name !== splitExtention[splitExtention.length - 1])
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
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAllExtentions = async (req, res, next) => {
  try {
    const { category } = req.body;
    const extentions = await Extention.findAll({
      where: { category_id: category },
    });
    res.status(200).json(extentions);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAllFiles = async (req, res, next) => {
  try {
    const user = req.user;
    const files = await File.findAll({ where: { owner_id: user._id } });
    res.status(200).json(files);
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
