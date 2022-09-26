import Login from "../../../pages/login";
import { inputData, MockedWrapper } from "../shared";
import { render, RenderResult } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

let loginSubject: RenderResult;

beforeEach(() => {
  loginSubject = render(
    <MockedWrapper>
      <Login />
    </MockedWrapper>
  );
});

describe("User Login", () => {
  it("The login submit button must be disabled in this given case.", async () => {
    await inputData(loginSubject, "username", "");
    await inputData(loginSubject, "password", "");
    const btn = await loginSubject.findByTestId("submit-login");
    expect(btn.hasAttribute("disabled")).toBe(true);
  });

  it("The login submit button must be disabled in password is empty.", async () => {
    await inputData(loginSubject, "username", "test");
    await inputData(loginSubject, "password", "");
    const btn = await loginSubject.findByTestId("submit-login");
    expect(btn.hasAttribute("disabled")).toBe(true);
  });

  it("The login submit button must be disabled in password length less than 8 letters.", async () => {
    await inputData(loginSubject, "username", "test");
    await inputData(loginSubject, "password", "testing");
    const btn = await loginSubject.findByTestId("submit-login");
    expect(btn.hasAttribute("disabled")).toBe(true);
  });

  it("The login submit button must be disabled in username is empty", async () => {
    await inputData(loginSubject, "username", "");
    await inputData(loginSubject, "password", "testing123");
    const btn = await loginSubject.findByTestId("submit-login");
    expect(btn.hasAttribute("disabled")).toBe(true);
  });

  it("When the username and password are in the proper format, the login submit button must be active.", async () => {
    await inputData(loginSubject, "username", "test");
    await inputData(loginSubject, "password", "testing123");
    const btn = await loginSubject.findByTestId("submit-login");
    expect(btn.hasAttribute("disabled")).toBe(false);
  });
});
