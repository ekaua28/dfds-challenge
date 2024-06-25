import { z } from "zod";

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
