"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, TrendingDown, Wallet, CreditCard } from "lucide-react"

interface BuySellCryptoProps {
  onBack: () => void
}

export default function BuySellCrypto({ onBack }: BuySellCryptoProps) {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC")
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("wallet")

  const cryptoOptions = [
    { symbol: "BTC", name: "Bitcoin", price: "RM 453,988", icon: "₿", color: "bg-orange-500" },
    { symbol: "ETH", name: "Ethereum", price: "RM 10,323", icon: "Ξ", color: "bg-blue-600" },
    { symbol: "ADA", name: "Cardano", price: "RM 1.45", icon: "₳", color: "bg-blue-500" },
    { symbol: "SOL", name: "Solana", price: "RM 425.67", icon: "◎", color: "bg-purple-500" },
  ]

  const selectedCryptoData = cryptoOptions.find((crypto) => crypto.symbol === selectedCrypto)

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6 mx-4 mt-4 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-2 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Buy & Sell Crypto</h1>
            <p className="text-sm text-blue-200">Trade cryptocurrencies instantly</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="buy" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Buy Cryptocurrency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Crypto Selection */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Cryptocurrency</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {cryptoOptions.map((crypto) => (
                      <Button
                        key={crypto.symbol}
                        variant={selectedCrypto === crypto.symbol ? "default" : "outline"}
                        className={`p-4 h-auto flex flex-col items-center gap-2 ${
                          selectedCrypto === crypto.symbol ? "bg-blue-600 text-white" : ""
                        }`}
                        onClick={() => setSelectedCrypto(crypto.symbol)}
                      >
                        <div
                          className={`w-8 h-8 rounded-full ${crypto.color} flex items-center justify-center text-white font-bold`}
                        >
                          {crypto.icon}
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-sm">{crypto.symbol}</p>
                          <p className="text-xs opacity-70">{crypto.price}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                    Amount (RM)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-2 text-lg"
                  />
                  {amount && selectedCryptoData && (
                    <p className="text-sm text-gray-500 mt-2">
                      ≈{" "}
                      {(
                        Number.parseFloat(amount) / Number.parseFloat(selectedCryptoData.price.replace(/[RM,]/g, ""))
                      ).toFixed(6)}{" "}
                      {selectedCrypto}
                    </p>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Payment Method</Label>
                  <div className="space-y-3">
                    <Button
                      variant={paymentMethod === "wallet" ? "default" : "outline"}
                      className="w-full justify-start p-4 h-auto"
                      onClick={() => setPaymentMethod("wallet")}
                    >
                      <Wallet className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Fiat Wallet</p>
                        <p className="text-sm opacity-70">Balance: RM 12,847.50</p>
                      </div>
                    </Button>
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      className="w-full justify-start p-4 h-auto"
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CreditCard className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Credit/Debit Card</p>
                        <p className="text-sm opacity-70">**** **** **** 1234</p>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Transaction Summary */}
                {amount && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-green-800 mb-2">Transaction Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span>RM {amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fee (1.5%):</span>
                          <span>RM {(Number.parseFloat(amount) * 0.015).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                          <span>Total:</span>
                          <span>RM {(Number.parseFloat(amount) * 1.015).toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold">
                  Buy {selectedCrypto}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sell">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-red-600">Sell Cryptocurrency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Holdings */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Your Holdings</Label>
                  <div className="space-y-3">
                    <Card className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                              ₿
                            </div>
                            <div>
                              <p className="font-semibold">Bitcoin</p>
                              <p className="text-sm text-gray-500">0.0234 BTC</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">RM 10,623.45</p>
                            <Button size="sm" variant="outline" className="mt-1 bg-transparent">
                              Sell
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                              Ξ
                            </div>
                            <div>
                              <p className="font-semibold">Ethereum</p>
                              <p className="text-sm text-gray-500">1.2567 ETH</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">RM 12,975.23</p>
                            <Button size="sm" variant="outline" className="mt-1 bg-transparent">
                              Sell
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Quick Sell Options */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Quick Sell</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" size="sm">
                      25%
                    </Button>
                    <Button variant="outline" size="sm">
                      50%
                    </Button>
                    <Button variant="outline" size="sm">
                      75%
                    </Button>
                    <Button variant="outline" size="sm">
                      100%
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
