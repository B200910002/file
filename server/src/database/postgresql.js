const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: "postgres",
});

const connect = async () => {
  sequelize
    .sync()
    .then(() => {
      console.log("Database synchronized");
    })
    .catch((e) => {
      console.log(e.message);
    });
};

module.exports.sequelize = sequelize;
module.exports.connect = connect;
