const { Token } = require("../model/token.model");
// const { User } = require("../model/User.model");
const { User, UserGroup } = require("../model2/User.model");

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
    res.status(201).json({ isAuthenticated: true, user: user });
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

exports.editUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { name } = req.body;
    await User.edit({ _id: user._id, name: name });
    res.status(200).json("user edited");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
