import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from './Table';

describe('Table components', () => {
    it('renders the Table component', () => {
        render(
            <Table>
                <TableCaption>Test Table</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Header</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Body Cell</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Footer Cell</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );

        expect(screen.getByText('Test Table')).toBeInTheDocument();
        expect(screen.getByText('Header')).toBeInTheDocument();
        expect(screen.getByText('Body Cell')).toBeInTheDocument();
        expect(screen.getByText('Footer Cell')).toBeInTheDocument();
    });

    it('applies custom classes to Table components', () => {
        render(
            <Table className="custom-table">
                <TableHeader className="custom-header">
                    <TableRow className="custom-row">
                        <TableHead className="custom-head">Header</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="custom-body">
                    <TableRow className="custom-row">
                        <TableCell className="custom-cell">Body Cell</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter className="custom-footer">
                    <TableRow className="custom-row">
                        <TableCell className="custom-cell">Footer Cell</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );

        expect(screen.getByText('Header').closest('th')).toHaveClass('custom-head');
        expect(screen.getByText('Body Cell').closest('td')).toHaveClass('custom-cell');
        expect(screen.getByText('Footer Cell').closest('td')).toHaveClass('custom-cell');
    });
});
