import { useQuery } from "@tanstack/react-query";
import { fetchData } from "~/lib/utils";
import type { ReturnType } from "~/pages/api/voyage/getAll";

export const useGetAllVoyage = () => {
  return useQuery<ReturnType>({
    queryKey: ["voyages"],
    queryFn: () => fetchData("voyage/getAll"),
  });
};
