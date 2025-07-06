"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, QrCode, Plus, User, Building, CreditCard, Smartphone, Camera } from "lucide-react"
import PaymentSuccessModal from "./payment-success-modal"

interface FiatTransactionsProps {
  type: "send" | "receive" | "topup" | "pay"
  onBack: () => void
}

export default function FiatTransactions({ type, onBack }: FiatTransactionsProps) {
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [note, setNote] = useState("")
  const [topupMethod, setTopupMethod] = useState("card")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successData, setSuccessData] = useState<any>(null)

  const getTitle = () => {
    switch (type) {
      case "send":
        return "Send Money"
      case "receive":
        return "Receive Money"
      case "topup":
        return "Top Up Wallet"
      case "pay":
        return "QR Pay"
      default:
        return "Transaction"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "send":
        return <Send className="w-5 h-5" />
      case "receive":
        return <QrCode className="w-5 h-5" />
      case "topup":
        return <Plus className="w-5 h-5" />
      case "pay":
        return <Camera className="w-5 h-5" />
      default:
        return null
    }
  }

  const getColor = () => {
    switch (type) {
      case "send":
        return "text-red-600"
      case "receive":
        return "text-green-600"
      case "topup":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white p-6 mx-4 mt-4 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-2 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            {getIcon()}
            <div>
              <h1 className="text-xl font-bold">{getTitle()}</h1>
              <p className="text-sm text-pink-200">Fast and secure transactions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {type === "send" && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className={`text-lg ${getColor()}`}>Send Money</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recipient */}
              <div>
                <Label htmlFor="recipient" className="text-sm font-medium text-gray-700">
                  Send to
                </Label>
                <Input
                  id="recipient"
                  placeholder="Phone number, email, or account number"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Quick Contacts */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Quick Send</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2 bg-transparent">
                    <User className="w-6 h-6" />
                    <span className="text-xs">John Doe</span>
                  </Button>
                  <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2 bg-transparent">
                    <User className="w-6 h-6" />
                    <span className="text-xs">Sarah Lee</span>
                  </Button>
                  <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2 bg-transparent">
                    <User className="w-6 h-6" />
                    <span className="text-xs">Mike Chen</span>
                  </Button>
                </div>
              </div>

              {/* Amount */}
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
                <p className="text-sm text-gray-500 mt-1">Available balance: RM 12,847.50</p>
              </div>

              {/* Note */}
              <div>
                <Label htmlFor="note" className="text-sm font-medium text-gray-700">
                  Note (Optional)
                </Label>
                <Textarea
                  id="note"
                  placeholder="What's this for?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>

              {/* Transaction Summary */}
              {amount && (
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-red-800 mb-2">Transaction Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span>RM {amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transfer Fee:</span>
                        <span>RM 0.00</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total:</span>
                        <span>RM {amount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold"
                onClick={() => {
                  const refId = `TXN${Date.now().toString().slice(-8)}`

                  setSuccessData({
                    amount,
                    recipient: recipient || "Selected Contact",
                    note,
                    refId,
                  })
                  setShowSuccessModal(true)
                }}
              >
                Send Money
              </Button>
            </CardContent>
          </Card>
        )}

        {type === "receive" && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className={`text-lg ${getColor()}`}>Receive Money</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code */}
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <div className="w-40 h-40 bg-black rounded-lg flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-white" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">Scan this QR code to send money to your wallet</p>
              </div>

              {/* Account Details */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-green-800 mb-3">Share Your Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Account Number:</span>
                      <span className="font-mono">1234-5678-9012</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transfer Code:</span>
                      <span className="font-mono">MYWALLET2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Account Name:</span>
                      <span>Your Name</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Request Amount */}
              <div>
                <Label htmlFor="request-amount" className="text-sm font-medium text-gray-700">
                  Request Specific Amount (Optional)
                </Label>
                <Input id="request-amount" type="number" placeholder="0.00" className="mt-2 text-lg" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="py-3 bg-transparent">
                  Share QR Code
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white py-3">Share Details</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {type === "topup" && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className={`text-lg ${getColor()}`}>Top Up Wallet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Top-up Methods */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Top-up Method</Label>
                <div className="space-y-3">
                  <Button
                    variant={topupMethod === "card" ? "default" : "outline"}
                    className="w-full justify-start p-4 h-auto"
                    onClick={() => setTopupMethod("card")}
                  >
                    <CreditCard className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold">Credit/Debit Card</p>
                      <p className="text-sm opacity-70">**** **** **** 1234</p>
                    </div>
                  </Button>
                  <Button
                    variant={topupMethod === "bank" ? "default" : "outline"}
                    className="w-full justify-start p-4 h-auto"
                    onClick={() => setTopupMethod("bank")}
                  >
                    <Building className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold">Bank Transfer</p>
                      <p className="text-sm opacity-70">Online Banking</p>
                    </div>
                  </Button>
                  <Button
                    variant={topupMethod === "ewallet" ? "default" : "outline"}
                    className="w-full justify-start p-4 h-auto"
                    onClick={() => setTopupMethod("ewallet")}
                  >
                    <Smartphone className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold">E-Wallet</p>
                      <p className="text-sm opacity-70">Touch 'n Go, GrabPay</p>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <Label htmlFor="topup-amount" className="text-sm font-medium text-gray-700">
                  Top-up Amount (RM)
                </Label>
                <Input
                  id="topup-amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-2 text-lg"
                />
              </div>

              {/* Quick Amounts */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Quick Amounts</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" onClick={() => setAmount("100")}>
                    RM 100
                  </Button>
                  <Button variant="outline" onClick={() => setAmount("500")}>
                    RM 500
                  </Button>
                  <Button variant="outline" onClick={() => setAmount("1000")}>
                    RM 1,000
                  </Button>
                </div>
              </div>

              {/* Transaction Summary */}
              {amount && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Transaction Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Top-up Amount:</span>
                        <span>RM {amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing Fee:</span>
                        <span>RM 0.00</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total:</span>
                        <span>RM {amount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                onClick={() => {
                  const refId = `TOP${Date.now().toString().slice(-8)}`

                  setSuccessData({
                    amount,
                    recipient: "Your Wallet",
                    note: "Wallet Top-up",
                    refId,
                  })
                  setShowSuccessModal(true)
                }}
              >
                Top Up Now
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      {/* Success Modal */}
      {showSuccessModal && successData && (
        <PaymentSuccessModal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false)
            onBack()
          }}
          title={
            type === "send"
              ? "Money Sent Successfully!"
              : type === "topup"
                ? "Top Up Successful!"
                : "Transaction Successful!"
          }
          subtitle={`Your ${type === "send" ? "transfer" : type === "topup" ? "top up" : "transaction"} has been completed successfully`}
          amount={`RM ${successData.amount}`}
          recipient={successData.recipient}
          transactionId={successData.refId}
          transactionType={type === "send" ? "Money Transfer" : type === "topup" ? "Wallet Top Up" : "Transaction"}
          additionalDetails={successData.note ? [{ label: "Note", value: `"${successData.note}"` }] : []}
        />
      )}
    </div>
  )
}
