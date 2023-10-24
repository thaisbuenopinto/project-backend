import { PostsBusiness } from "../../src/business/PostsBusiness";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import {
  CreateCommentInputDTO,
  CreateCommentOutputDTO,
} from "../../src/dtos/coments/createComment.dto";

describe("Testes no createComment", () => {
  const postsBusiness = new PostsBusiness(
    new PostsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new UserDatabaseMock()
  );

  it("Deve criar um novo comentário", async () => {
    const input: CreateCommentInputDTO = {
      content: "Este é um novo comentário",
      token: "token-mock-fulano",
      postId: "id-mock-post-1",
      likes: 0,
      dislikes: 0,
    };

    const output: CreateCommentOutputDTO = await postsBusiness.createComment(
      input
    );

    expect(output).toBeDefined();
  });

  it("Deve lançar um erro ao usar um token inválido", async () => {
    const input: CreateCommentInputDTO = {
      content: "Este é um novo comentário",
      token: "token-invalido",
      postId: "id-mock-post-1",
      likes: 0,
      dislikes: 0,
    };

    await expect(async () => {
      await postsBusiness.createComment(input);
    }).rejects.toThrow(BadRequestError);
  });

  it("Deve lançar um erro ao tentar comentar em um post inexistente", async () => {
    const input: CreateCommentInputDTO = {
      content: "Este é um novo comentário",
      token: "token-mock-fulano",
      postId: "post-inexistente",
      likes: 0,
      dislikes: 0,
    };

    await expect(async () => {
      await postsBusiness.createComment(input);
    }).rejects.toThrow(BadRequestError);
  });
});
