'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, ArrowLeft, CheckCircle, Clock, FileText, AlertCircle } from 'lucide-react'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const TRANSFER_TYPES = [
  { id: 'change-name', name: 'Change of Name', description: 'Same location, new account holder', fee: 1500 },
  { id: 'relocation', name: 'Meter Relocation', description: 'Move meter to new location', fee: 15000 },
  { id: 'new-connection', name: 'New Connection', description: 'First time connection', fee: 12000 },
  { id: 'upgrade', name: 'Upgrade/Downgrade', description: 'Change meter capacity', fee: 8000 },
]

const STEPS = [
  {
    step: 1,
    title: 'Gather Documents',
    description: 'Collect all required documents including ID, sale agreement, and previous bills',
    duration: '1 day',
  },
  {
    step: 2,
    title: 'Visit KPLC Office',
    description: 'Go to nearest Kenya Power office with all documents',
    duration: '1-2 hours',
  },
  {
    step: 3,
    title: 'Fill Application Form',
    description: 'Complete the change of tenancy/transfer application form',
    duration: '30 mins',
  },
  {
    step: 4,
    title: 'Pay Transfer Fees',
    description: 'Pay the applicable fees via M-Pesa or bank',
    duration: 'Immediate',
  },
  {
    step: 5,
    title: 'Site Inspection',
    description: 'KPLC may conduct inspection if required',
    duration: '2-5 days',
  },
  {
    step: 6,
    title: 'Account Activation',
    description: 'New account activated in your name',
    duration: '1-3 days',
  },
]

export default function KPLCTransferPage() {
  const [transferType, setTransferType] = useState('change-name')
  const [hasOutstandingBill, setHasOutstandingBill] = useState(false)
  const [outstandingAmount, setOutstandingAmount] = useState(0)

  const selectedType = TRANSFER_TYPES.find(t => t.id === transferType) || TRANSFER_TYPES[0]
  const totalCost = selectedType.fee + (hasOutstandingBill ? outstandingAmount : 0)

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
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">KPLC Meter Transfer</h1>
          <p className="text-stone-400">Process and costs to transfer electricity meter ownership</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Transfer Details</h2>

              {/* Transfer Type */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">What do you need?</label>
                <div className="space-y-2">
                  {TRANSFER_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setTransferType(type.id)}
                      className={`w-full p-4 rounded-xl border transition-all text-left ${
                        transferType === type.id
                          ? 'bg-yellow-500/20 border-yellow-500'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-medium ${transferType === type.id ? 'text-yellow-400' : 'text-white'}`}>
                            {type.name}
                          </p>
                          <p className="text-sm text-stone-400 mt-1">{type.description}</p>
                        </div>
                        <span className={`font-semibold ${transferType === type.id ? 'text-yellow-400' : 'text-stone-400'}`}>
                          {formatCurrency(type.fee)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Outstanding Bill */}
              <div className="mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasOutstandingBill}
                    onChange={(e) => setHasOutstandingBill(e.target.checked)}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-stone-300">Previous owner has outstanding bill</span>
                </label>
              </div>

              {hasOutstandingBill && (
                <div>
                  <label className="block text-sm text-stone-400 mb-2">Outstanding Amount (KES)</label>
                  <input
                    type="number"
                    value={outstandingAmount}
                    onChange={(e) => setOutstandingAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-yellow-500"
                  />
                  <p className="text-xs text-amber-400 mt-2">
                    ⚠️ Outstanding bills must be cleared before transfer
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-yellow-600/20 to-amber-900/20 backdrop-blur-xl rounded-2xl border border-yellow-500/20 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Cost Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-stone-400">{selectedType.name} Fee</span>
                <span className="text-white font-semibold">{formatCurrency(selectedType.fee)}</span>
              </div>

              {hasOutstandingBill && outstandingAmount > 0 && (
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-stone-400">Clear Outstanding Bill</span>
                  <span className="text-amber-400 font-semibold">{formatCurrency(outstandingAmount)}</span>
                </div>
              )}

              <div className="flex justify-between items-center py-4 bg-white/5 rounded-xl px-4 mt-4">
                <span className="text-white font-medium">Total Cost</span>
                <span className="text-2xl font-bold text-yellow-400">{formatCurrency(totalCost)}</span>
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm text-stone-400">
                <Clock className="w-4 h-4" />
                <span>Processing time: 5-10 working days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-6">Transfer Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STEPS.map((step) => (
              <div key={step.step} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-400 font-bold text-sm">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="text-stone-400 text-sm mt-1">{step.description}</p>
                    <p className="text-stone-500 text-xs mt-2">⏱️ {step.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">📄 Required Documents</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-yellow-400 font-medium mb-3">Essential Documents:</h3>
              <ul className="space-y-2">
                {[
                  'Original National ID (new owner)',
                  'Copy of Title Deed / Sale Agreement',
                  'Latest electricity bill',
                  'Duly filled application form',
                  'Meter number',
                ].map((doc) => (
                  <li key={doc} className="flex items-center gap-2 text-sm text-stone-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-yellow-400 font-medium mb-3">Additional (if applicable):</h3>
              <ul className="space-y-2">
                {[
                  'Landlord consent letter (for tenants)',
                  'Company registration (for businesses)',
                  'Power of attorney (if representative)',
                  'Death certificate (for deceased accounts)',
                ].map((doc) => (
                  <li key={doc} className="flex items-center gap-2 text-sm text-stone-300">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-400 font-semibold">Important Notice</p>
              <p className="text-amber-200 text-sm">
                KPLC offices are located across Kenya. Visit the office nearest to your property's location. 
                Some services can be initiated online at selfservice.kplc.co.ke
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
