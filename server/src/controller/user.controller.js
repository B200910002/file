const { Token } = require("../model/token.model");
// const { User } = require("../model/User.model");
const { User, UserGroup } = require("../model2/User.model");
const { File, Category, Extention } = require("../model2/File.model");

exports.register = async (req, res, next) => {
  try {
    const { email, password, repeatPassword } = req.body;
    const response = await User.regist(email, password, repeatPassword);
    res.status(201).json("Register successfully you can login now");
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await User.login(email, password);
    res.status(200).json({ email, token });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new Error("Not Authorized");
    const token = auth.split(" ")[1];
    req.user = await User.checkToken(token);
    next();
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.isAuthencated = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) res.status(401).json({ isAuthenticated: false });
    else res.status(201).json({ isAuthenticated: true });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, repeatNewPassword } = req.body;
    const repsonse = await User.changePassword(
      req.user,
      oldPassword,
      newPassword,
      repeatNewPassword
    );
    res.status(200).json(repsonse);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    const result = {};
    for (let user of users) {
      const group = await UserGroup.findByPk(user.role_id);
      if (group.role === "User") {
        result.users = [];
        result.users.push({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: group.role,
        });
      } else if (group.role === "Admin") {
        result.admins = [];
        result.admins.push({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: group.role,
        });
      }
    }
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = req.user;
    const result = {};
    result.user = {
      name: user.name,
      bio: user.bio,
      email: user.email,
    };
    const file = await File.findByPk(user.profile_id);
    if (!file) res.status(200).json(result);
    else {
      const extention = await Extention.findByPk(file.extention_id);
      const category = await Category.findByPk(extention.category_id);
      const profile =
        process.env.LOCAL_HOST_PORT +
        "public/file/" +
        category.name +
        "/" +
        extention.name +
        "/" +
        file.name;
      result.user.profile = profile;
      const group = await UserGroup.findByPk(user.role_id);
      result.user.role = group.role;
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, bio, profile_id } = req.body;
    user.name = name ? name : user.name;
    user.bio = bio ? bio : user.bio;
    user.profile_id = profile_id != 0 ? profile_id : user.profile_id;
    await user.save();
    res.status(200).json("user edited");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getFollowers = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await User.findByPk(_id);
    const followers = await User.getFollowers(user);
    res.status(200).json(followers);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
