import { useQueryClient } from "@tanstack/react-query";
import Head from "next/head";
import Layout from "~/components/layout/Layout";
import { VoyageTable } from "~/components/voyage";
import { useDeleteVoyage } from "~/hooks/useDeleteVoyage";
import { useGetAllVoyage } from "~/hooks/useGetAllVoyage";
import { invalidateVoyages } from "~/utils";

export default function Home() {
  const { data: voyages } = useGetAllVoyage();
  const queryClient = useQueryClient();
  const { mutate: mutateDeleteVoyage } = useDeleteVoyage({
    onSuccess: async () => {
      await invalidateVoyages(queryClient);
    },
  });

  return (
    <>
      <Head>
        <title>Voyages | DFDS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {voyages && <VoyageTable voyages={voyages} onDelete={mutateDeleteVoyage} />}
      </Layout>
    </>
  );
}
