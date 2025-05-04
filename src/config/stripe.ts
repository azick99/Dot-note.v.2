export const PLANS = [
  {
    name: 'Free',
    slug: 'free',
    quota: 10,
    pagesPerPdf: 5,
    price: {
      amount: 0,
      priceIds: {
        test: '',
        production: '',
      },
    },
  },
  {
    name: 'Standard',
    slug: 'standard',
    quota: 50,
    pagesPerPdf: 5,
    price: {
      amount: 45,
      priceIds: {
        test: '',
        production: '',
      },
    },
  },
  {
    name: 'Pro',
    slug: 'pro',
    quota: 50,
    pagesPerPdf: 25,
    price: {
      amount: 85,
      priceIds: {
        test: 'price_1Oy99WKsXE7KivcKpqC4qNSq',
        production: '',
      },
    },
  },
]
