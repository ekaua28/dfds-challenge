import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import { TABLE_DATE_FORMAT } from "~/lib/constants";
import type { ReturnType } from "~/pages/api/voyage/getAll";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" title="Click to see more.">
                            {voyage.unitTypes.length}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">
                                    Unit Types
                                </h4>

                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Default length</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {voyage.unitTypes?.map((unitType) => (
                                            <TableRow key={unitType.id}>
                                                <TableCell>{unitType.name}</TableCell>
                                                <TableCell align="right">
                                                    {unitType.defaultLength}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </TableCell>
            <TableCell>
                <Button onClick={() => onDelete(voyage.id)} variant="destructive">
                    X
                </Button>
            </TableCell>
        </TableRow>
    );
};
