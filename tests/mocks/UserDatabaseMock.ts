import { USER_ROLES, UserDB } from "../../src/models/User";
import { BaseDatabase } from "../../src/database/BaseDatabase";

const usersMock: UserDB[] = [
  {
    id: "id-mock-fulano",
    name: "Fabio",
    email: "fabio@email.com",
    password: "hash-mock-fabio", 
    created_at: new Date().toISOString(),
    role: USER_ROLES.NORMAL,
  },
  {
    id: "id-mock-astrodev",
    name: "Magico",
    email: "magic@email.com",
    password: "hash-mock-magic", 
    created_at: new Date().toISOString(),
    role: USER_ROLES.ADMIN,
  },
];

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async findUsers(q: string | undefined): Promise<UserDB[]> {
    if (q) {
      return usersMock.filter((user) =>
        user.name.toLocaleLowerCase().includes(q.toLocaleLowerCase())
      );
    } else {
      return usersMock;
    }
  }

  public async findUserByEmail(email: string): Promise<UserDB | undefined> {
    return usersMock.filter((user) => user.email === email)[0];
  }

  public async findUserById(id: string): Promise<UserDB | undefined> {
    return usersMock.filter((user) => user.id === id)[0];
  }

  public async returnUserName(id: string): Promise<string> {
    return "";
  }

  public async insertUser(newUserDB: UserDB): Promise<void> {}

  public async updateUser(userDB: UserDB, emailToEdit: string): Promise<void> {}

  public async deleteUser(idToDelete: string): Promise<void> {}
}
