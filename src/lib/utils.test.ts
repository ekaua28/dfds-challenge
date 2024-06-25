import { cn, processData, fetchData, invalidateVoyages } from "./utils";
import { QueryClient } from "@tanstack/react-query";

global.fetch = jest.fn();

describe("Utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
      expect(cn("class1", false && "class2")).toBe("class1");
      expect(cn("class1", undefined)).toBe("class1");
    });
  });

  describe("processData", () => {
    beforeEach(() => {
      (fetch as jest.Mock).mockClear();
    });

    it("should send a POST request and return response", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => ({ message: "success" }),
      });

      await processData("test-path", "POST", { "Content-Type": "application/json" }, JSON.stringify({ key: "value" }));

      expect(fetch).toHaveBeenCalledWith("/api/test-path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "value" }),
      });
    });

    it("should throw an error if the network response is not ok", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(processData("test-path")).rejects.toThrow("Network response was not ok");
    });
  });

  describe("fetchData", () => {
    beforeEach(() => {
      (fetch as jest.Mock).mockClear();
    });

    it("should fetch data from the given path", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => ({ data: "mocked data" }),
      });

      const data = await fetchData("test-path");
      expect(data).toEqual({ data: "mocked data" });
      expect(fetch).toHaveBeenCalledWith("/api/test-path");
    });

    it("should throw an error if the network response is not ok", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(fetchData("test-path")).rejects.toThrow("Network response was not ok");
    });
  });

  describe("invalidateVoyages", () => {
    it("should invalidate voyage queries", async () => {
      const queryClient = new QueryClient();
      queryClient.invalidateQueries = jest.fn().mockResolvedValueOnce(undefined);

      await invalidateVoyages(queryClient);
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith(["voyages"]);
    });
  });
});
