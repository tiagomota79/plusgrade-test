# 🧮 Income Tax Calculator App

This project is a frontend application that calculates income taxes for a given salary and tax year using a dockerized API.

It demonstrates:

- **Next.js** for the React framework
- **Zustand** for state management
- **React Hook Form** with **Zod** for robust form handling and validation
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **Jest** and **React Testing Library** for testing

---

## 🚀 Features

✅ Fetches tax brackets from an API  
✅ Calculates:
- Total tax owed
- Taxes per bracket
- Effective tax rate

✅ Caches tax bracket data per year to avoid unnecessary requests  
✅ Validates inputs with Zod  
✅ Gracefully handles API errors (including random errors in the mock API)  
✅ Clean, accessible UI  

___

## Project Structure

```bash
├── src
│   ├── __tests__
│   │   └── TaxForm.test.tsx    # React Testing Library tests
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css        # Tailwind base
│   │   ├── layout.tsx         # Main Layout
│   │   └── page.tsx           # Main page
│   ├── components
│   │   ├── TaxForm.tsx        # Form inputs
│   │   └── TaxResult.tsx      # Display results
│   ├── lib
│   │   └── api.ts             # API client (Axios)
│   ├── store
│   │   └── taxStore.ts        # Zustand state
│   └── utils
│       └── taxCalculator.ts   # Pure functions to compute tax and format currency

```
---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

Run tests with:

```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
