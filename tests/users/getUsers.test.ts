import { UserBusiness } from "../../src/business/UserBusiness";
import { GetUsersSchema } from "../../src/endpoints/user/getUsers.dto";
import { USER_ROLES } from "../../src/models/User";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("Testando getUsers", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("deve retornar uma lista de users", async () => {
    const input = GetUsersSchema.parse({
      token: "token-mock-magic",
    });

    const output = await userBusiness.getUsers(input);

    expect(output).toHaveLength(2);
    expect(output).toContainEqual({
      id: "id-mock-magic",
      name: "Magico",
      email: "magic@email.com",
      createdAt: expect.any(String),
      role: USER_ROLES.ADMIN,
    });
  });
});
