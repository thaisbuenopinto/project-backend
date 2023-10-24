import { USER_ROLES } from "../../src/models/User";
import { TokenPayload } from "../../src/services/TokenManager";

export class TokenManagerMock {
  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
     
      return "token-mock";
    } else if (payload.id === "id-mock-fabio") {
     
      return "token-mock-fabio";
    } else {
 
      return "token-mock-magic";
    }
  };

  public getPayload = (token: string): TokenPayload | null => {
    if (token === "token-mock-fabio") {
      return {
        id: "id-mock-fabio",
        name: "Fulano",
        role: USER_ROLES.NORMAL,
      };
    } else if (token === "token-mock-astrodev") {
      return {
        id: "id-mock-magic",
        name: "Magico",
        role: USER_ROLES.ADMIN,
      };
    } else {
      return null;
    }
  };
}
