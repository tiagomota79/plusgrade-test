'use client';
import { useState } from 'react';
import { useTaxStore } from '../store/taxStore';
import { fetchTaxBrackets } from '../lib/api';
import { calculateTax, TaxCalculationResult } from '../utils/taxCalculator';
import TaxResult from './TaxResult';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema for form validation
// It ensures that the income is a non-negative number and the year is one of the specified options.
// On a larger project, consider moving this schema to a separate file for better organization.
const schema = z.object({
  income: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: 'Income must be a non-negative number',
    }),
  year: z.enum(['2019', '2020', '2021', '2022']),
});

type FormData = z.infer<typeof schema>;

export default function TaxForm() {
  const [result, setResult] = useState<TaxCalculationResult | null>(null);
  const [lastYearUsed, setLastYearUsed] = useState<number | null>(null);

  const { brackets, setBrackets, setLoading, setError, error, loading } =
    useTaxStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Function to handle form submission and tax calculation
  // It fetches tax brackets if not already available or if the year has changed
  // and calculates the tax based on the provided income and brackets.
  // It also handles loading state and errors.
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const numericIncome = parseFloat(data.income);
    const numericYear = Number(data.year);

    try {
      let bracketsToUse = brackets;

      // Use cached brackets if the year matches, preventing unnecessary API calls
      if (!brackets || lastYearUsed !== numericYear) {
        setLastYearUsed(numericYear);
        const apiData = await fetchTaxBrackets(numericYear);
        setBrackets(apiData.tax_brackets);
        bracketsToUse = apiData.tax_brackets;
      }

      if (!bracketsToUse) {
        throw new Error('Tax brackets are not available');
      }

      const calc = calculateTax(numericIncome, bracketsToUse);
      setResult(calc);
      // Typescript enforces that if you explicitly type the variable in a catch clause, it must be either any or unknown
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4 max-w-md mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <input
            type='number'
            step='any'
            placeholder='Annual Income'
            {...register('income')}
            className='p-2 w-full rounded-lg bg-gray-200'
          />
          {errors.income && (
            <p className='text-red-500 mt-1'>{errors.income.message}</p>
          )}
        </div>
        <div>
          <select
            {...register('year')}
            className='p-2 w-full rounded-lg bg-gray-200'
          >
            {/* Ideally, we would receive the available tax brackets years from the API, and use that information
            to dynamically map the options to present in the select element. This hardcoded array was set only because of the  parameters
            of the assignment. In either case, using a select element acts as a basic safeguard to prevent API requests that would
            surely return error due to unavailable tax brackets for certain years. */}
            {['2019', '2020', '2021', '2022'].map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          {errors.year && (
            <p className='text-red-500 mt-1'>{errors.year.message}</p>
          )}
        </div>
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 w-full rounded-lg'
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {error && (
        <p className='text-red-500 mt-2 p-2 rounded-lg bg-red-100'>
          {error} Please try again.
        </p>
      )}
      {result && <TaxResult result={result} />}
    </div>
  );
}
