/**
 * @jest-environment jsdom
 */
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import ShowInfo from '../src/components/ShowInfo/ShowInfo';

describe('ShowInfo', () => {
  it('ShowInfo renders', () => {
    const mockTitle = 'Title';
    const mockTotal = 123;

    render(<ShowInfo title={mockTitle} total={mockTotal} />);
    expect(screen.getByText(mockTotal)).toBeInTheDocument();
  })
});