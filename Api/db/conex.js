import { Sequelize } from "sequelize";

const sequelize = new Sequelize("marcy", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// testing connection
try {
  await sequelize.authenticate();
  console.log("conexión establecida correctamente.");
} catch (error) {
  console.error("error en la conexión:", error);
}
