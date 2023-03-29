const { sequelize } = require("../database/postgresql");
const { DataTypes } = require("sequelize");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const UserGroup = sequelize.define("usergroup", {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  role: { type: DataTypes.STRING, unique: true, allowNull: false },
  desciption: { type: DataTypes.STRING, allowNull: false },
});

const User = sequelize.define("user", {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  verified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "usergroups", key: "_id" },
  },
  profile_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: "files", key: "_id" },
  },
});

User.regist = async function (email, password, repassword) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (await this.findOne({ email })) {
    throw Error("Email already in register");
  }
  if (password !== repassword) {
    throw Error("Password not matched");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const userGroup = await UserGroup.findOne({ role: "User" });

  const newPassword = await bcrypt.hash(password, 10);

  const user = await this.create({
    email: email,
    password: newPassword,
    role_id: userGroup._id,
  });

  return user;
};

User.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  const user = await this.findOne({ email: email });
  if (!user) {
    throw Error("Invalid email");
  }
  // if (!user.verified) {
  //   throw Error("This email not verified please veryfy email");
  // }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    return jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "1d",
      }
    );
  } else {
    throw Error("Incorrect password");
  }
};

User.checkToken = async function (token) {
  if (!token) {
    throw new Error("Not authorized, please login");
  }
  const verified = jwt.verify(token, process.env.SECRET_TOKEN);
  const user = await this.findByPk(verified._id);
  if (!user) {
    throw new Error("Token not found or token has expired, please login");
  }
  return user;
};

User.changePassword = async function (
  user,
  oldPassword,
  newPassword,
  repeatNewPassword
) {
  if (!oldPassword || !newPassword || !repeatNewPassword) {
    throw new Error("All fields must be filled");
  }
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new Error("Old password is not valid");
  }
  if (newPassword !== repeatNewPassword) {
    throw new Error("Password not matched");
  }
  if (!validator.isStrongPassword(newPassword)) {
    throw Error("Password not strong enough");
  }
  if (user && isPasswordValid) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
  }
  return "Password changed";
};

module.exports.User = User;
module.exports.UserGroup = UserGroup;
