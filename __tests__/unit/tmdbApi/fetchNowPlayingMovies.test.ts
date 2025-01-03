import MockAdapter from "axios-mock-adapter";
import apiClient from "../../../api/apiClient";
import { fetchNowPlayingMovies } from "../../../api/tmdbApi";

describe("fetchNowPlayingMovies", () => {
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

  it("should fetch now playing movies successfully", async () => {
    const mockData = { results: [{ id: 1, title: "Now Playing Movie 1" }] };
    mock.onGet("/movie/now_playing").reply(200, mockData);

    const data = await fetchNowPlayingMovies(1, "fr-FR");
    expect(data).toEqual(mockData);
  });

  it("should handle API errors when fetching now playing movies", async () => {
    mock.onGet("/movie/now_playing").reply(500);

    await expect(fetchNowPlayingMovies(1, "fr-FR")).rejects.toThrow();
  });
});
