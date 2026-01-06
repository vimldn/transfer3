import Link from 'next/link'
import { 
  Smartphone, 
  Building2, 
  Globe, 
  Car, 
  Home, 
  Ship, 
  Zap, 
  PiggyBank, 
  Phone,
  Calculator
} from 'lucide-react'

const calculators = {
  'mpesa-calculator': {
    title: 'M-Pesa Fee Calculator',
    description: 'Calculate your M-Pesa send money, withdraw, and Paybill fees instantly',
    href: '/mpesa-calculator',
    icon: Smartphone,
    color: 'from-green-500 to-emerald-600',
  },
  'bank-transfer': {
    title: 'Bank Transfer Calculator',
    description: 'Compare Pesalink, RTGS, and EFT fees across all Kenyan banks',
    href: '/bank-transfer',
    icon: Building2,
    color: 'from-blue-500 to-blue-600',
  },
  'remittance': {
    title: 'Remittance Calculator',
    description: 'Compare Wise, WorldRemit, Remitly & M-Pesa Global rates',
    href: '/remittance',
    icon: Globe,
    color: 'from-purple-500 to-purple-600',
  },
  'vehicle-transfer': {
    title: 'Vehicle Transfer Calculator',
    description: 'Calculate NTSA fees, stamp duty, and total logbook transfer costs',
    href: '/vehicle-transfer',
    icon: Car,
    color: 'from-orange-500 to-orange-600',
  },
  'property-transfer': {
    title: 'Property Transfer Calculator',
    description: 'Calculate stamp duty, legal fees, and conveyancing costs',
    href: '/property-transfer',
    icon: Home,
    color: 'from-red-500 to-red-600',
  },
  'import-duty': {
    title: 'Import Duty Calculator',
    description: 'Calculate taxes and duties for importing vehicles to Kenya',
    href: '/import-duty',
    icon: Ship,
    color: 'from-cyan-500 to-cyan-600',
  },
  'kplc-transfer': {
    title: 'KPLC Meter Transfer',
    description: 'Process and costs to transfer electricity meter ownership',
    href: '/kplc-transfer',
    icon: Zap,
    color: 'from-yellow-500 to-amber-600',
  },
  'pension-transfer': {
    title: 'Pension Transfer Calculator',
    description: 'Calculate NSSF contributions and pension transfer costs',
    href: '/pension-transfer',
    icon: PiggyBank,
    color: 'from-pink-500 to-pink-600',
  },
  'mobile-portability': {
    title: 'Mobile Portability Guide',
    description: 'Keep your number when switching networks',
    href: '/mobile-portability',
    icon: Phone,
    color: 'from-teal-500 to-teal-600',
  },
}

interface CalculatorBannerProps {
  calculatorKey: string
}

export default function CalculatorBanner({ calculatorKey }: CalculatorBannerProps) {
  const calc = calculators[calculatorKey as keyof typeof calculators] || calculators['mpesa-calculator']
  const Icon = calc.icon

  return (
    <Link 
      href={calc.href}
      className="block my-8 group"
    >
      <div className={`bg-gradient-to-r ${calc.color} rounded-2xl p-6 md:p-8 relative overflow-hidden`}>
        {/* Background decoration */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute right-20 bottom-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2" />
        
        <div className="relative z-10 flex items-center gap-6">
          <div className="hidden sm:flex w-16 h-16 bg-white/20 rounded-xl items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm font-medium">Try Our Calculator</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{calc.title}</h3>
            <p className="text-white/80 text-sm md:text-base">{calc.description}</p>
          </div>
          <div className="hidden md:block">
            <span className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Calculate Now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
