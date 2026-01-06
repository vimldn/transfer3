'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Ship, ArrowLeft, Info, Calculator } from 'lucide-react'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const VEHICLE_CATEGORIES = [
  { id: 'sedan', name: 'Sedan/Saloon', importDuty: 0.25, exciseDuty: 0.20 },
  { id: 'suv', name: 'SUV/4x4', importDuty: 0.25, exciseDuty: 0.20 },
  { id: 'pickup', name: 'Single Cab Pickup', importDuty: 0.25, exciseDuty: 0.20 },
  { id: 'double-cab', name: 'Double Cab Pickup', importDuty: 0.25, exciseDuty: 0.20 },
  { id: 'bus', name: 'Bus/Minivan', importDuty: 0.10, exciseDuty: 0.10 },
  { id: 'truck', name: 'Truck/Lorry', importDuty: 0.10, exciseDuty: 0 },
  { id: 'motorcycle', name: 'Motorcycle', importDuty: 0.25, exciseDuty: 0.15 },
]

const ENGINE_SIZES = [
  { id: 'below1500', name: 'Below 1500cc', factor: 1.0 },
  { id: '1500-2000', name: '1500-2000cc', factor: 1.1 },
  { id: '2000-3000', name: '2000-3000cc', factor: 1.2 },
  { id: 'above3000', name: 'Above 3000cc', factor: 1.4 },
]

export default function ImportDutyPage() {
  const [cifValue, setCifValue] = useState(1500000) // Cost + Insurance + Freight
  const [vehicleCategory, setVehicleCategory] = useState('sedan')
  const [engineSize, setEngineSize] = useState('1500-2000')
  const [vehicleAge, setVehicleAge] = useState(3)
  const [isElectric, setIsElectric] = useState(false)

  const selectedCategory = VEHICLE_CATEGORIES.find(c => c.id === vehicleCategory) || VEHICLE_CATEGORIES[0]
  const selectedEngine = ENGINE_SIZES.find(e => e.id === engineSize) || ENGINE_SIZES[0]

  // Age restriction check (max 8 years for imports)
  const isOverAge = vehicleAge > 8

  // Calculate duties
  const importDutyRate = isElectric ? 0 : selectedCategory.importDuty
  const exciseDutyRate = isElectric ? 0 : selectedCategory.exciseDuty * selectedEngine.factor
  
  const importDuty = cifValue * importDutyRate
  const exciseDuty = (cifValue + importDuty) * exciseDutyRate
  const vat = (cifValue + importDuty + exciseDuty) * 0.16
  const idf = cifValue * 0.035 // Import Declaration Fee
  const rdl = cifValue * 0.02 // Railway Development Levy
  
  // Additional fees
  const kebs = 10000 // Standards fee
  const clearingAgent = 25000 // Typical agent fee
  const portCharges = 15000
  
  const totalDuties = importDuty + exciseDuty + vat + idf + rdl
  const totalOtherFees = kebs + clearingAgent + portCharges
  const totalCost = cifValue + totalDuties + totalOtherFees

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
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Ship className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Import Duty Calculator</h1>
          <p className="text-stone-400">Calculate taxes and duties for importing vehicles to Kenya</p>
        </div>

        {isOverAge && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-semibold">Age Restriction Warning</p>
                <p className="text-red-200 text-sm">Kenya does not allow import of vehicles older than 8 years. Your selected vehicle age ({vehicleAge} years) exceeds this limit.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Vehicle Details</h2>

              {/* CIF Value */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-1">CIF Value (KES)</label>
                <p className="text-xs text-stone-500 mb-3">Cost + Insurance + Freight to Mombasa</p>
                <input
                  type="number"
                  value={cifValue}
                  onChange={(e) => setCifValue(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xl font-semibold focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="range"
                  min="500000"
                  max="20000000"
                  step="100000"
                  value={cifValue}
                  onChange={(e) => setCifValue(Number(e.target.value))}
                  className="w-full mt-4"
                />
              </div>

              {/* Vehicle Category */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">Vehicle Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {VEHICLE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setVehicleCategory(cat.id)}
                      className={`p-3 rounded-xl border transition-all text-sm font-medium ${
                        vehicleCategory === cat.id
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:border-white/20'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Engine Size */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">Engine Size</label>
                <div className="grid grid-cols-2 gap-2">
                  {ENGINE_SIZES.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setEngineSize(size.id)}
                      className={`p-3 rounded-xl border transition-all text-sm font-medium ${
                        engineSize === size.id
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:border-white/20'
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Age */}
              <div className="mb-6">
                <label className="block text-sm text-stone-400 mb-3">Vehicle Age (Years): {vehicleAge}</label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={vehicleAge}
                  onChange={(e) => setVehicleAge(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-stone-500 mt-1">
                  <span>New</span>
                  <span className="text-amber-400">Max allowed: 8 years</span>
                </div>
              </div>

              {/* Electric Vehicle */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isElectric}
                    onChange={(e) => setIsElectric(e.target.checked)}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-stone-300">Electric Vehicle (EV)</span>
                </label>
                <p className="text-xs text-emerald-400 mt-2 ml-8">
                  EVs enjoy 0% import duty and excise duty!
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-900/20 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Duty Breakdown</h2>

            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl mb-4">
                <span className="text-stone-400 text-sm">CIF Value</span>
                <p className="text-xl font-semibold text-white">{formatCurrency(cifValue)}</p>
              </div>

              <p className="text-xs text-stone-500 uppercase tracking-wider">Government Duties & Taxes</p>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">Import Duty ({(importDutyRate * 100).toFixed(0)}%)</span>
                <span className="text-white font-semibold">{formatCurrency(importDuty)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">Excise Duty ({(exciseDutyRate * 100).toFixed(1)}%)</span>
                <span className="text-white font-semibold">{formatCurrency(exciseDuty)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">VAT (16%)</span>
                <span className="text-white font-semibold">{formatCurrency(vat)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">IDF Fee (3.5%)</span>
                <span className="text-white font-semibold">{formatCurrency(idf)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">Railway Levy (2%)</span>
                <span className="text-white font-semibold">{formatCurrency(rdl)}</span>
              </div>

              <div className="flex justify-between items-center py-2 bg-cyan-500/10 rounded-lg px-3 my-2">
                <span className="text-cyan-400">Total Duties & Taxes</span>
                <span className="text-cyan-400 font-bold">{formatCurrency(totalDuties)}</span>
              </div>

              <p className="text-xs text-stone-500 uppercase tracking-wider mt-4">Other Fees (Estimated)</p>

              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">KEBS Inspection</span>
                <span className="text-white font-semibold">{formatCurrency(kebs)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">Clearing Agent</span>
                <span className="text-white font-semibold">{formatCurrency(clearingAgent)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-stone-400">Port Charges</span>
                <span className="text-white font-semibold">{formatCurrency(portCharges)}</span>
              </div>

              <div className="flex justify-between items-center py-4 bg-white/5 rounded-xl px-4 mt-4">
                <span className="text-white font-medium">Total Landing Cost</span>
                <span className="text-2xl font-bold text-cyan-400">{formatCurrency(totalCost)}</span>
              </div>

              <p className="text-xs text-stone-500 mt-2">
                * This is an estimate. Actual costs may vary based on specific vehicle and current exchange rates.
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">💡 Import Tips</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-stone-300">
            <ul className="space-y-2">
              <li>• Maximum vehicle age for import: <strong className="text-white">8 years</strong></li>
              <li>• Electric vehicles get <strong className="text-emerald-400">0% duty</strong></li>
              <li>• Trucks and buses have lower duty rates</li>
              <li>• Get a KEBS inspection certificate before shipping</li>
            </ul>
            <ul className="space-y-2">
              <li>• CIF includes: purchase price + shipping + insurance</li>
              <li>• Consider depreciation for customs valuation</li>
              <li>• Use a reputable clearing agent</li>
              <li>• Budget 60-80% of CIF for total duties</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
