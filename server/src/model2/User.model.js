const { db } = require("../database/postgresql");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

class User {
  constructor() {}

  static async find() {
    const result = await db.query("select * from users");
    return result.rows;
  }

  static async login(email, password) {
    const user = await db.query("select * from users where email = $1", [
      email,
    ]);
    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (isPasswordValid) {
      return jwt.sign(
        { _id: user.rows[0]._id, email: user.rows[0].email },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "1d",
        }
      );
    } else {
      throw Error("Incorrect password");
    }
  }

  static async regist(email, password, repassword) {
    if (!email || !password) {
      throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    if (password !== repassword) {
      throw Error("Password not matched");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    const newPassword = await bcrypt.hash(password, 10);

    return db.query("insert into users (email, password) values ($1,$2);", [
      email,
      newPassword,
    ]);
  }

  static async checkToken(token) {
    if (!token) {
      throw new Error("Not authorized, please login");
    }
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await db.query("select * from users where _id = $1", [
      verified._id,
    ]);
    return user.rows[0];
  }

  static async changePassword(
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
      await db.query("update users set password = $2 where _id = $1", [
        user._id,
        hashedPassword,
      ]);
    }
    return "Password changed";
  }

  static async edit({ _id, name }) {
    const result = await db.query("update users set name = $2 where _id = $1", [
      _id,
      name,
    ]);
    return result.rows;
  }
}

module.exports.User = User;
