import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VoyageRow } from './VoyageRow';
import { Table, TableBody } from "~/components/ui/table/Table";
import type { ReturnType } from '~/pages/api/voyage/getAll';
import { TABLE_DATE_FORMAT } from '~/constants';
import { format } from 'date-fns';

const voyage: ReturnType[number] = {
    id: '1',
    scheduledDeparture: new Date('2024-06-24T00:00:00.000Z'),
    scheduledArrival: new Date('2024-06-25T00:00:00.000Z'),
    portOfLoading: 'Port A',
    portOfDischarge: 'Port B',
    vesselId: 'vessel-1',
    vessel: { id: "vessel-1", name: 'Vessel A', createdAt: new Date('2024-06-24T00:00:00.000Z'), updatedAt: new Date('2024-06-24T00:00:00.000Z') },
    unitTypes: [],
    createdAt: new Date('2023-01-01T00:00:00.000Z'),
    updatedAt: new Date('2023-01-01T00:00:00.000Z')
};

describe('VoyageRow', () => {
    it('renders voyage details correctly', () => {
        render(
            <Table>
                <TableBody>
                    <VoyageRow voyage={voyage} onDelete={jest.fn()} />
                </TableBody>
            </Table>
        );

        expect(screen.getByText(format(new Date(voyage.scheduledDeparture), TABLE_DATE_FORMAT))).toBeInTheDocument();
        expect(screen.getByText(format(new Date(voyage.scheduledArrival), TABLE_DATE_FORMAT))).toBeInTheDocument();
        expect(screen.getByText('Port A')).toBeInTheDocument();
        expect(screen.getByText('Port B')).toBeInTheDocument();
        expect(screen.getByText('Vessel A')).toBeInTheDocument();
    });

    it('calls onDelete when delete button is clicked', () => {
        const onDeleteMock = jest.fn();
        render(
            <Table>
                <TableBody>
                    <VoyageRow voyage={voyage} onDelete={onDeleteMock} />
                </TableBody>
            </Table>
        );

        const deleteButton = screen.getByRole('button', { name: /X/i });
        fireEvent.click(deleteButton);

        expect(onDeleteMock).toHaveBeenCalledWith('1');
    });
});
