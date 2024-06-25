import { useQuery } from "@tanstack/react-query";
import { fetchData } from "~/lib/utils";
import type { ReturnType } from "~/pages/api/voyage/getAll";

/**
 * Custom hook to fetch all voyages using react-query's useQuery.
 *
 * @param {boolean} [enabled=true] - Boolean flag to enable or disable the query.
 * @returns {UseQueryResult<ReturnType>} The result of the query, including status and data.
 */
export const useGetAllVoyage = (enabled = true) => {
  return useQuery<ReturnType>({
    queryKey: ["voyages"],
    queryFn: () => fetchData("voyage/getAll"),
    enabled,
  });
};
