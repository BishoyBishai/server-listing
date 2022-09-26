import "@testing-library/jest-dom";

import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

jest.mock("axios", () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    create: () => {
      return {
        interceptors: {
          request: { use: jest.fn() },
        },
      };
    },
  };
});
