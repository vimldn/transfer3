'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Globe, ArrowLeft, ArrowRight, Clock, Percent, DollarSign } from 'lucide-react'

const PROVIDERS = [
  {
    name: 'Wise',
    logo: '🔵',
    fee: 0.5, // percentage
    fixedFee: 3, // USD
    marginRate: 0.4, // how much worse than mid-market
    speed: '1-2 hours',
    payoutOptions: ['Bank', 'M-Pesa'],
    rating: 4.8,
  },
  {
    name: 'WorldRemit',
    logo: '🟣',
    fee: 0,
    fixedFee: 4,
    marginRate: 1.5,
    speed: 'Minutes',
    payoutOptions: ['M-Pesa', 'Bank', 'Cash Pickup'],
    rating: 4.5,
  },
  {
    name: 'Remitly',
    logo: '🟢',
    fee: 0,
    fixedFee: 4,
    marginRate: 1.2,
    speed: 'Minutes',
    payoutOptions: ['M-Pesa', 'Bank'],
    rating: 4.6,
  },
  {
    name: 'M-Pesa Global',
    logo: '🟩',
    fee: 0,
    fixedFee: 0,
    marginRate: 3.5,
    speed: 'Instant',
    payoutOptions: ['M-Pesa'],
    rating: 4.2,
  },
  {
    name: 'Western Union',
    logo: '🟡',
    fee: 2,
    fixedFee: 8,
    marginRate: 4,
    speed: 'Minutes - Hours',
    payoutOptions: ['Cash Pickup', 'Bank', 'M-Pesa'],
    rating: 3.8,
  },
]

const CORRIDORS = [
  { from: 'USD', to: 'KES', rate: 129.50, name: 'US → Kenya' },
  { from: 'GBP', to: 'KES', rate: 163.80, name: 'UK → Kenya' },
  { from: 'EUR', to: 'KES', rate: 141.20, name: 'EU → Kenya' },
  { from: 'CAD', to: 'KES', rate: 91.50, name: 'Canada → Kenya' },
  { from: 'AUD', to: 'KES', rate: 82.30, name: 'Australia → Kenya' },
]

const formatCurrency = (amount: number, currency: string = 'KES') => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatUSD = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export default function RemittancePage() {
  const [amount, setAmount] = useState(500)
  const [corridor, setCorridor] = useState(CORRIDORS[0])

  const calculateTransfer = (provider: typeof PROVIDERS[0]) => {
    const percentFee = (amount * provider.fee) / 100
    const totalFees = percentFee + provider.fixedFee
    const amountAfterFees = amount - totalFees
    const effectiveRate = corridor.rate * (1 - provider.marginRate / 100)
    const received = amountAfterFees * effectiveRate
    return {
      fees: totalFees,
      rate: effectiveRate,
      received,
      totalCost: totalFees + (amount * provider.marginRate / 100),
    }
  }

  const results = PROVIDERS.map(provider => ({
    ...provider,
    ...calculateTransfer(provider),
  })).sort((a, b) => b.received - a.received)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to all tools
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">International Remittance</h1>
          <p className="text-stone-400">Compare rates from Wise, WorldRemit, Remitly & more</p>
        </div>

        {/* Input Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Corridor Selection */}
            <div>
              <label className="block text-sm text-stone-400 mb-3">Sending Corridor</label>
              <div className="grid grid-cols-1 gap-2">
                {CORRIDORS.map((c) => (
                  <button
                    key={c.from}
                    onClick={() => setCorridor(c)}
                    className={`p-3 rounded-xl border transition-all text-left ${
                      corridor.from === c.from
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{c.name}</span>
                      <span className="text-sm">1 {c.from} = {c.rate.toFixed(2)} KES</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm text-stone-400 mb-3">You Send ({corridor.from})</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-2xl font-semibold focus:outline-none focus:border-purple-500 mb-4"
              />
              <div className="flex flex-wrap gap-2">
                {[100, 250, 500, 1000, 2000, 5000].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount)}
                    className="px-3 py-1.5 bg-white/5 rounded-lg text-stone-400 text-sm hover:bg-white/10 transition-colors"
                  >
                    {corridor.from} {quickAmount}
                  </button>
                ))}
              </div>

              {/* Mid-market rate info */}
              <div className="mt-4 p-3 bg-white/5 rounded-xl">
                <p className="text-sm text-stone-400">
                  Mid-market rate: <span className="text-white font-medium">1 {corridor.from} = {corridor.rate.toFixed(2)} KES</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-white">Compare Providers</h2>
          
          {results.map((provider, index) => (
            <div
              key={provider.name}
              className={`bg-white/5 backdrop-blur-xl rounded-2xl border p-5 ${
                index === 0 ? 'border-emerald-500/50 ring-2 ring-emerald-500/20' : 'border-white/10'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{provider.logo}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{provider.name}</h3>
                      {index === 0 && (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                          BEST VALUE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-stone-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {provider.speed}
                      </span>
                      <span>⭐ {provider.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-xs text-stone-500 uppercase">Fees</p>
                    <p className="text-lg font-semibold text-amber-400">
                      {provider.fees === 0 ? 'FREE' : formatUSD(provider.fees)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-stone-500 uppercase">Rate</p>
                    <p className="text-lg font-semibold text-white">
                      {provider.rate.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-stone-500 uppercase">They Receive</p>
                    <p className="text-xl font-bold text-emerald-400">
                      {formatCurrency(provider.received)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-2">
                {provider.payoutOptions.map(option => (
                  <span key={option} className="px-2 py-1 bg-white/5 rounded text-xs text-stone-400">
                    {option}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">💡 Tips for Cheaper Transfers</h2>
          <ul className="space-y-2 text-stone-300">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              <span>Compare both fees AND exchange rates - some providers hide costs in poor rates</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              <span>M-Pesa delivery is usually fastest for recipients in Kenya</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              <span>Avoid Western Union/MoneyGram for regular transfers - high margins</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              <span>Wise typically offers rates closest to the real mid-market rate</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
