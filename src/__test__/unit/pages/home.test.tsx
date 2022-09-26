import Home from "../../../pages/home";
import { MockedWrapper } from "../shared";
import { render, RenderResult } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useGetServers } from "../../../hooks/useGetServers";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

let homeSubject: RenderResult;

beforeEach(() => {
  homeSubject = render(
    <MockedWrapper>
      <Home />
    </MockedWrapper>
  );
});

describe("Home Page", () => {
  it("initial state show skeleton", async () => {
    const { result, waitForNextUpdate } = renderHook(useGetServers, {
      wrapper: MockedWrapper,
    });
    expect(result.current.isLoading).toBe(true);
    const skeleton = await homeSubject.findByTestId("home-skeleton");
    expect(skeleton).not.toBeNull();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
  });

  it("Skeleton must be deleted upon loading completion.", async () => {
    const { result, waitForNextUpdate } = renderHook(useGetServers, {
      wrapper: MockedWrapper,
    });
    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    const skeleton = await homeSubject.queryByTestId("home-skeleton");
    expect(skeleton).toBeNull();
    const serversList = await homeSubject.queryByTestId("home-server-list");
    expect(serversList).not.toBeNull();
  });
});
