import { ZodError } from "zod";
import { UserBusiness } from "../../src/business/UserBusiness";
import { SignupSchema } from "../../src/endpoints/user/signup.dto";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { BadRequestError } from "../../src/errors/BadRequestError";

describe("Testando signup", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("deve gerar um token ao cadastrar", async () => {
    const input = SignupSchema.parse({
      name: "Catarina",
      email: "catarina@email.com",
      password: "catarina789",
    });

    const output = await userBusiness.signup(input);

    expect(output).toEqual({
      message: "Cadastro realizado com sucesso",
      token: "token-mock",
    });
  });

  test("deve disparar erro se o name não possuir pelo menos 2 char", async () => {
    expect.assertions(1);

    try {
      const input = SignupSchema.parse({
        name: "Catarina",
        email: "catarina@email.com",
        password: "catarina789",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe(
          "Nome deve conter pelo menos 2 caracteres."
        );
      }
    }
  });

  test("deve disparar erro caso e-mail já exista", async () => {
    expect.assertions(2);

    try {
      const input = SignupSchema.parse({
        name: "Fabio",
        email: "fabio@email.com",
        password: "fabio789",
      });

      const output = await userBusiness.signup(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe("Email já cadastrado");
      }
    }
  });
});
