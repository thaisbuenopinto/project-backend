import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_NAME = "users";

  public async findUsers(q: string | undefined): Promise<UserDB[]> {
    let usersDB;

    if (q) {
      const result: UserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_NAME
      ).where("name", "LIKE", `%${q}%`);

      usersDB = result;
    } else {
      const result: UserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_NAME
      );

      usersDB = result;
    }

    return usersDB;
  }

  public async findUserByEmail(email: string): Promise<UserDB | undefined> {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase.connection(
      UserDatabase.TABLE_NAME
    ).where({ email });

    return userDB;
  }

  public async findUserById(id: string): Promise<UserDB | undefined> {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase.connection(
      UserDatabase.TABLE_NAME
    ).where({ id });

    return userDB;
  }

  public async returnUserName(id: string): Promise<string> {
    const [userDB]: UserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_NAME
    ).where({ id });

    return userDB.name;
  }

  public async insertUser(newUserDB: UserDB): Promise<void> {
    await BaseDatabase.connection(UserDatabase.TABLE_NAME).insert(newUserDB);
  }

  public async updateUser(userDB: UserDB, emailToEdit: string): Promise<void> {
    await BaseDatabase.connection(UserDatabase.TABLE_NAME)
      .update(userDB)
      .where({ email: emailToEdit });
  }

  public async deleteUser(email: string): Promise<void> {
    await BaseDatabase.connection(UserDatabase.TABLE_NAME)
      .del()
      .where({ email });
  }
}
