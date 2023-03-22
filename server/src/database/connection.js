const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const con = await mongoose.connect(process.env.MONGODB_HOST_PORT);
    console.log(
      `MongoDB connected : ${con.connection.host}://${con.connection.port}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
