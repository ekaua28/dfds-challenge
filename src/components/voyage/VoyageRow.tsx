import { TableCell, TableRow } from "~/components/ui/table/Table";
import { format } from "date-fns";
import { Button } from "~/components/ui/button/Button";
import { TABLE_DATE_FORMAT } from "~/constants";
import type { ReturnType } from "~/pages/api/voyage/getAll";

type voyage = ReturnType[number];

interface VoyageRowProps {
    voyage: voyage;
    onDelete: (voyageId: string) => void;
}

export const VoyageRow: React.FC<VoyageRowProps> = ({ voyage, onDelete }) => {
    return (
        <TableRow>
            <TableCell>{format(new Date(voyage.scheduledDeparture), TABLE_DATE_FORMAT)}</TableCell>
            <TableCell>{format(new Date(voyage.scheduledArrival), TABLE_DATE_FORMAT)}</TableCell>
            <TableCell>{voyage.portOfLoading}</TableCell>
            <TableCell>{voyage.portOfDischarge}</TableCell>
            <TableCell>{voyage.vessel.name}</TableCell>
            <TableCell>
                <Button onClick={() => onDelete(voyage.id)} variant="outline">
                    X
                </Button>
            </TableCell>
        </TableRow>
    );
};
