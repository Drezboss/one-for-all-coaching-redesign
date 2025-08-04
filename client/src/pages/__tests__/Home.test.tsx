import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../home';

// Mock wouter router
vi.mock('wouter', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock shared content
vi.mock('@shared/content', () => ({
  siteContent: {
    images: {
      coach: {
        celebration: '/test-image.jpg'
      }
    },
    home: {
      whyChoose: {
        title: 'WHY CHOOSE ONE FOR ALL?',
        description: 'Test description',
        features: [
          { title: 'Feature 1', description: 'Description 1' },
          { title: 'Feature 2', description: 'Description 2' },
          { title: 'Feature 3', description: 'Description 3' }
        ]
      }
    }
  }
}));

// Mock components
vi.mock('@/components/hero-section', () => ({
  HeroSection: () => <div data-testid="hero-section">Hero Section</div>,
  ExpectationSection: () => <div data-testid="expectation-section">Expectation Section</div>
}));

vi.mock('@/components/services-section', () => ({
  ServicesSection: () => <div data-testid="services-section">Services Section</div>
}));

describe('Home Page', () => {
  it('renders hero section', () => {
    render(<Home />);
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });

  it('renders expectation section', () => {
    render(<Home />);
    expect(screen.getByTestId('expectation-section')).toBeInTheDocument();
  });

  it('renders services section', () => {
    render(<Home />);
    expect(screen.getByTestId('services-section')).toBeInTheDocument();
  });

  it('renders about section with coach information', () => {
    render(<Home />);
    expect(screen.getByText('WHY CHOOSE ONE FOR ALL?')).toBeInTheDocument();
  });

  it('renders about section features', () => {
    render(<Home />);
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
  });

  it('renders meet your coach button', () => {
    render(<Home />);
    expect(screen.getByText('Meet Your Coach')).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<Home />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
  });
});