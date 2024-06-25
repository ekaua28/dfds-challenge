import { useQuery } from "@tanstack/react-query";
import { fetchData } from "~/lib/utils";
import type { VesselsType } from "~/pages/api/unitType/getAll";

/**
 * Custom hook to fetch all unit types using react-query's useQuery.
 *
 * @param {boolean} [enabled=true] - Boolean flag to enable or disable the query.
 * @returns {UseQueryResult<VesselsType>} The result of the query, including status and data.
 */
export const useGetAllUnitType = (enabled = true) => {
  return useQuery<VesselsType>({
    queryKey: ["unitTypes"],
    queryFn: () => fetchData("unitType/getAll"),
    enabled,
  });
};
