const Sequelize = require("sequelize");
const DATABASE_USERNAME='oda_mitigation'
const DATABASE_PASSWORD='l06a1tIg47iON0_k1'
const DATABASE_NAME='oda_mitigation'
const DATABASE_HOST='oda-mitigation.cufsujjwdaiu.eu-west-2.rds.amazonaws.com'
const sequelize = new Sequelize(
    DATABASE_NAME,
	DATABASE_USERNAME,
    DATABASE_PASSWORD,
	{
		host:  DATABASE_HOST,
		dialect: "postgres",

		pool: {
			max: 5,
			min: 0,
			idle: 10000,
		},
	}
);
sequelize
	.authenticate()
	.then(() => {
		console.log("succesfully connected");
	})
	.catch(e => {
		console.log("error from connceting to sequelize", e);
	});
module.exports = sequelize;