import { z } from "zod";

/**
 * Schema for validating voyage form data.
 *
 * The schema includes the following fields:
 * - `departure`: A required date field for the departure date.
 * - `arrival`: A required date field for the arrival date.
 * - `vessel`: A required string field for the vessel name, with a minimum length of 2 characters.
 * - `portOfLoading`: A required string field for the port of loading, with a minimum length of 1 character.
 * - `portOfDischarge`: A required string field for the port of discharge, with a minimum length of 1 character.
 * - `unitTypes`: A required array of strings representing unit types, with a minimum length of 5 elements.
 *
 * The schema also includes a refinement to ensure that the departure date is before the arrival date.
 */
export const VoyageFormSchema = z
  .object({
    departure: z.date({
      required_error: "A date is required.",
    }),
    arrival: z.date({
      required_error: "A date is required.",
    }),
    vessel: z.string().min(2, {
      message: "Vessel is a required field.",
    }),
    portOfLoading: z.string().min(1, {
      message: "Port of loading is a required field.",
    }),
    portOfDischarge: z.string().min(1, {
      message: "Port of discharge is a required field.",
    }),
    unitTypes: z.array(z.string()).refine((value) => value.length >= 5, {
      message: "You have to select at least five Unit Types.",
    }),
  })
  .refine(
    (data) => {
      const departure = new Date(data.departure);
      const arrival = new Date(data.arrival);
      return departure < arrival;
    },
    {
      message: "Departure must be before arrival date.",
      path: ["arrival"],
    },
  );

/**
 * Type inferred from the VoyageFormSchema.
 *
 * Represents the validated form data structure.
 */
export type VoyageFormSchemaType = z.infer<typeof VoyageFormSchema>;

/**
 * Default values for the voyage form.
 *
 * These values are used to initialize the form with default data.
 */
export const VoyageFormSchemaDefaultValue: VoyageFormSchemaType = {
  departure: new Date(),
  arrival: new Date(),
  portOfLoading: "",
  portOfDischarge: "",
  vessel: "",
  unitTypes: [],
};
