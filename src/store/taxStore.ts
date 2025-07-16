import { create } from 'zustand';
import { TaxBracket } from '../utils/taxCalculator';

/**
 * Defines the shape of the state managed by the tax store.
 */
interface TaxState {
  /**
   * The array of tax brackets for the selected `year`.
   * `null` if no data has been fetched.
   */
  brackets: TaxBracket[] | null;
  /** Indicates if tax bracket data is being fetched from the API. */
  loading: boolean;
  /** Stores an error message if an API call fails. `null` if no error. */
  error: string | null;
  /**
   * Updates the tax brackets in the store.
   * @param brackets The new array of tax brackets.
   */
  setBrackets: (brackets: TaxBracket[]) => void;
  /**
   * Updates the loading status.
   * @param loading The new loading state.
   */
  setLoading: (loading: boolean) => void;
  /**
   * Sets or clears the error message.
   * @param error The error message string, or `null` to clear it.
   */
  setError: (error: string | null) => void;
}

/**
 * A Zustand store for managing global state related to tax information.
 *
 * This store holds the tax brackets for a given year, the loading state
 * for API requests, and any errors that occur.
 */
export const useTaxStore = create<TaxState>((set) => ({
  brackets: null,
  loading: false,
  error: null,
  setBrackets: (brackets) => set({ brackets }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
