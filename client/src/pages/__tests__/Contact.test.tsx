import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Contact from '../contact';

// Mock wouter router
vi.mock('wouter', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Create a test query client
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

// Wrapper component for tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('Contact Page', () => {
  it('renders contact page header', () => {
    render(<Contact />, { wrapper: TestWrapper });
    expect(screen.getByText(/contact/i, { selector: 'span' })).toBeInTheDocument();
  });

  it('renders contact form fields', () => {
    render(<Contact />, { wrapper: TestWrapper });
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders service selection options', () => {
    render(<Contact />, { wrapper: TestWrapper });
    expect(screen.getByText(/1-2-1 individual coaching/i)).toBeInTheDocument();
    expect(screen.getByText(/group sessions/i)).toBeInTheDocument();
    expect(screen.getByText(/coach education/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<Contact />, { wrapper: TestWrapper });
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('allows user to fill out form fields', async () => {
    const user = userEvent.setup();
    render(<Contact />, { wrapper: TestWrapper });
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue('Test message');
  });

  it('renders contact information cards', () => {
    render(<Contact />, { wrapper: TestWrapper });
    expect(screen.getByText(/email/i, { selector: 'h3' })).toBeInTheDocument();
    expect(screen.getByText(/phone/i, { selector: 'h3' })).toBeInTheDocument();
  });
});