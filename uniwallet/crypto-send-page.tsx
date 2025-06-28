"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, Scan, User, AlertCircle, CheckCircle, Wallet, Clock, Shield } from "lucide-react"

interface CryptoSendPageProps {
  onBack: () => void
  cryptoData: any[]
}

export default function CryptoSendPage({ onBack, cryptoData }: CryptoSendPageProps) {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoData[0]?.symbol || "BTC")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [step, setStep] = useState(1) // 1: Form, 2: Confirmation, 3: Success
  const [isValidAddress, setIsValidAddress] = useState(false)

  const selectedCryptoData = cryptoData.find((crypto) => crypto.symbol === selectedCrypto)

  // Mock recent contacts
  const recentContacts = [
    {
      name: "John Doe",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      avatar: "JD",
      lastUsed: "2 days ago",
    },
    {
      name: "Sarah Wilson",
      address: "0x742d35Cc6634C0532925a3b8D4C2C4e4C8C8C8C8",
      avatar: "SW",
      lastUsed: "1 week ago",
    },
    {
      name: "Mike Chen",
      address: "addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      avatar: "MC",
      lastUsed: "2 weeks ago",
    },
  ]

  // Mock network fees
  const networkFees = {
    BTC: { slow: "0.0001 BTC", standard: "0.0003 BTC", fast: "0.0005 BTC" },
    ETH: { slow: "0.002 ETH", standard: "0.005 ETH", fast: "0.008 ETH" },
    ADA: { slow: "0.17 ADA", standard: "0.17 ADA", fast: "0.17 ADA" },
  }

  const [selectedFee, setSelectedFee] = useState("standard")

  const validateAddress = (address: string) => {
    // Simple validation - in real app, use proper crypto address validation
    const isValid = address.length > 20 && address.length < 100
    setIsValidAddress(isValid)
    return isValid
  }

  const handleAddressChange = (address: string) => {
    setRecipientAddress(address)
    validateAddress(address)
  }

  const calculateTotal = () => {
    if (!amount || !selectedCryptoData) return "0.00"
    const amountNum = Number.parseFloat(amount)
    const feeAmount = selectedCrypto === "BTC" ? 0.0003 : selectedCrypto === "ETH" ? 0.005 : 0.17
    return (amountNum + feeAmount).toFixed(6)
  }

  const handleSend = () => {
    setStep(2)
  }

  const confirmSend = () => {
    setStep(3)
    // Here you would typically call the blockchain API
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 gradient-text">Transaction Sent!</h2>
            <p className="text-gray-600 mb-6">Your {selectedCrypto} has been sent successfully</p>

            <Card className="bg-gray-50 border-gray-200 mb-6">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-semibold">
                      {amount} {selectedCrypto}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>To:</span>
                    <span className="font-mono text-xs">
                      {recipientAddress.slice(0, 10)}...{recipientAddress.slice(-10)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-mono text-xs">0x{Math.random().toString(16).slice(2, 10)}...</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3" onClick={onBack}>
              Back to Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div>
        {/* Confirmation Header */}
        <div className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 text-white p-8 mx-6 mt-6 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep(1)}
              className="text-white hover:bg-white/20 p-2 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" />
              <div>
                <h1 className="text-2xl font-bold">Confirm Transaction</h1>
                <p className="text-sm text-orange-200">Review details before sending</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-red-600">Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Transaction Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Sending</span>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {amount} {selectedCrypto}
                    </p>
                    <p className="text-sm text-gray-500">≈ RM {(Number.parseFloat(amount || "0") * 1000).toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Network Fee</span>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {networkFees[selectedCrypto as keyof typeof networkFees]?.[
                        selectedFee as keyof typeof networkFees.BTC
                      ] || "0.001"}
                    </p>
                    <p className="text-sm text-gray-500">Standard</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                  <span className="text-red-800 font-semibold">Total</span>
                  <div className="text-right">
                    <p className="font-bold text-red-800">
                      {calculateTotal()} {selectedCrypto}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recipient Info */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Recipient</h4>
                  <p className="font-mono text-sm text-blue-700 break-all">{recipientAddress}</p>
                  {note && (
                    <div className="mt-2">
                      <p className="text-sm text-blue-600">Note: "{note}"</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Warning */}
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 text-sm">Important</h4>
                      <p className="text-xs text-amber-700 mt-1">
                        This transaction cannot be reversed. Please verify all details are correct before proceeding.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={confirmSend}>
                  Confirm & Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-8 mx-6 mt-6 rounded-3xl shadow-2xl animate-fade-in-up">
        <div className="flex items-center gap-4 mb-6 animate-slide-in-left">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-2 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Send className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Send Crypto</h1>
              <p className="text-sm text-blue-200">Transfer cryptocurrency to another wallet</p>
            </div>
          </div>
        </div>

        {/* Selected Crypto Display */}
        {selectedCryptoData && (
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm animate-scale-in delay-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full ${selectedCryptoData.iconColor} flex items-center justify-center text-white font-bold text-lg`}
                >
                  {selectedCryptoData.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg">{selectedCryptoData.name}</h3>
                  <p className="text-blue-200 text-sm">{selectedCryptoData.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{selectedCryptoData.value}</p>
                  <p className="text-blue-200 text-sm">{selectedCryptoData.holdings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Crypto Selection */}
        <Card className="border-0 shadow-lg animate-fade-in-up delay-300">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Select Cryptocurrency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cryptoData
                .filter((crypto) => Number.parseFloat(crypto.holdings.split(" ")[0]) > 0)
                .map((crypto) => (
                  <Button
                    key={crypto.symbol}
                    variant={selectedCrypto === crypto.symbol ? "default" : "outline"}
                    className={`p-4 h-auto justify-start ${
                      selectedCrypto === crypto.symbol
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-white hover:bg-blue-50"
                    }`}
                    onClick={() => setSelectedCrypto(crypto.symbol)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div
                        className={`w-8 h-8 rounded-full ${crypto.iconColor} flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {crypto.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm">{crypto.symbol}</p>
                        <p className="text-xs opacity-70">{crypto.holdings}</p>
                      </div>
                    </div>
                  </Button>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card className="border-0 shadow-lg animate-fade-in-up delay-400">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
              <User className="w-5 h-5" />
              Recent Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentContacts.map((contact, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full p-4 h-auto justify-start bg-white hover:bg-blue-50"
                  onClick={() => handleAddressChange(contact.address)}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {contact.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-500 font-mono">{contact.address.slice(0, 20)}...</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{contact.lastUsed}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Send Form */}
        <Card className="border-0 shadow-lg animate-fade-in-up delay-500">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recipient Address */}
            <div>
              <Label htmlFor="recipient" className="text-sm font-medium text-gray-700">
                Recipient Address *
              </Label>
              <div className="relative mt-2">
                <Input
                  id="recipient"
                  placeholder="Enter wallet address"
                  value={recipientAddress}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  className={`pr-20 ${recipientAddress && (isValidAddress ? "border-green-500" : "border-red-500")}`}
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent"
                >
                  <Scan className="w-4 h-4" />
                </Button>
              </div>
              {recipientAddress && (
                <p className={`text-sm mt-1 ${isValidAddress ? "text-green-600" : "text-red-600"}`}>
                  {isValidAddress ? "✓ Valid address format" : "✗ Invalid address format"}
                </p>
              )}
            </div>

            {/* Amount */}
            <div>
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                Amount ({selectedCrypto}) *
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-2"
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-500">Available: {selectedCryptoData?.holdings || "0.00"}</p>
                <Button
                  variant="link"
                  size="sm"
                  className="text-blue-600 p-0 h-auto"
                  onClick={() => {
                    const available = Number.parseFloat(selectedCryptoData?.holdings.split(" ")[0] || "0")
                    setAmount((available * 0.95).toFixed(6)) // Leave some for fees
                  }}
                >
                  Max
                </Button>
              </div>
            </div>

            {/* Network Fee Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Network Fee</Label>
              <div className="grid grid-cols-3 gap-3">
                {["slow", "standard", "fast"].map((feeType) => (
                  <Button
                    key={feeType}
                    variant={selectedFee === feeType ? "default" : "outline"}
                    className={`p-3 h-auto flex flex-col ${
                      selectedFee === feeType ? "bg-blue-600 text-white" : "bg-white"
                    }`}
                    onClick={() => setSelectedFee(feeType)}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs font-medium capitalize">{feeType}</span>
                    </div>
                    <span className="text-xs">
                      {networkFees[selectedCrypto as keyof typeof networkFees]?.[
                        feeType as keyof typeof networkFees.BTC
                      ] || "0.001"}
                    </span>
                    <span className="text-xs opacity-70">
                      {feeType === "slow" ? "~30 min" : feeType === "standard" ? "~10 min" : "~2 min"}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <Label htmlFor="note" className="text-sm font-medium text-gray-700">
                Note (Optional)
              </Label>
              <Textarea
                id="note"
                placeholder="Add a note for this transaction..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>

            {/* Transaction Summary */}
            {amount && recipientAddress && isValidAddress && (
              <Card className="bg-blue-50 border-blue-200 animate-scale-in">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Transaction Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-semibold">
                        {amount} {selectedCrypto}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network Fee:</span>
                      <span>
                        {networkFees[selectedCrypto as keyof typeof networkFees]?.[
                          selectedFee as keyof typeof networkFees.BTC
                        ] || "0.001"}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Total:</span>
                      <span>
                        {calculateTotal()} {selectedCrypto}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Send Button */}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              onClick={handleSend}
              disabled={!amount || !recipientAddress || !isValidAddress}
            >
              <Send className="w-5 h-5 mr-2" />
              Review Transaction
            </Button>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-0 shadow-sm bg-amber-50 border-amber-200 animate-fade-in-up delay-600">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 text-sm">Security Reminder</h4>
                <ul className="text-xs text-amber-700 mt-1 space-y-1">
                  <li>• Double-check the recipient address before sending</li>
                  <li>• Cryptocurrency transactions cannot be reversed</li>
                  <li>• Ensure you're sending to the correct network</li>
                  <li>• Keep your transaction ID for records</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
