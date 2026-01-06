'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Car, ArrowLeft, FileText, CheckCircle, AlertCircle } from 'lucide-react'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const VEHICLE_TYPES = [
  { id: 'saloon', name: 'Saloon Car', stampDutyRate: 0.04 },
  { id: 'suv', name: 'SUV/4x4', stampDutyRate: 0.04 },
  { id: 'pickup', name: 'Pickup', stampDutyRate: 0.04 },
  { id: 'motorcycle', name: 'Motorcycle', stampDutyRate: 0.04 },
  { id: 'commercial', name: 'Commercial Vehicle', stampDutyRate: 0.04 },
]

export default function VehicleTransferPage() {
  const [vehicleValue, setVehicleValue] = useState(1500000)
  const [vehicleType, setVehicleType] = useState('saloon')
  const [isFinanced, setIsFinanced] = useState(false)

  const selectedVehicle = VEHICLE_TYPES.find(v => v.id === vehicleType) || VEHICLE_TYPES[0]

  // Calculate all fees
  const stampDuty = vehicleValue * selectedVehicle.stampDutyRate
  const ntsaTransferFee = 3000
  const ntsaSearchFee = 1500
  const inspectionFee = vehicleType === 'motorcycle' ? 500 : 1500
  const numberPlateFee = 1000
  const valuationFee = isFinanced ? 5000 : 0
  const encumbranceRemovalFee = isFinanced ? 2500 : 0
  
  const totalCost = stampDuty + ntsaTransferFee + ntsaSearchFee + inspectionFee + numberPlateFee + valuationFee + encumbranceRemovalFee

  const steps = [
    {
      step: 1,
      title: 'Vehicle Search at NTSA',
      description: 'Verify ownership and check for encumbrances',
      fee: ntsaSearchFee,
      duration: '1 day',
    },
    {
      step: 2,
      title: 'Vehicle Inspection',
      description: 'Physical inspection at NTSA or authorized center',
      fee: inspectionFee,
      duration: '1 day',
    },
    {
      step: 3,
      title: 'Stamp Duty Payment',
      description: 'Pay 4% of vehicle value at KRA iTax',
      fee: stampDuty,
      duration: '1 day',
    },
    {
      step: 4,
      title: 'Transfer Application',
      description: 'Submit transfer forms at NTSA with all documents',
      fee: ntsaTransferFee,
      duration: '3-5 days',
    },
    {
      step: 5,
      title: 'New Logbook Issuance',
      description: 'Collect new logbook in buyer\'s name',
      fee: numberPlateFee,
      duration: '7-14 days',
    },
  ]

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
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Vehicle Logbook Transfer</h1>
          <p className="text-stone-400">Calculate NTSA fees, stamp duty, and total cost to transfer ownership</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Vehicle Details</h2>

              {/* Vehicle Type */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">Vehicle Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {VEHICLE_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setVehicleType(type.id)}
                      className={`p-3 rounded-xl border transition-all text-sm font-medium ${
                        vehicleType === type.id
                          ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:border-white/20'
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Value */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">Vehicle Value (KES)</label>
                <input
                  type="number"
                  value={vehicleValue}
                  onChange={(e) => setVehicleValue(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xl font-semibold focus:outline-none focus:border-orange-500"
                />
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="50000"
                  value={vehicleValue}
                  onChange={(e) => setVehicleValue(Number(e.target.value))}
                  className="w-full mt-4"
                />
                <div className="flex justify-between text-xs text-stone-500 mt-1">
                  <span>KES 100K</span>
                  <span>KES 10M</span>
                </div>
              </div>

              {/* Financed Vehicle */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFinanced}
                    onChange={(e) => setIsFinanced(e.target.checked)}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-stone-300">Vehicle has existing loan/financing</span>
                </label>
                <p className="text-xs text-stone-500 mt-2 ml-8">
                  Additional fees apply for removing bank encumbrance
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-orange-600/20 to-orange-900/20 backdrop-blur-xl rounded-2xl border border-orange-500/20 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Cost Breakdown</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">Stamp Duty (4%)</span>
                <span className="text-white font-semibold">{formatCurrency(stampDuty)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">NTSA Transfer Fee</span>
                <span className="text-white font-semibold">{formatCurrency(ntsaTransferFee)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">NTSA Search Fee</span>
                <span className="text-white font-semibold">{formatCurrency(ntsaSearchFee)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">Inspection Fee</span>
                <span className="text-white font-semibold">{formatCurrency(inspectionFee)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">Number Plate Fee</span>
                <span className="text-white font-semibold">{formatCurrency(numberPlateFee)}</span>
              </div>
              
              {isFinanced && (
                <>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-stone-400">Valuation Fee</span>
                    <span className="text-white font-semibold">{formatCurrency(valuationFee)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-stone-400">Encumbrance Removal</span>
                    <span className="text-white font-semibold">{formatCurrency(encumbranceRemovalFee)}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center py-4 bg-white/5 rounded-xl px-4 mt-4">
                <span className="text-white font-medium">Total Transfer Cost</span>
                <span className="text-2xl font-bold text-orange-400">{formatCurrency(totalCost)}</span>
              </div>

              <p className="text-xs text-stone-500 mt-4">
                * Actual costs may vary. Agent fees (KES 5,000-15,000) not included.
              </p>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-6">Transfer Process Steps</h2>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.step} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-400 font-bold text-sm">{step.step}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white">{step.title}</h3>
                      <span className="text-orange-400 font-semibold">{formatCurrency(step.fee)}</span>
                    </div>
                    <p className="text-stone-400 text-sm">{step.description}</p>
                    <p className="text-stone-500 text-xs mt-1">⏱️ Duration: {step.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">📄 Required Documents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-orange-400 font-medium mb-2">Seller Must Provide:</h3>
              <ul className="space-y-2">
                {['Original Logbook', 'Copy of National ID', 'KRA PIN Certificate', 'Transfer forms (signed)', 'Sale agreement'].map((doc) => (
                  <li key={doc} className="flex items-center gap-2 text-sm text-stone-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-orange-400 font-medium mb-2">Buyer Must Provide:</h3>
              <ul className="space-y-2">
                {['Copy of National ID', 'KRA PIN Certificate', 'Passport photos (2)', 'Proof of payment'].map((doc) => (
                  <li key={doc} className="flex items-center gap-2 text-sm text-stone-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
