"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, TrendingUp, BarChart3, MoreHorizontal, ChevronRight, Plus, Wifi, Edit, Copy } from "lucide-react"
import FiatWallet from "./fiat-wallet"
import AddCryptoPage from "./add-crypto-page"
import BuySellCrypto from "./buy-sell-crypto"

export default function Component() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1d")
  const [selectedCategory, setSelectedCategory] = useState("Favourites")
  const [currentWallet, setCurrentWallet] = useState<"crypto" | "fiat">("crypto")
  const [showAddCrypto, setShowAddCrypto] = useState(false)
  const [hideAddress, setHideAddress] = useState(false)
  const [showBuySell, setShowBuySell] = useState(false)

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

  const cryptoData = [
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
  ]

  if (currentWallet === "fiat") {
    return <FiatWallet onBack={() => setCurrentWallet("crypto")} />
  }

  if (showAddCrypto) {
    return <AddCryptoPage onBack={() => setShowAddCrypto(false)} />
  }

  if (showBuySell) {
    return <BuySellCrypto onBack={() => setShowBuySell(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header - Crypto Wallet */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6 mx-4 mt-4 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Crypto Wallet</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentWallet("fiat")}
                className="text-xs text-blue-200 hover:text-white hover:bg-white/20 px-2 py-1 rounded-full"
              >
                Switch to Fiat
              </Button>
            </div>
          </div>
          <Wifi className="w-4 h-4" />
        </div>

        <div className="mb-8">
          <p className="text-sm text-blue-200 mb-2">Total Portfolio Value</p>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-4xl font-bold">RM 24,831.18</h1>
            <ChevronRight className="w-6 h-6 text-gray-300" />
          </div>
          <p className="text-sm text-blue-200">RM +1,245.67 (+5.28%) over the last day</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-3 mb-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-pink-200">Wallet Address</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHideAddress(!hideAddress)}
              className="text-xs text-pink-200 hover:bg-white/20 px-2 py-1 rounded-full"
            >
              {hideAddress ? "Show" : "Hide"}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono">{hideAddress ? "••••••••••••••••••••" : "1A2b3C4d5E6f7G8h9I0j"}</code>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-4 flex flex-col items-center gap-2 h-auto"
            onClick={() => setShowBuySell(true)}
          >
            <Coins className="w-5 h-5" />
            <span className="text-xs font-medium">Buy</span>
          </Button>
          <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-4 flex flex-col items-center gap-2 h-auto">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-medium">Sell</span>
          </Button>
          <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-4 flex flex-col items-center gap-2 h-auto">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-medium">Stake</span>
          </Button>
          <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-4 flex flex-col items-center gap-2 h-auto">
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-xs font-medium">More</span>
          </Button>
        </div>
      </div>

      {/* Crypto Prices Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Crypto prices</h2>
          <Button variant="ghost" size="sm" className="text-blue-600">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap rounded-full ${
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
        <div className="flex gap-2 mb-6">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? "default" : "ghost"}
              size="sm"
              className={`rounded-full ${
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
        <div className="space-y-3">
          {cryptoData.map((crypto) => (
            <Card key={crypto.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${crypto.iconColor} flex items-center justify-center text-white font-bold`}
                    >
                      {crypto.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{crypto.name}</h3>
                        {crypto.reward && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                            {crypto.reward}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{crypto.symbol}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Mini Chart Placeholder */}
                    <div className="w-16 h-8">
                      <svg viewBox="0 0 64 32" className="w-full h-full">
                        <path
                          d={crypto.isPositive ? "M0,20 Q16,15 32,10 T64,8" : "M0,10 Q16,12 32,18 T64,24"}
                          stroke={crypto.isPositive ? "#10b981" : "#ef4444"}
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{crypto.value}</p>
                      <p className="text-xs text-gray-500">{crypto.holdings}</p>
                      <p className={`text-sm ${crypto.isPositive ? "text-green-600" : "text-red-600"}`}>
                        {crypto.change}
                      </p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400" />
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
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Add to list</h3>
                    <p className="text-sm text-gray-500">20 available</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
