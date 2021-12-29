const { Sequelize } = require("sequelize");
console.log(process.env.DEBUG)

const sequelize = new Sequelize(process.env.MYSQL_CONNECTION_STRING);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection Established");
  })
  .catch((err) => {
    console.log(err, "Connection Failed");
  });

module.exports = sequelize;