import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VoyageTable } from './VoyageTable';
import type { ReturnType } from '~/pages/api/voyage/getAll';
import { format } from 'date-fns';
import { TABLE_DATE_FORMAT } from '~/lib/constants';

const voyages: ReturnType = [
    {
        id: '1',
        scheduledDeparture: new Date('2024-06-24T00:00:00.000Z'),
        scheduledArrival: new Date('2024-06-25T00:00:00.000Z'),
        portOfLoading: 'Port A',
        portOfDischarge: 'Port B',
        vesselId: 'vessel-1',
        vessel: {
            id: 'vessel-1',
            name: 'Vessel A',
            createdAt: new Date('2023-01-01T00:00:00.000Z'),
            updatedAt: new Date('2023-01-01T00:00:00.000Z')
        },
        unitTypes: [],
        createdAt: new Date('2023-01-01T00:00:00.000Z'),
        updatedAt: new Date('2023-01-01T00:00:00.000Z')
    }
];

describe('VoyageTable', () => {
    it('renders voyage table correctly', () => {
        render(<VoyageTable voyages={voyages} onDelete={jest.fn()} />);

        expect(screen.getByText('Departure')).toBeInTheDocument();
        expect(screen.getByText('Arrival')).toBeInTheDocument();
        expect(screen.getByText('Port of loading')).toBeInTheDocument();
        expect(screen.getByText('Port of discharge')).toBeInTheDocument();
        expect(screen.getByText('Vessel')).toBeInTheDocument();

        expect(screen.getByText(format(new Date('2024-06-24T00:00:00.000Z'), TABLE_DATE_FORMAT))).toBeInTheDocument();
        expect(screen.getByText(format(new Date('2024-06-25T00:00:00.000Z'), TABLE_DATE_FORMAT))).toBeInTheDocument();
        expect(screen.getByText('Port A')).toBeInTheDocument();
        expect(screen.getByText('Port B')).toBeInTheDocument();
        expect(screen.getByText('Vessel A')).toBeInTheDocument();
    });

    it('calls onDelete when delete button is clicked', () => {
        const onDeleteMock = jest.fn();
        render(<VoyageTable voyages={voyages} onDelete={onDeleteMock} />);

        const deleteButton = screen.getByRole('button', { name: /X/i });
        fireEvent.click(deleteButton);

        expect(onDeleteMock).toHaveBeenCalledWith('1');
    });
});
