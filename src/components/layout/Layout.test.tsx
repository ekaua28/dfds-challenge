// src/components/layout/Layout.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './Layout';

describe('Layout', () => {
    it('renders the layout with children', () => {
        const { getByText, getByAltText } = render(
            <Layout>
                <div>Test Child</div>
            </Layout>
        );

        const logo = getByAltText('DFDS logo');
        expect(logo).toBeInTheDocument();

        const child = getByText('Test Child');
        expect(child).toBeInTheDocument();
    });
});
