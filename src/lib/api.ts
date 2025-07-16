import axios from 'axios';
import { TaxBracketResponse } from '../utils/taxCalculator';

/**
 * Pre-configured Axios instance for API communication.
 * Sets a base URL from environment variables (with a fallback) and a 5-second timeout.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001',
  timeout: 5000,
});

/**
 * Fetches tax brackets for a given year.
 * @param year The tax year for which to fetch brackets.
 * @returns A promise that resolves with an array of tax brackets.
 * @throws An error with a descriptive message if the API call fails.
 */
export async function fetchTaxBrackets(
  year: number
): Promise<TaxBracketResponse> {
  try {
    const { data } = await api.get(`/tax-calculator/tax-year/${year}`);
    return data;
    // Typescript enforces that if you explicitly type the variable in a catch clause, it must be either any or unknown
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Propagate a more meaningful error message based on the Axios error type.
    if (error.response) {
      // The server responded with a status code outside the 2xx range.
      throw new Error(`API Error: ${error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received.
      throw new Error(`API Error: No response received.`);
    } else {
      // An unexpected error occurred during the request setup.
      throw new Error(`Unexpected Error: ${error.message}`);
    }
  }
}
