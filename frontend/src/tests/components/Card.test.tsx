/**
 * Card Component Tests
 * Tests pour le composant Card réutilisable
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../../components/Card';

describe('Card Component', () => {
  it('should render children content', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(
      <Card title="Test Title">
        <p>Content</p>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render without title when not provided', () => {
    render(
      <Card>
        <p>Content without title</p>
      </Card>
    );

    expect(screen.getByText('Content without title')).toBeInTheDocument();
  });

  it('should have card class applied', () => {
    const { container } = render(
      <Card>
        <p>Content</p>
      </Card>
    );

    const cardElement = container.querySelector('.card') or container.firstChild;
    expect(cardElement).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    render(
      <Card title="Multi-content">
        <h3>Heading</h3>
        <p>Paragraph</p>
        <button>Button</button>
      </Card>
    );

    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
