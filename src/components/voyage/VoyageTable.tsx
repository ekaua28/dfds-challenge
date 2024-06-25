import { Table, TableBody, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import type { ReturnType } from "~/pages/api/voyage/getAll";
import { VoyageRow } from "./VoyageRow";

interface VoyageTableProps {
    voyages: ReturnType;
    onDelete: (voyageId: string) => void;
}

export const VoyageTable: React.FC<VoyageTableProps> = ({ voyages, onDelete }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Departure</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Port of loading</TableHead>
                    <TableHead>Port of discharge</TableHead>
                    <TableHead>Vessel</TableHead>
                    <TableHead>Unit Types</TableHead>
                    <TableHead>&nbsp;</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {voyages.map((voyage) => (
                    <VoyageRow key={voyage.id} voyage={voyage} onDelete={onDelete} />
                ))}
            </TableBody>
        </Table>
    );
};
