import TaxForm from '../components/TaxForm';

export default function Home() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-blue-200 text-black'>
      <div className='p-6 bg-white rounded-lg shadow-md w-full max-w-lg'>
        <h1 className='text-2xl font-bold mb-4 text-center'>
          Income Tax Calculator
        </h1>
        <TaxForm />
      </div>
    </main>
  );
}
