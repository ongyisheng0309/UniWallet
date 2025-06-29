"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Coins,
  BarChart3,
  MoreHorizontal,
  ChevronRight,
  Plus,
  Wifi,
  Edit,
  Copy,
  CreditCard,
  TrendingUp,
  Send,
  QrCode,
} from "lucide-react"
import FiatWallet from "./fiat-wallet"
import AddCryptoPage from "./add-crypto-page"
import BuySellCrypto from "./buy-sell-crypto"
import CryptoPayPage from "./crypto-pay-page"
import StakingPage from "./staking-page"
import CryptoReceivePage from "./crypto-receive-page"
import CryptoSendPage from "./crypto-send-page"

export default function Component() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1d")
  const [selectedCategory, setSelectedCategory] = useState("Favourites")
  const [currentWallet, setCurrentWallet] = useState<"crypto" | "fiat">("crypto")
  const [showAddCrypto, setShowAddCrypto] = useState(false)
  const [hideAddress, setHideAddress] = useState(false)
  const [showBuySell, setShowBuySell] = useState(false)
  const [showCryptoPay, setShowCryptoPay] = useState(false)
  const [showStaking, setShowStaking] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showReceive, setShowReceive] = useState(false)
  const [showSend, setShowSend] = useState(false)

  const timeframes = ["1d", "1w", "1m", "6m", "1y", "All"]
  const categories = [
    "Favourites",
    "All",
    "Top movers",
    "% Reward",
    "Layer 1",
    "DeFi",
    "Smart contracts",
    "AI x Crypto",
  ]

  const [cryptoData, setCryptoData] = useState([
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: "RM 453,988",
      change: "-0.55%",
      isPositive: false,
      icon: "₿",
      iconColor: "bg-orange-500",
      reward: null,
      holdings: "0.0234 BTC",
      value: "RM 10,623.45",
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      price: "RM 10,323",
      change: "+0.22%",
      isPositive: true,
      icon: "Ξ",
      iconColor: "bg-blue-600",
      reward: "2.1% reward",
      holdings: "1.2567 ETH",
      value: "RM 12,975.23",
    },
    {
      id: 3,
      name: "Cardano",
      symbol: "ADA",
      price: "RM 1.45",
      change: "+1.23%",
      isPositive: true,
      icon: "₳",
      iconColor: "bg-blue-500",
      reward: null,
      holdings: "850.00 ADA",
      value: "RM 1,232.50",
    },
  ])

  const addCryptoToList = (crypto: any) => {
    const newCrypto = {
      ...crypto,
      id: cryptoData.length + 1,
      holdings: "0.00 " + crypto.symbol,
      value: "RM 0.00",
    }
    setCryptoData((prev) => [...prev, newCrypto])
    setShowAddCrypto(false)
  }

  if (currentWallet === "fiat") {
    return <FiatWallet onBack={() => setCurrentWallet("crypto")} />
  }

  if (showAddCrypto) {
    return <AddCryptoPage onBack={() => setShowAddCrypto(false)} onAddCrypto={addCryptoToList} />
  }

  if (showBuySell) {
    return <BuySellCrypto onBack={() => setShowBuySell(false)} />
  }

  if (showCryptoPay) {
    return <CryptoPayPage onBack={() => setShowCryptoPay(false)} onSuccess={() => setShowCryptoPay(false)} />
  }

  if (showStaking) {
    return <StakingPage onBack={() => setShowStaking(false)} />
  }

  if (showReceive) {
    return <CryptoReceivePage onBack={() => setShowReceive(false)} cryptoData={cryptoData} />
  }

  if (showSend) {
    return <CryptoSendPage onBack={() => setShowSend(false)} cryptoData={cryptoData} />
  }

  return (
    <div>
      {/* Header - Crypto Wallet */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6 m-4 rounded-3xl shadow-2xl animate-fade-in-up">
        <div className="flex items-center justify-between mb-6 animate-slide-in-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-float">
              <Coins className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-base font-medium">Crypto Wallet</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentWallet("fiat")}
                className="text-xs text-blue-200 hover:text-white hover:bg-white/20 px-3 py-2 rounded-full transition-all duration-300 hover:scale-105"
              >
                Switch to Fiat
              </Button>
            </div>
          </div>
          <Wifi className="w-5 h-5 animate-pulse" />
        </div>

        <div className="mb-10 animate-slide-in-right delay-200">
          <p className="text-sm text-blue-200 mb-3">Total Portfolio Value</p>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-5xl font-bold animate-scale-in delay-300">RM 24,831.18</h1>
            <ChevronRight className="w-7 h-7 text-gray-300 animate-bounce" />
          </div>
          <p className="text-sm text-blue-200 animate-fade-in-up delay-500">RM +1,245.67 (+5.28%) over the last day</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-pink-200">Wallet Address</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHideAddress(!hideAddress)}
              className="text-xs text-pink-200 hover:bg-white/20 px-3 py-1 rounded-full"
            >
              {hideAddress ? "Show" : "Hide"}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono">{hideAddress ? "••••••••••••••••••••" : "1A2b3C4d5E6f7G8h9I0j"}</code>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Action Buttons - Merged Buy/Sell into Trade */}
        <div className="grid grid-cols-4 gap-4 animate-fade-in-up delay-700">
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-5 flex flex-col items-center gap-2 h-auto hover-lift transition-all duration-300 hover:scale-105 animate-glow"
            onClick={() => setShowBuySell(true)}
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-medium">Trade</span>
          </Button>
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-5 flex flex-col items-center gap-2 h-auto hover-lift transition-all duration-300 hover:scale-105"
            onClick={() => setShowCryptoPay(true)}
          >
            <CreditCard className="w-6 h-6" />
            <span className="text-xs font-medium">Pay</span>
          </Button>
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-5 flex flex-col items-center gap-2 h-auto hover-lift transition-all duration-300 hover:scale-105"
            onClick={() => setShowStaking(true)}
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs font-medium">Stake</span>
          </Button>
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-5 flex flex-col items-center gap-2 h-auto hover-lift transition-all duration-300 hover:scale-105 relative"
            onClick={() => setShowMoreMenu(!showMoreMenu)}
          >
            <MoreHorizontal className="w-6 h-6" />
            <span className="text-xs font-medium">More</span>

            {showMoreMenu && (
              <div className="absolute bottom-full mb-2 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 min-w-[160px] z-50 animate-fade-in-up">
                <Button
                  variant="ghost"
                  className="w-full justify-start p-3 hover:bg-blue-50 rounded-xl"
                  onClick={() => {
                    setShowMoreMenu(false)
                    setShowReceive(true)
                  }}
                >
                  <QrCode className="w-4 h-4 mr-3 text-blue-600" />
                  <span className="text-gray-700">Receive</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start p-3 hover:bg-green-50 rounded-xl"
                  onClick={() => {
                    setShowMoreMenu(false)
                    setShowSend(true)
                  }}
                >
                  <Send className="w-4 h-4 mr-3 text-green-600" />
                  <span className="text-gray-700">Send</span>
                </Button>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Crypto Prices Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Crypto prices</h2>
          <Button variant="ghost" size="sm" className="text-blue-600">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap rounded-full px-4 py-2 ${
                selectedCategory === category
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "Favourites" && selectedCategory === category && "✓ "}
              {category}
            </Button>
          ))}
        </div>

        {/* Time Frame Selector */}
        <div className="flex gap-3 mb-8">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? "default" : "ghost"}
              size="sm"
              className={`rounded-full px-4 py-2 ${
                selectedTimeframe === timeframe
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe}
            </Button>
          ))}
        </div>

        {/* Crypto Cards */}
        <div className="space-y-4">
          {cryptoData.map((crypto, index) => (
            <Card
              key={crypto.id}
              className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${crypto.iconColor} flex items-center justify-center text-white font-bold text-lg transition-all duration-300`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {crypto.icon}
                    </div>
                    <div className="animate-slide-in-left" style={{ animationDelay: `${index * 200}ms` }}>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900 text-lg gradient-text">{crypto.name}</h3>
                        {crypto.reward && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs animate-pulse">
                            {crypto.reward}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{crypto.symbol}</p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-4 animate-slide-in-right"
                    style={{ animationDelay: `${index * 250}ms` }}
                  >
                    {/* Mini Chart Placeholder */}
                    <div className="w-20 h-10 hover:scale-110 transition-transform duration-300">
                      <svg viewBox="0 0 64 32" className="w-full h-full">
                        <path
                          d={crypto.isPositive ? "M0,20 Q16,15 32,10 T64,8" : "M0,10 Q16,12 32,18 T64,24"}
                          stroke={crypto.isPositive ? "#10b981" : "#ef4444"}
                          strokeWidth="2"
                          fill="none"
                          className="animate-pulse"
                        />
                      </svg>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-lg">{crypto.value}</p>
                      <p className="text-sm text-gray-500 mb-1">{crypto.holdings}</p>
                      <p
                        className={`text-sm font-medium ${crypto.isPositive ? "text-green-600" : "text-red-600"} animate-pulse`}
                      >
                        {crypto.change}
                      </p>
                    </div>

                    <ChevronRight className="w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors duration-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add to List Card */}
          <Card
            className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
            onClick={() => setShowAddCrypto(true)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Add to list</h3>
                    <p className="text-sm text-gray-500">20 available</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
