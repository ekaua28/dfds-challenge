import { useQuery } from "@tanstack/react-query";
import { fetchData } from "~/lib/utils";
import type { VesselsType } from "~/pages/api/vessel/getAll";

/**
 * Custom hook to fetch all vessels using react-query's useQuery.
 *
 * @param {boolean} [enabled=true] - Boolean flag to enable or disable the query.
 * @returns {UseQueryResult<VesselsType>} The result of the query, including status and data.
 */
export const useGetAllVessel = (enabled = true) => {
  return useQuery<VesselsType>({
    queryKey: ["vessels"],
    queryFn: () => fetchData("vessel/getAll"),
    enabled,
  });
};
