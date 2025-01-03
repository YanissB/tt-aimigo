import MockAdapter from "axios-mock-adapter";
import apiClient from "../../../api/apiClient";
import { fetchPopularMovies } from "../../../api/tmdbApi";

describe("fetchPopularMovies", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("should fetch popular movies successfully", async () => {
    const mockData = { results: [{ id: 1, title: "Popular Movie 1" }] };
    mock.onGet("/movie/popular").reply(200, mockData);

    const data = await fetchPopularMovies(1, "fr-FR");
    expect(data).toEqual(mockData);
  });

  it("should handle API errors when fetching popular movies", async () => {
    mock.onGet("/movie/popular").reply(500);

    await expect(fetchPopularMovies(1, "fr-FR")).rejects.toThrow();
  });
});
