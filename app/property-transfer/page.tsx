'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, ArrowLeft, MapPin, CheckCircle } from 'lucide-react'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const LOCATIONS = [
  { id: 'nairobi', name: 'Nairobi', stampDutyRate: 0.04 },
  { id: 'mombasa', name: 'Mombasa', stampDutyRate: 0.04 },
  { id: 'kisumu', name: 'Kisumu', stampDutyRate: 0.04 },
  { id: 'other-urban', name: 'Other Urban Areas', stampDutyRate: 0.04 },
  { id: 'rural', name: 'Rural Areas', stampDutyRate: 0.02 },
]

const PROPERTY_TYPES = [
  { id: 'residential', name: 'Residential' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'land', name: 'Vacant Land' },
  { id: 'agricultural', name: 'Agricultural' },
]

export default function PropertyTransferPage() {
  const [propertyValue, setPropertyValue] = useState(10000000)
  const [location, setLocation] = useState('nairobi')
  const [propertyType, setPropertyType] = useState('residential')
  const [hasLoan, setHasLoan] = useState(false)

  const selectedLocation = LOCATIONS.find(l => l.id === location) || LOCATIONS[0]

  // Calculate all fees
  const stampDuty = propertyValue * selectedLocation.stampDutyRate
  const legalFees = Math.max(50000, propertyValue * 0.01) // 1% with min KES 50,000
  const valuationFees = Math.max(15000, propertyValue * 0.0025) // 0.25% with min
  const landSearchFee = 5000
  const registrationFee = 10000
  const consentFee = propertyType === 'agricultural' ? 10000 : 5000
  const surveyFee = propertyType === 'land' ? 30000 : 0
  const dischargeOfCharge = hasLoan ? 10000 : 0
  
  const totalCost = stampDuty + legalFees + valuationFees + landSearchFee + registrationFee + consentFee + surveyFee + dischargeOfCharge

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
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Property Transfer Calculator</h1>
          <p className="text-stone-400">Calculate stamp duty, legal fees, and total cost to transfer property</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Property Details</h2>

              {/* Property Value */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">Property Value (KES)</label>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xl font-semibold focus:outline-none focus:border-red-500"
                />
                <input
                  type="range"
                  min="1000000"
                  max="100000000"
                  step="500000"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="w-full mt-4"
                />
                <div className="flex justify-between text-xs text-stone-500 mt-1">
                  <span>KES 1M</span>
                  <span>KES 100M</span>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">Location</label>
                <div className="grid grid-cols-2 gap-2">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setLocation(loc.id)}
                      className={`p-3 rounded-xl border transition-all text-sm font-medium flex items-center gap-2 ${
                        location === loc.id
                          ? 'bg-red-500/20 border-red-500 text-red-400'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:border-white/20'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      {loc.name}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-stone-500 mt-2">
                  Rural areas: 2% stamp duty | Urban: 4% stamp duty
                </p>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">Property Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setPropertyType(type.id)}
                      className={`p-3 rounded-xl border transition-all text-sm font-medium ${
                        propertyType === type.id
                          ? 'bg-red-500/20 border-red-500 text-red-400'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:border-white/20'
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Existing Loan */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasLoan}
                    onChange={(e) => setHasLoan(e.target.checked)}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-red-500 focus:ring-red-500"
                  />
                  <span className="text-stone-300">Property has existing mortgage/charge</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-red-600/20 to-red-900/20 backdrop-blur-xl rounded-2xl border border-red-500/20 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Cost Breakdown</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <span className="text-stone-400">Stamp Duty</span>
                  <span className="text-xs text-stone-500 block">
                    ({selectedLocation.stampDutyRate * 100}% - {selectedLocation.name})
                  </span>
                </div>
                <span className="text-white font-semibold">{formatCurrency(stampDuty)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <span className="text-stone-400">Legal/Conveyancing Fees</span>
                  <span className="text-xs text-stone-500 block">(1% of value, min KES 50,000)</span>
                </div>
                <span className="text-white font-semibold">{formatCurrency(legalFees)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">Valuation Fees</span>
                <span className="text-white font-semibold">{formatCurrency(valuationFees)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">Land Search Fee</span>
                <span className="text-white font-semibold">{formatCurrency(landSearchFee)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">Registration Fee</span>
                <span className="text-white font-semibold">{formatCurrency(registrationFee)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">Consent to Transfer</span>
                <span className="text-white font-semibold">{formatCurrency(consentFee)}</span>
              </div>

              {surveyFee > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-stone-400">Survey Fee</span>
                  <span className="text-white font-semibold">{formatCurrency(surveyFee)}</span>
                </div>
              )}

              {hasLoan && (
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-stone-400">Discharge of Charge</span>
                  <span className="text-white font-semibold">{formatCurrency(dischargeOfCharge)}</span>
                </div>
              )}

              <div className="flex justify-between items-center py-4 bg-white/5 rounded-xl px-4 mt-4">
                <span className="text-white font-medium">Total Transfer Cost</span>
                <span className="text-2xl font-bold text-red-400">{formatCurrency(totalCost)}</span>
              </div>

              <div className="flex justify-between items-center py-2 text-sm">
                <span className="text-stone-500">As % of property value</span>
                <span className="text-stone-400">{((totalCost / propertyValue) * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">📄 Required Documents</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-red-400 font-medium mb-3">For Both Parties:</h3>
              <ul className="space-y-2">
                {[
                  'Original Title Deed',
                  'Copy of National ID / Passport',
                  'KRA PIN Certificate',
                  'Passport-size Photos (2 each)',
                  'Sale Agreement (stamped)',
                  'Land Search Certificate',
                  'Land Rates Clearance',
                ].map((doc) => (
                  <li key={doc} className="flex items-center gap-2 text-sm text-stone-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-red-400 font-medium mb-3">Additional (if applicable):</h3>
              <ul className="space-y-2">
                {[
                  'Consent from Land Control Board (agricultural)',
                  'Spousal consent (matrimonial property)',
                  'Company documents (if company owned)',
                  'Discharge letter from bank (if mortgaged)',
                  'Survey map (for land)',
                  'Succession certificate (if inherited)',
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
      </div>
    </div>
  )
}
