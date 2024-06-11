import mongoose from "mongoose";
import configs from "./app/configs";
import app from "./app";

const databaseConnection= async() => {
    try {
        await mongoose.connect(configs.databaseUrl as string);
        console.log("Database connected successfully");
    } catch (error) {
       console.error(error);
        
    }
}

app.listen(configs.port, () => {
    console.log(`My assignment server is running on port ${configs.port}`)
    databaseConnection();
})