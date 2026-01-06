'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PiggyBank, ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const PENSION_SCHEMES = [
  { id: 'nssf', name: 'NSSF', type: 'Public', fees: 0, minTransfer: 0 },
  { id: 'umbrella', name: 'Umbrella Scheme', type: 'Private', fees: 500, minTransfer: 50000 },
  { id: 'individual', name: 'Individual Pension Plan', type: 'Private', fees: 1000, minTransfer: 100000 },
  { id: 'occupational', name: 'Occupational Scheme', type: 'Employer', fees: 0, minTransfer: 0 },
]

export default function PensionTransferPage() {
  const [currentScheme, setCurrentScheme] = useState('nssf')
  const [targetScheme, setTargetScheme] = useState('umbrella')
  const [transferAmount, setTransferAmount] = useState(500000)
  const [yearsToRetirement, setYearsToRetirement] = useState(20)

  const currentSchemeData = PENSION_SCHEMES.find(s => s.id === currentScheme) || PENSION_SCHEMES[0]
  const targetSchemeData = PENSION_SCHEMES.find(s => s.id === targetScheme) || PENSION_SCHEMES[1]

  // Calculate fees
  const transferFee = targetSchemeData.fees
  const rbaCertificateFee = 1000
  const totalFees = transferFee + rbaCertificateFee

  // Projected growth (assuming 10% annual return)
  const annualReturn = 0.10
  const projectedValue = transferAmount * Math.pow(1 + annualReturn, yearsToRetirement)

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
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <PiggyBank className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Pension Transfer Calculator</h1>
          <p className="text-stone-400">Calculate costs to transfer pension between schemes in Kenya</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Transfer Details</h2>

              {/* Current Scheme */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">Current Pension Scheme</label>
                <div className="grid grid-cols-2 gap-2">
                  {PENSION_SCHEMES.map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() => setCurrentScheme(scheme.id)}
                      disabled={scheme.id === targetScheme}
                      className={`p-3 rounded-xl border transition-all text-sm font-medium ${
                        currentScheme === scheme.id
                          ? 'bg-pink-500/20 border-pink-500 text-pink-400'
                          : scheme.id === targetScheme
                          ? 'bg-white/5 border-white/5 text-stone-600 cursor-not-allowed'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:border-white/20'
                      }`}
                    >
                      {scheme.name}
                      <span className="block text-xs opacity-60">{scheme.type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center my-4">
                <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-pink-400" />
                </div>
              </div>

              {/* Target Scheme */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">Transfer To</label>
                <div className="grid grid-cols-2 gap-2">
                  {PENSION_SCHEMES.map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() => setTargetScheme(scheme.id)}
                      disabled={scheme.id === currentScheme}
                      className={`p-3 rounded-xl border transition-all text-sm font-medium ${
                        targetScheme === scheme.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : scheme.id === currentScheme
                          ? 'bg-white/5 border-white/5 text-stone-600 cursor-not-allowed'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:border-white/20'
                      }`}
                    >
                      {scheme.name}
                      <span className="block text-xs opacity-60">{scheme.type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Transfer Amount */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">Amount to Transfer (KES)</label>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xl font-semibold focus:outline-none focus:border-pink-500"
                />
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="50000"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(Number(e.target.value))}
                  className="w-full mt-4"
                />
              </div>

              {/* Years to Retirement */}
              <div>
                <label className="block text-sm text-stone-400 mb-3">Years to Retirement: {yearsToRetirement}</label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={yearsToRetirement}
                  onChange={(e) => setYearsToRetirement(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-stone-500 mt-1">
                  <span>1 year</span>
                  <span>40 years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-pink-600/20 to-pink-900/20 backdrop-blur-xl rounded-2xl border border-pink-500/20 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Transfer Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-stone-400">Transfer Amount</span>
                  <span className="text-white font-semibold">{formatCurrency(transferAmount)}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-stone-400">Transfer Fee ({targetSchemeData.name})</span>
                  <span className="text-white font-semibold">
                    {transferFee === 0 ? 'FREE' : formatCurrency(transferFee)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-stone-400">RBA Certificate Fee</span>
                  <span className="text-white font-semibold">{formatCurrency(rbaCertificateFee)}</span>
                </div>

                <div className="flex justify-between items-center py-4 bg-white/5 rounded-xl px-4 mt-4">
                  <span className="text-white font-medium">Total Fees</span>
                  <span className="text-xl font-bold text-pink-400">{formatCurrency(totalFees)}</span>
                </div>
              </div>
            </div>

            {/* Projected Growth */}
            <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">Projected Growth</h2>
              </div>
              
              <p className="text-sm text-stone-400 mb-4">
                Assuming 10% annual return over {yearsToRetirement} years:
              </p>

              <div className="flex justify-between items-center py-4 bg-white/5 rounded-xl px-4">
                <span className="text-stone-300">Projected Value at Retirement</span>
                <span className="text-2xl font-bold text-emerald-400">{formatCurrency(projectedValue)}</span>
              </div>

              <p className="text-xs text-stone-500 mt-3">
                * This is an estimate. Actual returns depend on fund performance.
              </p>
            </div>
          </div>
        </div>

        {/* Transfer Process */}
        <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Transfer Process</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: 1, title: 'Get RBA Certificate', desc: 'Obtain certificate of good standing from current scheme' },
              { step: 2, title: 'Apply to New Scheme', desc: 'Submit application with transfer request form' },
              { step: 3, title: 'Vetting Process', desc: 'RBA reviews and approves the transfer (30-60 days)' },
              { step: 4, title: 'Funds Transfer', desc: 'Assets transferred to new scheme administrator' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-pink-400 font-bold">{item.step}</span>
                </div>
                <h3 className="font-medium text-white mb-1">{item.title}</h3>
                <p className="text-stone-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-400 font-semibold">Important Considerations</p>
              <ul className="text-amber-200 text-sm mt-2 space-y-1">
                <li>• Transfer processing typically takes 30-90 days</li>
                <li>• Early withdrawal before 50 years attracts 30% tax</li>
                <li>• Some schemes have lock-in periods before transfer is allowed</li>
                <li>• Consult a licensed pension advisor before transferring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
