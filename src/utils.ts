import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  QueryClient,
  InvalidateQueryFilters,
} from "@tanstack/react-query";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Relative path /api/${path}
 * @param path
 * @returns
 */
export async function fetchData(path: string, method: string = "GET") {
  const response = await fetch(`/api/${path}`, {
    method,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export const invalidateVoyages = async (queryClient: QueryClient) => {
  await queryClient.invalidateQueries(["voyages"] as InvalidateQueryFilters);
};
