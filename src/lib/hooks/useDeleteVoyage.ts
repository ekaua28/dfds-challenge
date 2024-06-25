import { useMutation } from "@tanstack/react-query";
import { processData } from "~/lib/utils";

/**
 * Properties for the useDeleteVoyage hook.
 *
 * @typedef {Object} useDeleteVoyageProps
 * @property {() => Promise<void>} onSuccess - Function to call on successful mutation.
 * @property {(error?: Error) => Promise<void> | void} [onError] - Optional function to call on mutation error.
 */
type useDeleteVoyageProps = {
  onSuccess: () => Promise<void>;
  onError?: (error?: Error) => Promise<void> | void;
};

/**
 * Custom hook to delete a voyage using react-query's useMutation.
 *
 * @param {useDeleteVoyageProps} props - The properties for the mutation hook.
 * @returns {UseMutationResult} The result of the mutation hook.
 */
export const useDeleteVoyage = ({
  onSuccess,
  onError,
}: useDeleteVoyageProps) => {
  return useMutation({
    mutationFn: (voyageId: string) =>
      processData(`voyage/delete?id=${voyageId}`, "DELETE"),
    onSuccess,
    onError,
  });
};
