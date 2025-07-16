import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaxForm from '../components/TaxForm';

jest.mock('../lib/api', () => ({
  fetchTaxBrackets: jest.fn().mockResolvedValue({
    tax_brackets: [
      { min: 0, max: 50000, rate: 0.1 },
      { min: 50000, rate: 0.2 },
    ],
  }),
}));

test('displays validation error on invalid input', async () => {
  render(<TaxForm />);

  fireEvent.change(screen.getByPlaceholderText(/Annual Income/i), {
    target: { value: '-500' },
  });

  fireEvent.click(screen.getByText(/Calculate/i));

  expect(await screen.findByText(/Income must be/)).toBeInTheDocument();
});

test('calculates tax correctly', async () => {
  render(<TaxForm />);

  fireEvent.change(screen.getByPlaceholderText(/Annual Income/i), {
    target: { value: '60000' },
  });

  fireEvent.click(screen.getByText(/Calculate/i));

  expect(await screen.findByText(/Total Tax/)).toBeInTheDocument();
});
