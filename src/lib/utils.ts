import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  QueryClient,
  InvalidateQueryFilters,
} from "@tanstack/react-query";

/**
 * Merges class names using clsx and twMerge.
 *
 * @param {ClassValue[]} inputs - The class names to merge.
 * @returns {string} The merged class name.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Processes data by sending a POST request to the specified path.
 *
 * @param {string} path - The API endpoint to send the request to.
 * @param {string} [method="POST"] - The HTTP method to use.
 * @param {HeadersInit} [headers] - The headers to include in the request.
 * @param {string} [body] - The body of the request.
 * @throws Will throw an error if the network response is not ok.
 */
export async function processData(
  path: string,
  method = "POST",
  headers?: HeadersInit,
  body?: string,
) {
  const response = await fetch(`/api/${path}`, {
    method,
    headers,
    body,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}

/**
 * Fetches data from the specified path.
 *
 * @param {string} path - The API endpoint to fetch data from.
 * @returns {Promise<any>} The fetched data.
 * @throws Will throw an error if the network response is not ok.
 */
export async function fetchData(path: string) {
  const response = await fetch(`/api/${path}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

/**
 * Invalidates the voyage queries in the query client.
 * 
 * @param {QueryClient} queryClient - The query client instance.
 * @returns {Promise<void>} A promise that resolves when the queries are invalidated.
 */
export const invalidateVoyages = async (queryClient: QueryClient) => {
  await queryClient.invalidateQueries(["voyages"] as InvalidateQueryFilters);
};
