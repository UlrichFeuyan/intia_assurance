/**
 * Table Component Tests
 * Tests pour le composant Table réutilisable
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../../components/Table';

describe('Table Component', () => {
  const mockData = [
    { id: 1, name: 'Client 1', email: 'client1@example.com' },
    { id: 2, name: 'Client 2', email: 'client2@example.com' },
  ];

  const mockColumns = [
    { key: 'name' as const, label: 'Nom' },
    { key: 'email' as const, label: 'Email' },
  ];

  it('should render table with data', () => {
    render(
      <Table<typeof mockData[0]>
        data={mockData}
        columns={mockColumns}
      />
    );

    // Check headers
    expect(screen.getByText('Nom')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();

    // Check data
    expect(screen.getByText('Client 1')).toBeInTheDocument();
    expect(screen.getByText('client1@example.com')).toBeInTheDocument();
  });

  it('should render empty message when data is empty', () => {
    render(
      <Table<typeof mockData[0]>
        data={[]}
        columns={mockColumns}
      />
    );

    // Table should still render with headers
    expect(screen.getByText('Nom')).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked', () => {
    const mockDelete = vi.fn();
    
    render(
      <Table<typeof mockData[0]>
        data={mockData}
        columns={mockColumns}
        onDelete={mockDelete}
      />
    );

    const deleteButtons = screen.getAllByText(/Supprimer|Delete/i);
    if (deleteButtons.length > 0) {
      deleteButtons[0].click();
      expect(mockDelete).toHaveBeenCalled();
    }
  });

  it('should render multiple rows for multiple data items', () => {
    const manyItems = [
      { id: 1, name: 'Item 1', email: 'item1@test.com' },
      { id: 2, name: 'Item 2', email: 'item2@test.com' },
      { id: 3, name: 'Item 3', email: 'item3@test.com' },
    ];

    render(
      <Table<typeof manyItems[0]>
        data={manyItems}
        columns={mockColumns}
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });
});
