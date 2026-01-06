'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Smartphone, ArrowLeft, Send, Wallet, Building2, Info } from 'lucide-react'

// M-Pesa fee structure (2024/2025 rates)
const MPESA_SEND_FEES = [
  { min: 1, max: 100, registered: 0, unregistered: 0 },
  { min: 101, max: 500, registered: 7, unregistered: 18 },
  { min: 501, max: 1000, registered: 13, unregistered: 22 },
  { min: 1001, max: 1500, registered: 23, unregistered: 35 },
  { min: 1501, max: 2500, registered: 33, unregistered: 55 },
  { min: 2501, max: 3500, registered: 53, unregistered: 77 },
  { min: 3501, max: 5000, registered: 57, unregistered: 88 },
  { min: 5001, max: 7500, registered: 78, unregistered: 105 },
  { min: 7501, max: 10000, registered: 90, unregistered: 115 },
  { min: 10001, max: 15000, registered: 100, unregistered: 145 },
  { min: 15001, max: 20000, registered: 105, unregistered: 163 },
  { min: 20001, max: 35000, registered: 108, unregistered: 180 },
  { min: 35001, max: 50000, registered: 108, unregistered: 197 },
  { min: 50001, max: 150000, registered: 108, unregistered: 222 },
]

const MPESA_WITHDRAW_FEES = [
  { min: 1, max: 100, fee: 0 },
  { min: 101, max: 500, fee: 11 },
  { min: 501, max: 1000, fee: 22 },
  { min: 1001, max: 1500, fee: 33 },
  { min: 1501, max: 2500, fee: 33 },
  { min: 2501, max: 3500, fee: 35 },
  { min: 3501, max: 5000, fee: 55 },
  { min: 5001, max: 7500, fee: 77 },
  { min: 7501, max: 10000, fee: 88 },
  { min: 10001, max: 15000, fee: 99 },
  { min: 15001, max: 20000, fee: 105 },
  { min: 20001, max: 35000, fee: 108 },
  { min: 35001, max: 50000, fee: 111 },
  { min: 50001, max: 150000, fee: 111 },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function MpesaCalculator() {
  const [amount, setAmount] = useState(1000)
  const [transactionType, setTransactionType] = useState<'send' | 'withdraw' | 'paybill'>('send')
  const [recipientType, setRecipientType] = useState<'registered' | 'unregistered'>('registered')

  const calculateFee = () => {
    if (transactionType === 'send') {
      const tier = MPESA_SEND_FEES.find(t => amount >= t.min && amount <= t.max)
      if (!tier) return 0
      return recipientType === 'registered' ? tier.registered : tier.unregistered
    } else if (transactionType === 'withdraw') {
      const tier = MPESA_WITHDRAW_FEES.find(t => amount >= t.min && amount <= t.max)
      return tier?.fee || 0
    } else {
      // Paybill is free
      return 0
    }
  }

  const fee = calculateFee()
  const total = amount + fee

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to all tools
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">M-Pesa Fee Calculator</h1>
          <p className="text-stone-400">Calculate send, withdraw, and Paybill fees instantly</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Transaction Details</h2>

            {/* Transaction Type */}
            <div className="mb-6">
              <label className="block text-sm text-stone-400 mb-3">Transaction Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'send', label: 'Send Money', icon: Send },
                  { id: 'withdraw', label: 'Withdraw', icon: Wallet },
                  { id: 'paybill', label: 'Paybill/Till', icon: Building2 },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setTransactionType(type.id as any)}
                    className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                      transactionType === type.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:border-white/20'
                    }`}
                  >
                    <type.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Type (only for send) */}
            {transactionType === 'send' && (
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">Recipient Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setRecipientType('registered')}
                    className={`p-3 rounded-xl border transition-all text-sm font-medium ${
                      recipientType === 'registered'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:border-white/20'
                    }`}
                  >
                    Registered User
                  </button>
                  <button
                    onClick={() => setRecipientType('unregistered')}
                    className={`p-3 rounded-xl border transition-all text-sm font-medium ${
                      recipientType === 'unregistered'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:border-white/20'
                    }`}
                  >
                    Unregistered User
                  </button>
                </div>
              </div>
            )}

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm text-stone-400 mb-3">Amount (KES)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(1, Math.min(150000, Number(e.target.value))))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xl font-semibold focus:outline-none focus:border-emerald-500"
              />
              <input
                type="range"
                min="100"
                max="150000"
                step="100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full mt-4"
              />
              <div className="flex justify-between text-xs text-stone-500 mt-1">
                <span>KES 100</span>
                <span>KES 150,000</span>
              </div>
            </div>

            {/* Quick amounts */}
            <div className="flex flex-wrap gap-2">
              {[500, 1000, 2500, 5000, 10000, 20000].map((quickAmount) => (
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

          {/* Results Section */}
          <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Fee Breakdown</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-stone-400">Amount</span>
                <span className="text-white font-semibold">{formatCurrency(amount)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-stone-400">
                  {transactionType === 'send' ? 'Send Fee' : transactionType === 'withdraw' ? 'Withdrawal Fee' : 'Paybill Fee'}
                </span>
                <span className={`font-semibold ${fee === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {fee === 0 ? 'FREE' : formatCurrency(fee)}
                </span>
              </div>

              <div className="flex justify-between items-center py-4 bg-white/5 rounded-xl px-4 mt-4">
                <span className="text-white font-medium">Total Cost</span>
                <span className="text-2xl font-bold text-emerald-400">{formatCurrency(total)}</span>
              </div>

              {transactionType === 'send' && recipientType === 'unregistered' && (
                <div className="flex items-start gap-2 p-3 bg-amber-500/10 rounded-xl mt-4">
                  <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-200">
                    Sending to unregistered users costs more. Ask them to register for M-Pesa to save on fees!
                  </p>
                </div>
              )}

              {transactionType === 'paybill' && (
                <div className="flex items-start gap-2 p-3 bg-emerald-500/10 rounded-xl mt-4">
                  <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-200">
                    Paybill and Buy Goods (Till) transactions are free for customers!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fee Table */}
        <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold text-white mb-4">M-Pesa Send Money Fee Table (2024)</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-stone-400 font-medium">Amount Range</th>
                <th className="text-right py-3 px-4 text-stone-400 font-medium">Registered User</th>
                <th className="text-right py-3 px-4 text-stone-400 font-medium">Unregistered User</th>
              </tr>
            </thead>
            <tbody>
              {MPESA_SEND_FEES.map((tier, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4 text-stone-300">
                    {formatCurrency(tier.min)} - {formatCurrency(tier.max)}
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-400">
                    {tier.registered === 0 ? 'FREE' : formatCurrency(tier.registered)}
                  </td>
                  <td className="py-3 px-4 text-right text-amber-400">
                    {tier.unregistered === 0 ? 'FREE' : formatCurrency(tier.unregistered)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
