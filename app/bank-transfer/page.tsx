'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2, ArrowLeft, Clock, Zap, Check, X } from 'lucide-react'

const TRANSFER_METHODS = {
  pesalink: {
    name: 'PesaLink',
    description: 'Instant bank-to-bank transfers',
    speed: 'Instant (24/7)',
    limit: 'KES 999,999 per transaction',
    fees: [
      { min: 1, max: 500, fee: 0 },
      { min: 501, max: 1000, fee: 12 },
      { min: 1001, max: 5000, fee: 25 },
      { min: 5001, max: 10000, fee: 40 },
      { min: 10001, max: 50000, fee: 60 },
      { min: 50001, max: 100000, fee: 75 },
      { min: 100001, max: 999999, fee: 90 },
    ],
    pros: ['Instant transfers 24/7', 'Works on weekends/holidays', 'All major banks supported'],
    cons: ['Higher fees for large amounts', 'KES 1M daily limit'],
  },
  rtgs: {
    name: 'RTGS',
    description: 'Real-Time Gross Settlement for large amounts',
    speed: 'Same day (business hours)',
    limit: 'KES 1,000,000+ recommended',
    fees: [
      { min: 1, max: 999999, fee: 300 },
      { min: 1000000, max: 10000000, fee: 500 },
      { min: 10000001, max: Infinity, fee: 1000 },
    ],
    pros: ['Best for large transfers', 'Same-day settlement', 'No upper limit'],
    cons: ['Business hours only (8am-3pm)', 'Not available weekends', 'Flat fee structure'],
  },
  eft: {
    name: 'EFT',
    description: 'Electronic Funds Transfer - batch processing',
    speed: '1-3 business days',
    limit: 'No limit',
    fees: [
      { min: 1, max: 100000, fee: 50 },
      { min: 100001, max: 500000, fee: 100 },
      { min: 500001, max: Infinity, fee: 150 },
    ],
    pros: ['Cheapest option', 'Good for scheduled payments', 'No upper limit'],
    cons: ['Slowest option (1-3 days)', 'Batch processing', 'Not ideal for urgent transfers'],
  },
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const calculateFee = (method: keyof typeof TRANSFER_METHODS, amount: number) => {
  const fees = TRANSFER_METHODS[method].fees
  const tier = fees.find(t => amount >= t.min && amount <= t.max)
  return tier?.fee || 0
}

export default function BankTransferPage() {
  const [amount, setAmount] = useState(50000)

  const pesalinkFee = calculateFee('pesalink', amount)
  const rtgsFee = calculateFee('rtgs', amount)
  const eftFee = calculateFee('eft', amount)

  const results = [
    { method: 'pesalink', fee: pesalinkFee, ...TRANSFER_METHODS.pesalink },
    { method: 'rtgs', fee: rtgsFee, ...TRANSFER_METHODS.rtgs },
    { method: 'eft', fee: eftFee, ...TRANSFER_METHODS.eft },
  ].sort((a, b) => a.fee - b.fee)

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
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Bank Transfer Comparison</h1>
          <p className="text-stone-400">Compare PesaLink, RTGS, and EFT fees across Kenya</p>
        </div>

        {/* Amount Input */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8">
          <label className="block text-sm text-stone-400 mb-3">Transfer Amount (KES)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-2xl font-semibold focus:outline-none focus:border-blue-500 mb-4"
          />
          <div className="flex flex-wrap gap-2">
            {[10000, 50000, 100000, 500000, 1000000, 5000000].map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount)}
                className="px-3 py-1.5 bg-white/5 rounded-lg text-stone-400 text-sm hover:bg-white/10 transition-colors"
              >
                {formatCurrency(quickAmount)}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Results */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {results.map((result, index) => (
            <div
              key={result.method}
              className={`relative bg-white/5 backdrop-blur-xl rounded-2xl border p-6 ${
                index === 0 ? 'border-emerald-500/50 ring-2 ring-emerald-500/20' : 'border-white/10'
              }`}
            >
              {index === 0 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 rounded-full text-xs font-semibold text-white">
                  CHEAPEST
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-1">{result.name}</h3>
              <p className="text-stone-400 text-sm mb-4">{result.description}</p>

              <div className="text-3xl font-bold text-white mb-4">
                {result.fee === 0 ? (
                  <span className="text-emerald-400">FREE</span>
                ) : (
                  formatCurrency(result.fee)
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-stone-300">{result.speed}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-stone-300">{result.limit}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">Pros</p>
                <ul className="space-y-1 mb-4">
                  {result.pros.map((pro, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-stone-300">
                      <Check className="w-3 h-3 text-emerald-400" />
                      {pro}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">Cons</p>
                <ul className="space-y-1">
                  {result.cons.map((con, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-stone-300">
                      <X className="w-3 h-3 text-red-400" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">💡 Recommendation</h2>
          <div className="text-stone-300">
            {amount < 10000 && (
              <p><strong className="text-blue-400">Use PesaLink</strong> for small amounts - it's instant and fees are minimal.</p>
            )}
            {amount >= 10000 && amount < 100000 && (
              <p><strong className="text-blue-400">Use PesaLink</strong> if you need instant transfer, or <strong className="text-emerald-400">EFT</strong> if you can wait 1-3 days and want to save on fees.</p>
            )}
            {amount >= 100000 && amount < 1000000 && (
              <p><strong className="text-emerald-400">EFT</strong> is cheapest for this amount. Use <strong className="text-blue-400">RTGS</strong> if you need same-day settlement during business hours.</p>
            )}
            {amount >= 1000000 && (
              <p><strong className="text-amber-400">RTGS</strong> is recommended for large transfers like this. It's designed for high-value transactions with same-day settlement.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
