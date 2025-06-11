import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./api/v1/routes/users/index";
import { PrismaClient } from "@prisma/client";
import authenRoutes from "./api/v1/routes/authen/index";

const prisma = new PrismaClient();
export default prisma;

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/authen', authenRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

