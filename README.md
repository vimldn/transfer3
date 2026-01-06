# Transfer.co.ke - Kenya's Transfer Calculator Hub

A comprehensive Next.js site featuring transfer fee calculators and a full blog with 30 Kenya tax/finance articles.

## Features

✅ **9 Transfer Calculators**
- M-Pesa Fee Calculator
- Bank Transfer Comparison
- International Remittance
- Vehicle Logbook Transfer
- Property Transfer Calculator
- Import Duty Calculator
- KPLC Meter Transfer
- Pension Transfer Calculator
- Mobile Number Portability

✅ **Blog with 30 Articles**
- PAYE Tax Guides
- NSSF Contributions
- SHIF/NHIF Information
- Housing Levy
- Salary Breakdowns
- Tax Relief Options
- Employer Guides
- KRA Compliance

✅ **SEO Optimized**
- Dynamic meta tags per page
- Sitemap with all URLs
- Robots.txt configured
- Open Graph tags

✅ **Built-in Features**
- Google Analytics (G-T223C1ZSXV)
- Natural interlinking between articles
- Calculator banners in blog posts
- Related articles recommendations
- Mobile responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React Icons

## Project Structure

```
├── app/
│   ├── blog/
│   │   ├── [slug]/page.tsx    # Individual blog posts
│   │   └── page.tsx           # Blog listing
│   ├── mpesa-calculator/
│   ├── bank-transfer/
│   ├── remittance/
│   ├── vehicle-transfer/
│   ├── property-transfer/
│   ├── import-duty/
│   ├── kplc-transfer/
│   ├── pension-transfer/
│   ├── mobile-portability/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── CalculatorBanner.tsx
│   └── RelatedArticles.tsx
├── lib/
│   └── blog-data.ts           # All 30 articles
└── public/
    ├── sitemap.xml
    └── robots.txt
```

## Blog Features

- **Calculator Banners**: Each article shows a relevant calculator CTA
- **Internal Linking**: Keywords automatically link to related articles
- **Related Articles**: 4 related posts shown at end of each article
- **Category Tags**: Visual categorization of content

## Analytics

Google Analytics tracking ID: `G-T223C1ZSXV`

Already configured in `app/layout.tsx`.
