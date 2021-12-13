const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mysql://root:yK8@Rpf@Ta@localhost:3306/quizdb");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection Established");
  })
  .catch((err) => {
    console.log(err, "Connection Failed");
  });

module.exports = sequelize;
