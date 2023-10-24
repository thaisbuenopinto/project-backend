import express from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { PostsController } from "../controller/PostsController";
import { PostsDatabase } from "../database/PostsDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { UserDatabase } from "../database/UserDatabase";

export const postsRouter = express.Router();

const postsController = new PostsController(
  new PostsBusiness(
    new PostsDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new UserDatabase()
  )
);

postsRouter.get("/", postsController.getPosts);
postsRouter.get("/comment/:id", postsController.getComments);
postsRouter.post("/", postsController.createPost);
postsRouter.post("/comment/:id", postsController.createComment);
postsRouter.put("/:id", postsController.editPost);
postsRouter.put("/:id/like", postsController.LikeDislike);
postsRouter.delete("/:id", postsController.deletePost);
