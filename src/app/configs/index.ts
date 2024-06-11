import dotenv from "dotenv";
dotenv.config();

export default {
    port:process.env.PORT, 
    databaseUrl: process.env.NODE_ENV === "development"  ? process.env.MONGODB_DATABASE_LOCAL_URL :  process.env.MONGODB_DATABASE__PRODUCTION_URL, 
    
}