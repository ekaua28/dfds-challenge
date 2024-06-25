import { useMutation } from "@tanstack/react-query";
import { processData } from "~/lib/utils";
import type { VoyageFormSchemaType } from "~/lib/schemas/VoyageFormSchema";

/**
 * Properties for the useCreateVoyage hook.
 *
 * @typedef {Object} useCreateVoyageProps
 * @property {() => Promise<void>} onSuccess - Function to call on successful mutation.
 * @property {(error?: Error) => Promise<void> | void} [onError] - Optional function to call on mutation error.
 */
type useCreateVoyageProps = {
  onSuccess: () => Promise<void>;
  onError?: (error?: Error) => Promise<void> | void;
};

/**
 * Custom hook to create a voyage using react-query's useMutation.
 *
 * @param {useCreateVoyageProps} props - The properties for the mutation hook.
 * @returns {UseMutationResult} The result of the mutation hook.
 */
export const useCreateVoyage = ({
  onSuccess,
  onError,
}: useCreateVoyageProps) => {
  return useMutation({
    mutationFn: (data: VoyageFormSchemaType) =>
      processData(
        `voyage/create`,
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify(data),
      ),

    onError,
    onSuccess,
  });
};
