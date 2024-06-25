import { useState } from "react";
import Head from "next/head";
import { useQueryClient } from "@tanstack/react-query";

import Layout from "~/components/layout/Layout";
import { VoyageTable } from "~/components/voyage";
import { useToast } from "~/components/ui/use-toast"

import { useDeleteVoyage } from "~/lib/hooks/useDeleteVoyage";
import { useGetAllVoyage } from "~/lib/hooks/useGetAllVoyage";
import { invalidateVoyages } from "~/lib/utils";
import { useGetAllUnitType } from "~/lib/hooks/useGetAllUnitType";
import { useCreateVoyage } from "~/lib/hooks/useCreateVoyage";
import { useGetAllVessel } from "~/lib/hooks/useGetAllVessel";
import { VoyageCreate } from "~/components/voyage/VoyageCreate";

export default function Home() {
  const { toast } = useToast()
  const [isOpen, setOpen] = useState(false);
  const { data: voyages } = useGetAllVoyage();
  const { data: vessels } = useGetAllVessel(isOpen);
  const { data: unitTypes } = useGetAllUnitType(isOpen);
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteVoyage } = useDeleteVoyage({
    onSuccess: async () => {
      toast({
        title: "Success!",
        description: "Voyage succesfully deleted",
      })
      await invalidateVoyages(queryClient);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Voyage not deleted",
      })
    }
  });
  const { mutate: mutateCreateVoyage } = useCreateVoyage({
    onSuccess: async () => {
      setOpen(false)
      toast({
        title: "Success!",
        description: "Voyage succesfully created",
      })
      await invalidateVoyages(queryClient);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Voyage not created",
      })
    }
  });

  return (
    <>
      <Head>
        <title>Voyages | DFDS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <VoyageCreate vessels={vessels ?? []} unitTypes={unitTypes ?? []} isOpen={isOpen} onSubmit={mutateCreateVoyage} setOpen={setOpen} />
        {voyages && <VoyageTable voyages={voyages} onDelete={mutateDeleteVoyage} />}
      </Layout>
    </>
  );
}
