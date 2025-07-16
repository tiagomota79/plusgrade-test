import { TaxCalculationResult, formatCurrency } from '../utils/taxCalculator';

export default function TaxResult({
  result,
}: {
  result: TaxCalculationResult;
}) {
  return (
    <div className='mt-4 p-4 rounded-lg bg-gray-200'>
      <p>
        <strong>Total Tax:</strong> {formatCurrency(result.totalTax)}
      </p>
      <p>
        <strong>Effective Rate:</strong>{' '}
        {(result.effectiveRate * 100).toFixed(2)}%
      </p>
      <h4 className='mt-2'>Per Band:</h4>
      <ul className='list-disc pl-6'>
        {result.perBand.map(({ bracket, tax }, i) => (
          <li key={i}>
            {`${formatCurrency(bracket.min)} - ${
              formatCurrency(bracket.max) ?? '∞'
            } @ ${(bracket.rate * 100).toFixed(2)}%: ${formatCurrency(tax)}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
