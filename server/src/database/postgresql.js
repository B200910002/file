// const { Client } = require("pg");

// const postgreSQL = new Client({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// const connect = async () => {
//   try {
//     await postgreSQL.connect();
//     console.log(
//       `PostgreSQL connected : ${postgreSQL.host}://${postgreSQL.port}`
//     );
//   } catch (e) {
//     console.log(e.message);
//     process.exit(1);
//   }
// };

// module.exports.connect = connect;
// module.exports.db = postgreSQL;

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("file", "postgres", "postgresql", {
  host: "localhost",
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
