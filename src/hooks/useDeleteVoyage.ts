import { useMutation } from "@tanstack/react-query";
import { fetchData } from "~/utils";

type useDeleteVoyageProps = {
  onSuccess: () => Promise<void>;
  onError?: (error?: Error) => Promise<void>;
};

export const useDeleteVoyage = ({
  onSuccess,
  onError,
}: useDeleteVoyageProps) => {
  return useMutation({
    mutationFn: (voyageId: string) =>
      fetchData(`voyage/delete?id=${voyageId}`, "DELETE"),
    onSuccess,
    onError,
  });
};
