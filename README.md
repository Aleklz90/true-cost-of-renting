# Renting calculator

[Calculator for real renting cost evaluation](https://true-cost-of-renting.netlify.app/)

![This tool shows the full first-year picture: recurring housing fee, effective monthly vs listed monthly, refundable vs non-refundable split.]()

1. No scraping
2. No accounts, no saved results, no shared links
3. No live chiller-provider rates(one labeled estimate)
4. No dark mode, no animations
5. No component libraries

| Constant                 | Value |
| ------------------------ | ----- |
| EJARI_REGISTRATION       | 220   |
| DEPOSIT_RATE_UNFURNISHED | 0.05  |
| DEPOSIT_RATE_FURNISHED   | 0.1   |
| DEWA_DEPOSIT_APARTMENT   | 2000  |
| DEWA_DEPOSIT_VILLA       | 4000  |
| AGENCY_FEE_RATE          | 0.05  |
| VAT_RATE                 | 0.05  |
| CHILLER_DEPOSIT_ESTIMATE | 2000  |
| HOUSING_FEE_RATE         | 0.05  |
| DEWA_ACTIVATION_FEE      | 130   |

Stack: Next.js + TypeScript + Tailwind + Vitest

How to run: <code>npm run dev</code>

How to test: <code>npm test</code>
