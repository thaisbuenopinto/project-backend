export class HashManagerMock {
  public hash = async (plaintext: string): Promise<string> => {
    return "hash-mock";
  };

  public compare = async (
    plaintext: string,
    hash: string
  ): Promise<boolean> => {
    switch (plaintext) {
      case "fabio789":
        return hash === "hash-mock-fabio";

      case "astrodev99":
        return hash === "hash-mock-magic";

      default:
        return false;
    }
  };
}
