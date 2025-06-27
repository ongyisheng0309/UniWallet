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

interface FiatTransactionsProps {
  type: "send" | "receive" | "topup" | "pay" | null
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-100">
      {/* Header - Fiat Wallet */}
      <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white p-6 mx-4 mt-4 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Banknote className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Fiat Wallet</span>
            </div>
          </div>
          <Wifi className="w-4 h-4" />
        </div>

        <div className="mb-8">
          <p className="text-sm text-pink-200 mb-2">Available Balance</p>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-4xl font-bold">RM 12,847.50</h1>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-300" />
            <p className="text-sm text-pink-200">+RM 425.50 (+3.5%) this month</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-3 mb-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-pink-200">Account Details</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHideDetails(!hideDetails)}
              className="text-xs text-pink-200 hover:bg-white/20 px-2 py-1 rounded-full"
            >
              {hideDetails ? "Show" : "Hide"}
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-pink-200">Account No:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono">{hideDetails ? "••••-••••-••••" : "1234-5678-9012"}</code>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-pink-200">Transfer Code:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono">{hideDetails ? "••••••••••••" : "MYWALLET2024"}</code>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-4 flex flex-col items-center gap-2 h-auto"
            onClick={() => setShowSendReceive("send")}
          >
            <Send className="w-5 h-5" />
            <span className="text-xs font-medium">Send</span>
          </Button>
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-4 flex flex-col items-center gap-2 h-auto"
            onClick={() => setShowSendReceive("receive")}
          >
            <QrCode className="w-5 h-5" />
            <span className="text-xs font-medium">Receive</span>
          </Button>
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-4 flex flex-col items-center gap-2 h-auto"
            onClick={() => setShowSendReceive("pay")}
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs font-medium">Pay</span>
          </Button>
          <Button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl py-4 flex flex-col items-center gap-2 h-auto"
            onClick={() => setShowSendReceive("topup")}
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs font-medium">Top Up</span>
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="border-0 shadow-sm bg-gradient-to-r from-pink-100 to-rose-100">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Send Money</h3>
              <p className="text-xs text-gray-600">Transfer to friends & family</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-r from-pink-100 to-rose-100">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">QR Receive</h3>
              <p className="text-xs text-gray-600">Generate QR for payments</p>
            </CardContent>
          </Card>
        </div>

        {/* Balance Chart */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Balance Overview</h3>
              <div className="flex gap-2">
                {timeframes.map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? "default" : "ghost"}
                    size="sm"
                    className={`rounded-full text-xs ${
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
            <div className="h-32 flex items-end justify-between gap-1">
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
          <Button variant="ghost" size="sm" className="text-pink-600">
            <History className="w-4 h-4 mr-1" />
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.isPositive ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {transaction.isPositive ? (
                        <Plus className="w-5 h-5 text-green-600" />
                      ) : (
                        <Minus className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`font-semibold ${transaction.isPositive ? "text-green-600" : "text-red-600"}`}>
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
