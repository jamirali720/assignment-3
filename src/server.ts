import mongoose from "mongoose";
import configs from "./app/configs";
import app from "./app";
import { Server } from "http";

let server: Server;


  mongoose.set("strictQuery", true)
const databaseConnection = async () => {
  try {
    await mongoose.connect(configs.databaseUrl as string);
    console.log("Database connected successfully");
  } catch (error) {
    console.log((error as Error).message)
    console.error("database connection failed");
  }
};

server = app.listen(configs.port, () => {
    console.log(`My assignment-3 server is running on port ${configs.port}`)  
    databaseConnection();          
})


process.on("uncaughtException", () => {
  console.log("uncaughtException is detected. Server shutting down..");
  process.exit(1);
});


process.on("unhandledRejection", () => {
    console.log("unhandledRejection is detected. Server shutting down");
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    }
    process.exit(1);
  });