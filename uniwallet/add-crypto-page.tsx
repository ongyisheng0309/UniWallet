"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, TrendingUp, Plus } from "lucide-react"

interface AddCryptoPageProps {
  onBack: () => void
}

export default function AddCryptoPage({ onBack }: AddCryptoPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Top Gainers", "Top Losers", "DeFi", "Layer 1", "Meme Coins", "AI & Big Data"]

  const availableCryptos = [
    {
      id: 1,
      name: "Solana",
      symbol: "SOL",
      price: "RM 425.67",
      change: "+8.45%",
      isPositive: true,
      icon: "◎",
      iconColor: "bg-purple-500",
      marketCap: "RM 201.2B",
      category: "Layer 1",
    },
    {
      id: 2,
      name: "Chainlink",
      symbol: "LINK",
      price: "RM 67.89",
      change: "+12.34%",
      isPositive: true,
      icon: "⬢",
      iconColor: "bg-blue-500",
      marketCap: "RM 42.1B",
      category: "DeFi",
    },
    {
      id: 3,
      name: "Polygon",
      symbol: "MATIC",
      price: "RM 3.45",
      change: "-2.15%",
      isPositive: false,
      icon: "⬟",
      iconColor: "bg-purple-600",
      marketCap: "RM 8.9B",
      category: "Layer 1",
    },
    {
      id: 4,
      name: "Uniswap",
      symbol: "UNI",
      price: "RM 28.90",
      change: "+5.67%",
      isPositive: true,
      icon: "🦄",
      iconColor: "bg-pink-500",
      marketCap: "RM 21.4B",
      category: "DeFi",
    },
    {
      id: 5,
      name: "Avalanche",
      symbol: "AVAX",
      price: "RM 156.78",
      change: "+15.23%",
      isPositive: true,
      icon: "▲",
      iconColor: "bg-red-500",
      marketCap: "RM 65.3B",
      category: "Layer 1",
    },
    {
      id: 6,
      name: "Dogecoin",
      symbol: "DOGE",
      price: "RM 0.34",
      change: "+25.67%",
      isPositive: true,
      icon: "Ð",
      iconColor: "bg-yellow-500",
      marketCap: "RM 48.7B",
      category: "Meme Coins",
    },
    {
      id: 7,
      name: "Polkadot",
      symbol: "DOT",
      price: "RM 23.45",
      change: "-1.23%",
      isPositive: false,
      icon: "●",
      iconColor: "bg-pink-600",
      marketCap: "RM 32.1B",
      category: "Layer 1",
    },
    {
      id: 8,
      name: "Shiba Inu",
      symbol: "SHIB",
      price: "RM 0.000089",
      change: "+45.67%",
      isPositive: true,
      icon: "🐕",
      iconColor: "bg-orange-600",
      marketCap: "RM 15.2B",
      category: "Meme Coins",
    },
  ]

  const filteredCryptos = availableCryptos.filter((crypto) => {
    const matchesSearch =
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || crypto.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const topGainers = availableCryptos
    .filter((crypto) => crypto.isPositive)
    .sort((a, b) => Number.parseFloat(b.change.replace(/[+%]/g, "")) - Number.parseFloat(a.change.replace(/[+%]/g, "")))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6 mx-4 mt-4 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-2 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Add Cryptocurrency</h1>
            <p className="text-sm text-blue-200">Choose from 20+ available cryptocurrencies</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300 rounded-2xl"
          />
        </div>
      </div>

      <div className="p-4">
        {/* Top Gainers */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Top Gainers Today
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {topGainers.map((crypto) => (
              <Card
                key={crypto.id}
                className="min-w-[140px] border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50"
              >
                <CardContent className="p-3 text-center">
                  <div
                    className={`w-8 h-8 rounded-full ${crypto.iconColor} flex items-center justify-center text-white font-bold mx-auto mb-2`}
                  >
                    {crypto.icon}
                  </div>
                  <p className="font-semibold text-sm text-gray-900">{crypto.symbol}</p>
                  <p className="text-green-600 text-sm font-medium">{crypto.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
              {category}
            </Button>
          ))}
        </div>

        {/* Available Cryptocurrencies */}
        <div className="space-y-3">
          {filteredCryptos.map((crypto) => (
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
                        <Badge variant="secondary" className="text-xs">
                          {crypto.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">{crypto.symbol}</p>
                        <span className="text-xs text-gray-400">•</span>
                        <p className="text-xs text-gray-400">Cap: {crypto.marketCap}</p>
                      </div>
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
                      <p className="font-semibold text-gray-900">{crypto.price}</p>
                      <p className={`text-sm ${crypto.isPositive ? "text-green-600" : "text-red-600"}`}>
                        {crypto.change}
                      </p>
                    </div>

                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3">
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCryptos.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No cryptocurrencies found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
