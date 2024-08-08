import "reflect-metadata";
import express, { Express } from "express";
import sequelize from "./database/db";
import router from "./routes/Router";
const app: Express = express();

app.use(express.json());

app.use("/api", router);

const startDataBaseConnection = (): void => {
  try {
    sequelize.authenticate();
    console.log("Connected to the database");
    // sequelize.sync();
    // sequelize.sync({force: true});
    sequelize.sync({ alter: true });
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    throw new Error("Error connecting to the database");
  }
};

startDataBaseConnection();
