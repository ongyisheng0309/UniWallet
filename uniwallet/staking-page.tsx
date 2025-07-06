"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BarChart3, Clock, Lock, AlertCircle } from "lucide-react"
import PaymentSuccessModal from "./payment-success-modal"

interface StakingPageProps {
  onBack: () => void
}

export default function StakingPage({ onBack }: StakingPageProps) {
  const [selectedCrypto, setSelectedCrypto] = useState("ETH")
  const [stakeAmount, setStakeAmount] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("30")

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successData, setSuccessData] = useState<any>(null)

  const stakingOptions = [
    {
      symbol: "ETH",
      name: "Ethereum",
      apy: "4.5%",
      minStake: "0.1 ETH",
      holdings: "1.2567 ETH",
      value: "RM 12,975.23",
      icon: "Ξ",
      color: "bg-blue-600",
      available: true,
    },
    {
      symbol: "ADA",
      name: "Cardano",
      apy: "5.2%",
      minStake: "10 ADA",
      holdings: "850.00 ADA",
      value: "RM 1,232.50",
      icon: "₳",
      color: "bg-blue-500",
      available: true,
    },
    {
      symbol: "DOT",
      name: "Polkadot",
      apy: "12.5%",
      minStake: "1 DOT",
      holdings: "0 DOT",
      value: "RM 0.00",
      icon: "●",
      color: "bg-pink-600",
      available: false,
    },
    {
      symbol: "SOL",
      name: "Solana",
      apy: "7.8%",
      minStake: "0.01 SOL",
      holdings: "0 SOL",
      value: "RM 0.00",
      icon: "◎",
      color: "bg-purple-500",
      available: false,
    },
  ]

  const stakingPeriods = [
    { days: "30", apy: "4.5%", label: "30 Days" },
    { days: "60", apy: "5.2%", label: "60 Days" },
    { days: "90", apy: "6.8%", label: "90 Days" },
    { days: "180", apy: "8.5%", label: "180 Days" },
  ]

  const activeStakes = [
    {
      id: 1,
      crypto: "ETH",
      amount: "0.5 ETH",
      value: "RM 5,161.50",
      apy: "4.5%",
      period: "30 Days",
      daysLeft: 15,
      earned: "RM 32.25",
      icon: "Ξ",
      color: "bg-blue-600",
    },
    {
      id: 2,
      crypto: "ADA",
      amount: "500 ADA",
      value: "RM 725.00",
      apy: "5.2%",
      period: "60 Days",
      daysLeft: 42,
      earned: "RM 18.90",
      icon: "₳",
      color: "bg-blue-500",
    },
  ]

  const selectedCryptoData = stakingOptions.find((crypto) => crypto.symbol === selectedCrypto)
  const selectedPeriodData = stakingPeriods.find((period) => period.days === selectedPeriod)

  const calculateRewards = () => {
    if (!stakeAmount || !selectedCryptoData || !selectedPeriodData) return "0.00"
    const amount = Number.parseFloat(stakeAmount)
    const apy = Number.parseFloat(selectedPeriodData.apy.replace("%", "")) / 100
    const days = Number.parseInt(selectedPeriod)
    const dailyRate = apy / 365
    const totalReward = amount * dailyRate * days
    return totalReward.toFixed(6)
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-8 mx-6 mt-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-2 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Crypto Staking</h1>
              <p className="text-sm text-blue-200">Earn rewards by staking your cryptocurrencies</p>
            </div>
          </div>
        </div>

        {/* Staking Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="text-xs text-blue-200 mb-1">Total Staked</p>
            <p className="text-2xl font-bold">RM 5,886.50</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="text-xs text-blue-200 mb-1">Total Earned</p>
            <p className="text-2xl font-bold text-green-300">RM 51.15</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Active Stakes */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Stakes</h2>
          <div className="space-y-4">
            {activeStakes.map((stake) => (
              <Card key={stake.id} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full ${stake.color} flex items-center justify-center text-white font-bold text-lg`}
                      >
                        {stake.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{stake.crypto} Staking</h3>
                        <p className="text-sm text-gray-500">
                          {stake.amount} • {stake.period}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-lg">{stake.value}</p>
                      <p className="text-sm text-green-600">+{stake.earned} earned</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">{stake.daysLeft} days left</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${((Number.parseInt(stake.period.split(" ")[0]) - stake.daysLeft) / Number.parseInt(stake.period.split(" ")[0])) * 100}%`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* New Staking */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">Start New Staking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Crypto Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Cryptocurrency</Label>
              <div className="grid grid-cols-2 gap-3">
                {stakingOptions.map((crypto) => (
                  <Button
                    key={crypto.symbol}
                    variant={selectedCrypto === crypto.symbol ? "default" : "outline"}
                    className={`p-4 h-auto justify-start ${
                      selectedCrypto === crypto.symbol ? "bg-blue-600 text-white" : "bg-white"
                    } ${!crypto.available ? "opacity-50" : ""}`}
                    onClick={() => crypto.available && setSelectedCrypto(crypto.symbol)}
                    disabled={!crypto.available}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div
                        className={`w-10 h-10 rounded-full ${crypto.color} flex items-center justify-center text-white font-bold`}
                      >
                        {crypto.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm">{crypto.symbol}</p>
                          <Badge variant="secondary" className="text-xs">
                            {crypto.apy} APY
                          </Badge>
                        </div>
                        <p className="text-xs opacity-70">{crypto.available ? crypto.holdings : "Not available"}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {selectedCryptoData?.available && (
              <>
                {/* Staking Period */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Staking Period</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {stakingPeriods.map((period) => (
                      <Button
                        key={period.days}
                        variant={selectedPeriod === period.days ? "default" : "outline"}
                        className={`p-4 h-auto ${
                          selectedPeriod === period.days ? "bg-blue-600 text-white" : "bg-white"
                        }`}
                        onClick={() => setSelectedPeriod(period.days)}
                      >
                        <div className="text-center">
                          <p className="font-semibold">{period.label}</p>
                          <p className="text-sm opacity-70">{period.apy} APY</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <Label htmlFor="stake-amount" className="text-sm font-medium text-gray-700">
                    Amount to Stake ({selectedCrypto})
                  </Label>
                  <Input
                    id="stake-amount"
                    type="number"
                    placeholder="0.00"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="mt-2 text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Available: {selectedCryptoData.holdings} • Min: {selectedCryptoData.minStake}
                  </p>
                </div>

                {/* Rewards Calculation */}
                {stakeAmount && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-green-800 mb-3">Estimated Rewards</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Staking Amount:</span>
                          <span>
                            {stakeAmount} {selectedCrypto}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>APY:</span>
                          <span>{selectedPeriodData?.apy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Period:</span>
                          <span>{selectedPeriod} days</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                          <span>Estimated Rewards:</span>
                          <span>
                            {calculateRewards()} {selectedCrypto}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Warning */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-800 text-sm">Important Notice</h4>
                        <p className="text-xs text-amber-700 mt-1">
                          Staked tokens will be locked for the selected period. You cannot withdraw them until the
                          staking period ends. Rewards are not guaranteed and may vary based on network conditions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                  disabled={!stakeAmount || Number.parseFloat(stakeAmount) <= 0}
                  onClick={() => {
                    const unlockDate = new Date()
                    unlockDate.setDate(unlockDate.getDate() + Number.parseInt(selectedPeriod))

                    const txId = `STAKE${Date.now().toString().slice(-8)}`

                    setSuccessData({
                      crypto: selectedCrypto,
                      amount: stakeAmount,
                      apy: selectedPeriodData?.apy,
                      period: selectedPeriod,
                      expectedRewards: calculateRewards(),
                      unlockDate: unlockDate.toLocaleDateString(),
                      txId,
                    })
                    setShowSuccessModal(true)
                  }}
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Start Staking
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      {showSuccessModal && successData && (
        <PaymentSuccessModal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false)
            onBack()
          }}
          title="Staking Started!"
          subtitle={`Your ${successData.crypto} has been successfully staked`}
          amount={`${successData.amount} ${successData.crypto}`}
          recipient="Staking Pool"
          transactionId={successData.txId}
          transactionType="Crypto Staking"
          additionalDetails={[
            { label: "APY", value: successData.apy },
            { label: "Period", value: `${successData.period} days` },
            { label: "Expected Rewards", value: `${successData.expectedRewards} ${successData.crypto}` },
            { label: "Unlock Date", value: successData.unlockDate },
          ]}
        />
      )}
    </div>
  )
}
