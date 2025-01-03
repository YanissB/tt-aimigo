import axios from "axios";

const mockAxiosInstance = axios.create();

jest.mock("@/api/apiClient", () => {
  return {
    __esModule: true,
    default: mockAxiosInstance,
  };
});
