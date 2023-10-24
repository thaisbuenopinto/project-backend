import { PostsBusiness } from "../../src/business/PostsBusiness";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";
import { LikeDislikesInputDTO } from "../../src/dtos/likesDislikes/updateLikeDislike.dto";
import { Posts } from "../../src/models/Posts";

describe("testes no LikeDislike", () => {
  const postsBusiness = new PostsBusiness(
    new PostsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new UserDatabaseMock()
  );

  it("Deve executar o LikeDislike", async () => {
    const input: LikeDislikesInputDTO = {
      id: "id-mock-post-1",
      token: "token-mock-astrodev",
      like: true,
    };

    const output = await postsBusiness.LikeDislike(input);

    expect(output).toBeDefined();
  });

  it("Deve lançar um erro NotFoundError se o post não existir no LikeDislike", async () => {
    const input: LikeDislikesInputDTO = {
      id: "id-post-inexistente",
      token: "token-mock-fulano",
      like: true,
    };

    await expect(async () => {
      await postsBusiness.LikeDislike(input);
    }).rejects.toThrow(NotFoundError);
  });

  it("Deve testar o token inválido no LikeDislike", async () => {
    const input: LikeDislikesInputDTO = {
      id: "id-mock-post-1",
      token: "token-invalido",
      like: true,
    };

    await expect(async () => {
      await postsBusiness.LikeDislike(input);
    }).rejects.toThrow(BadRequestError);
  });

  it("Deve lançar um erro NotFoundError se o usuário for o dono do post", async () => {
    const input: LikeDislikesInputDTO = {
      id: "id-mock-post-1",
      token: "token-mock-fulano",
      like: true,
    };

    try {
      await postsBusiness.LikeDislike(input);
    } catch (error: any) {
      expect(error instanceof NotFoundError).toBe(true);
      expect(error.message).toBe(
        "Você não pode curtir/descurtir seu próprio Post"
      );
    }
  });

  it("Deve criar um objeto Post corretamente", () => {
    // Mock dos dados de entrada
    const postDB = {
      id: "id-123",
      creator_id: "user-123",
      content: "Este é um post de teste",
      likes: 10,
      dislikes: 5,
      created_at: "2023-09-20T10:00:00Z",
      updated_at: "2023-09-20T11:00:00Z",
      amount_comment: 0,
    };

    // Criar um objeto Post
    const post = new Posts(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at,
      postDB.amount_comment
    );

    // Verificar se o objeto foi criado corretamente
    expect(post).toBeDefined();
    expect(post.getId()).toBe(postDB.id);
    expect(post.getCreatorId()).toBe(postDB.creator_id);
    expect(post.getContent()).toBe(postDB.content);
    expect(post.getLikes()).toBe(postDB.likes);
    expect(post.getDislikes()).toBe(postDB.dislikes);
    expect(post.getCreatedAt()).toBe(postDB.created_at);
    expect(post.getUpdatedAt()).toBe(postDB.updated_at);
  });

  it("Deve dar like em um post", async () => {
    const input: LikeDislikesInputDTO = {
      id: "id-mock-post-1",
      token: "token-mock-astrodev",
      like: true,
    };

    const output = await postsBusiness.LikeDislike(input);

    expect(output.getLikes()).toBe(5);
    expect(output.getDislikes()).toBe(1);
  });

  it("Deve dar like ou dislike em um post baseado no valor de 'like'", async () => {
    const inputLike: LikeDislikesInputDTO = {
      id: "id-mock-post-1",
      token: "token-mock-astrodev",
      like: true,
    };

    const output = await postsBusiness.LikeDislike(inputLike);

    expect(output.getLikes()).toBe(6);
    expect(output.getDislikes()).toBe(1);
  });
});
