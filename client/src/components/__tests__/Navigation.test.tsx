import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navigation } from '../ui/navigation';

// Mock wouter router
vi.mock('wouter', () => ({
  Link: ({ children, href, onClick }: { children: React.ReactNode; href: string; onClick?: () => void }) => (
    <a href={href} onClick={onClick}>{children}</a>
  ),
  useLocation: () => ['/'],
}));

// Mock theme toggle component
vi.mock('../theme-toggle', () => ({
  ThemeToggle: () => <button aria-label="Toggle theme">Theme</button>,
}));

describe('Navigation Component', () => {
  it('renders navigation with logo', () => {
    render(<Navigation />);
    expect(screen.getByText(/one for all/i)).toBeInTheDocument();
    expect(screen.getByText(/coaching/i, { selector: 'span' })).toBeInTheDocument();
  });

  it('renders main navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about dave/i)).toBeInTheDocument();
    expect(screen.getByText(/1-2-1 coaching/i)).toBeInTheDocument();
    expect(screen.getByText(/group sessions/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('renders authentication and booking buttons', () => {
    render(<Navigation />);
    expect(screen.getByText(/parent login/i)).toBeInTheDocument();
    expect(screen.getByText(/book now/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    render(<Navigation />);
    const menuButtons = screen.getAllByRole('button');
    expect(menuButtons.length).toBeGreaterThan(0);
  });

  it('renders theme toggle', () => {
    render(<Navigation />);
    expect(screen.getByLabelText(/toggle theme/i)).toBeInTheDocument();
  });
});