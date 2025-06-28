"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Send, QrCode, Plus, Minus, Banknote, TrendingUp, History, Wifi, Copy, Camera } from "lucide-react"
import FiatTransactionsComponent from "./fiat-transaction"
import QRScannerPay from "./qr-scanner-pay"

interface FiatWalletProps {
  onBack: () => void
}

export default function FiatWallet({ onBack }: FiatWalletProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1d")
  const [hideDetails, setHideDetails] = useState(false)
  const [showSendReceive, setShowSendReceive] = useState<"send" | "receive" | "topup" | "pay" | null>(null)

  const timeframes = ["1d", "1w", "1m", "6m", "1y", "All"]

  const recentTransactions = [
    {
      id: 1,
      type: "received",
      amount: "+RM 2,500.00",
      description: "Salary Deposit",
      date: "Today, 2:30 PM",
      isPositive: true,
    },
    {
      id: 2,
      type: "sent",
      amount: "-RM 150.00",
      description: "Online Shopping",
      date: "Yesterday, 4:15 PM",
      isPositive: false,
    },
    {
      id: 3,
      type: "received",
      amount: "+RM 75.50",
      description: "Cashback Reward",
      date: "2 days ago",
      isPositive: true,
    },
  ]

  if (showSendReceive === "pay") {
    return <QRScannerPay onBack={() => setShowSendReceive(null)} />
  }

  if (showSendReceive) {
    return <FiatTransactionsComponent type={showSendReceive} onBack={() => setShowSendReceive(null)} />
  }

  return (
    <div>
      {/* Header - Fiat Wallet */}
      <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white p-8 mx-6 mt-6 rounded-3xl shadow-2xl animate-fade-in-up">
        <div className="flex items-center justify-between mb-6 animate-slide-in-left">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-float">
                <Banknote className="w-5 h-5" />
              </div>
              <span className="text-base font-medium">Fiat Wallet</span>
            </div>
          </div>
          <Wifi className="w-5 h-5 animate-pulse" />
        </div>

        <div className="mb-10 animate-slide-in-right delay-200">
          <p className="text-sm text-pink-200 mb-3">Available Balance</p>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-5xl font-bold animate-scale-in delay-300">RM 12,847.50</h1>
          </div>
          <div className="flex items-center gap-2 animate-fade-in-up delay-500">
            <TrendingUp className="w-5 h-5 text-green-300 animate-bounce" />
            <p className="text-sm text-pink-200">+RM 425.50 (+3.5%) this month</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-pink-200">Account Details</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHideDetails(!hideDetails)}
              className="text-xs text-pink-200 hover:bg-white/20 px-3 py-1 rounded-full"
            >
              {hideDetails ? "Show" : "Hide"}
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-pink-200">Account No:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono">{hideDetails ? "••••-••••-••••" : "1234-5678-9012"}</code>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-pink-200">Transfer Code:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono">{hideDetails ? "••••••••••••" : "MYWALLET2024"}</code>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-4 animate-fade-in-up delay-700">
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-5 flex flex-col items-center gap-2 h-auto hover-lift transition-all duration-300 hover:scale-105"
            onClick={() => setShowSendReceive("send")}
          >
            <Send className="w-6 h-6" />
            <span className="text-xs font-medium">Send</span>
          </Button>
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-5 flex flex-col items-center gap-2 h-auto hover-lift transition-all duration-300 hover:scale-105"
            onClick={() => setShowSendReceive("receive")}
          >
            <QrCode className="w-6 h-6" />
            <span className="text-xs font-medium">Receive</span>
          </Button>
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-5 flex flex-col items-center gap-2 h-auto hover-lift transition-all duration-300 hover:scale-105"
            onClick={() => setShowSendReceive("pay")}
          >
            <Camera className="w-6 h-6" />
            <span className="text-xs font-medium">Pay</span>
          </Button>
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-5 flex flex-col items-center gap-2 h-auto hover-lift transition-all duration-300 hover:scale-105"
            onClick={() => setShowSendReceive("topup")}
          >
            <Plus className="w-6 h-6" />
            <span className="text-xs font-medium">Top Up</span>
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="border-0 shadow-sm bg-gradient-to-r from-pink-100 to-rose-100">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Send className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Send Money</h3>
              <p className="text-sm text-gray-600">Transfer to friends & family</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-r from-pink-100 to-rose-100">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">QR Receive</h3>
              <p className="text-sm text-gray-600">Generate QR for payments</p>
            </CardContent>
          </Card>
        </div>

        {/* Balance Chart */}
        <Card className="border-0 shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 text-lg">Balance Overview</h3>
              <div className="flex gap-2">
                {timeframes.map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? "default" : "ghost"}
                    size="sm"
                    className={`rounded-full text-xs px-3 py-2 ${
                      selectedTimeframe === timeframe
                        ? "bg-pink-500 hover:bg-pink-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedTimeframe(timeframe)}
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>

            {/* Simple Chart Visualization */}
            <div className="h-40 flex items-end justify-between gap-2">
              {[65, 45, 78, 52, 89, 67, 95, 73, 88, 92, 85, 100].map((height, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-t from-pink-500 to-pink-300 rounded-t-sm flex-1"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Recent Transactions</h2>
          <Button variant="ghost" size="sm" className="text-pink-600">
            <History className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.isPositive ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {transaction.isPositive ? (
                        <Plus className="w-6 h-6 text-green-600" />
                      ) : (
                        <Minus className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{transaction.description}</h3>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-semibold text-lg ${transaction.isPositive ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.amount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
