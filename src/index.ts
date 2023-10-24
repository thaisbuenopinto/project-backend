import express from "express";
import cors from "cors";
import { postsRouter } from "./router/postsRouter";
import { userRouter } from "./router/userRouter";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

app.use("/users", userRouter);
app.use("/posts", postsRouter);
