import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: "Kenya's Transfer Hub | Calculate Transfer Fees & Costs",
    template: '%s | Transfer Kenya'
  },
  description: 'Calculate M-Pesa fees, bank transfers, remittance costs, vehicle logbook transfers, property stamp duty, and more. Kenya\'s #1 transfer calculator hub.',
  keywords: ['M-Pesa fees', 'Kenya transfer', 'logbook transfer', 'stamp duty Kenya', 'remittance Kenya', 'bank transfer fees', 'PAYE Kenya', 'NSSF Kenya', 'Kenya tax calculator'],
  metadataBase: new URL('https://transfer.co.ke'),
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://transfer.co.ke',
    siteName: 'Transfer Kenya',
    title: "Kenya's Transfer Hub | Calculate All Transfer Fees",
    description: 'Calculate M-Pesa fees, bank transfers, remittance costs, vehicle logbook transfers, property stamp duty, and more.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T223C1ZSXV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T223C1ZSXV');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-white">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-stone-950/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-lg">Transfer</span>
                  <span className="text-emerald-400 font-bold text-lg">.co.ke</span>
                </div>
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/" className="text-stone-300 hover:text-white transition-colors text-sm font-medium">
                  Calculators
                </Link>
                <Link href="/blog" className="text-stone-300 hover:text-white transition-colors text-sm font-medium">
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-4 mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg">Transfer</span>
                    <span className="text-emerald-400 font-bold text-lg">.co.ke</span>
                  </div>
                </div>
                <p className="text-stone-400 text-sm">
                  Kenya's comprehensive transfer calculator hub.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Money Transfers</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/mpesa-calculator" className="text-stone-400 hover:text-white transition-colors">M-Pesa Calculator</Link></li>
                  <li><Link href="/bank-transfer" className="text-stone-400 hover:text-white transition-colors">Bank Transfers</Link></li>
                  <li><Link href="/remittance" className="text-stone-400 hover:text-white transition-colors">International Remittance</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Asset Transfers</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/vehicle-transfer" className="text-stone-400 hover:text-white transition-colors">Vehicle Logbook</Link></li>
                  <li><Link href="/property-transfer" className="text-stone-400 hover:text-white transition-colors">Property Transfer</Link></li>
                  <li><Link href="/import-duty" className="text-stone-400 hover:text-white transition-colors">Import Duty</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog" className="text-stone-400 hover:text-white transition-colors">Blog & Guides</Link></li>
                  <li><Link href="/pension-transfer" className="text-stone-400 hover:text-white transition-colors">Pension Transfer</Link></li>
                  <li><Link href="/kplc-transfer" className="text-stone-400 hover:text-white transition-colors">KPLC Transfer</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-stone-500 text-sm">
                © {new Date().getFullYear()} transfer.co.ke • Kenya's Transfer Calculator Hub
              </p>
              <p className="text-stone-600 text-xs mt-2">
                Calculations are estimates. Verify with official sources before transactions.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
