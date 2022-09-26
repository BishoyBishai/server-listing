import { isPublicAPI } from "../../../utils/isPublicAPI";

describe("Is Public API ", () => {
  it("/token has to return true", () => {
    expect(isPublicAPI("/tokens")).toBe(true);
  });

  it("/servers has to return false", () => {
    expect(isPublicAPI("/servers")).toBe(false);
  });
});
