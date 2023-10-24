import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { GetUsersSchema } from "../endpoints/user/getUsers.dto";
import { ZodError } from "zod";
import { EditUserSchema } from "../endpoints/user/editUser.dto";
import { DeleteUserSchema } from "../endpoints/user/deleteUser.dto";
import { GetUserByTokenSchema } from "../endpoints/user/getUserByToken.dto";
import { BaseError } from "../errors/BaseError";
import { LoginSchema } from "../endpoints/user/login.dto";
import { SignupSchema } from "../endpoints/user/signup.dto";


export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public getUsers = async (req: Request, res: Response) => {
    try {
      const input = GetUsersSchema.parse({
        q: req.query.q,
      });

      const output = await this.userBusiness.getUsers(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public getUserByToken = async (req: Request, res: Response) => {
    try {
      const input = GetUserByTokenSchema.parse({
        token: req.headers.authorization,
      });

      const output = await this.userBusiness.getUserByToken(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public signup = async (req: Request, res: Response) => {
    try {
      const input = SignupSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const output = await this.userBusiness.signup(input);

      res.status(201).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password,
      });

      const output = await this.userBusiness.login(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public editUser = async (req: Request, res: Response) => {
    try {
      const input = EditUserSchema.parse({
        token: req.headers.authorization,
        emailToEdit: req.params.email,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const output = await this.userBusiness.editUser(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const input = DeleteUserSchema.parse({
        email: req.params.email,
        token: req.headers.authorization,
      });

      const output = await this.userBusiness.deleteUser(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
