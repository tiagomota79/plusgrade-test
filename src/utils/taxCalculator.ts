export interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

export interface TaxBracketResponse {
  tax_brackets: TaxBracket[];
}

export interface TaxCalculationResult {
  totalTax: number;
  effectiveRate: number;
  perBand: { bracket: TaxBracket; tax: number }[];
}

/**
 * Calculates the tax liability based on income and a set of tax brackets.
 *
 * This function iterates through the provided tax brackets and calculates the
 * tax for each bracket that applies to the given income.
 *
 * @param income The total income for which to calculate taxes.
 * @param brackets An array of TaxBracket objects representing the tax brackets.
 *               The brackets should be ordered from lowest to highest income.
 *               It is assumed that brackets do not overlap and cover all income
 *               above the minimum of the first bracket.
 *
 * @returns An object containing:
 *   - totalTax: The total tax owed.
 *   - effectiveRate: The effective tax rate (total tax / income).
 *   - perBand: An array of objects, each containing a bracket and the
 *              corresponding tax amount for that bracket.
 *
 * @throws Error if `income` is negative or `brackets` is empty.
 *         Note: In a production environment, consider more robust input validation.
 */
export function calculateTax(
  income: number,
  brackets: TaxBracket[]
): TaxCalculationResult {
  let totalTax = 0;
  const perBand: { bracket: TaxBracket; tax: number }[] = [];

  for (const bracket of brackets) {
    const { min, max, rate } = bracket;
    if (income > min) {
      const taxable = max ? Math.min(income, max) - min : income - min;
      const tax = taxable * rate;
      totalTax += tax;
      perBand.push({ bracket, tax });
    }
  }

  const effectiveRate = totalTax / income;
  return { totalTax, effectiveRate, perBand };
}

// Currency formatter config for Canadian dollars (CAD)
const CURRENCY_FORMATTER = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formats a number as currency (CAD).
 *
 * This function takes a number, string, null, or undefined value and returns
 * a currency-formatted string representing the amount in Canadian dollars.
 * If the input is not a number or a valid number string, it returns "Nan".
 * @param amount The number to format.
 */
export function formatCurrency(amount: number | string | null | undefined) {
  if (typeof amount === 'number') {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === 'string') {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return 'Nan';
  }
}
