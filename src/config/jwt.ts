import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";
dotenv.config;
const JWT_SECRET:Secret = process.env.JWT_SECRET_KEY as string;

export default JWT_SECRET;
