import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button', () => {
    it('renders the Button with default variant and size', () => {
        render(<Button>Default Button</Button>);
        const buttonElement = screen.getByRole('button', { name: /Default Button/i });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('bg-primary text-primary-foreground');
    });

    it('renders the Button with destructive variant', () => {
        render(<Button variant="destructive">Destructive Button</Button>);
        const buttonElement = screen.getByRole('button', { name: /Destructive Button/i });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('bg-destructive text-destructive-foreground');
    });

    it('renders the Button with small size', () => {
        render(<Button size="sm">Small Button</Button>);
        const buttonElement = screen.getByRole('button', { name: /Small Button/i });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('h-8 rounded-md px-3 text-xs');
    });

    it('renders the Button as a child component', () => {
        render(
            <Button asChild>
                <a href="/test">Link Button</a>
            </Button>
        );
        const linkElement = screen.getByRole('link', { name: /Link Button/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/test');
    });
});
