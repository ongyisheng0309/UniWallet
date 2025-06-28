"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, ArrowRight, QrCode, CheckCircle, AlertCircle } from "lucide-react"
import QRScannerPay from "./qr-scanner-pay"

interface CryptoPayPageProps {
  onBack: () => void
  onSuccess: () => void
}

export default function CryptoPayPage({ onBack, onSuccess }: CryptoPayPageProps) {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC")
  const [cryptoAmount, setCryptoAmount] = useState("")
  const [fiatAmount, setFiatAmount] = useState("")
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [step, setStep] = useState(1) // 1: Select Crypto, 2: Convert, 3: Pay

  const cryptoHoldings = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      holdings: "0.0234 BTC",
      value: "RM 10,623.45",
      price: 453988,
      icon: "₿",
      color: "bg-orange-500",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      holdings: "1.2567 ETH",
      value: "RM 12,975.23",
      price: 10323,
      icon: "Ξ",
      color: "bg-blue-600",
    },
    {
      symbol: "ADA",
      name: "Cardano",
      holdings: "850.00 ADA",
      value: "RM 1,232.50",
      price: 1.45,
      icon: "₳",
      color: "bg-blue-500",
    },
  ]

  const selectedCryptoData = cryptoHoldings.find((crypto) => crypto.symbol === selectedCrypto)

  const handleCryptoAmountChange = (value: string) => {
    setCryptoAmount(value)
    if (selectedCryptoData && value) {
      const fiatValue = (Number.parseFloat(value) * selectedCryptoData.price).toFixed(2)
      setFiatAmount(fiatValue)
    } else {
      setFiatAmount("")
    }
  }

  const handleFiatAmountChange = (value: string) => {
    setFiatAmount(value)
    if (selectedCryptoData && value) {
      const cryptoValue = (Number.parseFloat(value) / selectedCryptoData.price).toFixed(6)
      setCryptoAmount(cryptoValue)
    } else {
      setCryptoAmount("")
    }
  }

  if (showQRScanner) {
    return (
      <QRScannerPay
        onBack={() => setShowQRScanner(false)}
        onSuccess={onSuccess}
        cryptoAmount={cryptoAmount}
        cryptoSymbol={selectedCrypto}
        fiatAmount={fiatAmount}
      />
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-8 mx-6 mt-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-2 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Crypto Pay</h1>
              <p className="text-sm text-blue-200">Convert crypto to fiat and pay instantly</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mt-6">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-white" : "text-blue-300"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-white text-blue-900" : "bg-blue-700"}`}
            >
              1
            </div>
            <span className="text-sm font-medium">Select Crypto</span>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-300" />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-white" : "text-blue-300"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-white text-blue-900" : "bg-blue-700"}`}
            >
              2
            </div>
            <span className="text-sm font-medium">Convert</span>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-300" />
          <div className={`flex items-center gap-2 ${step >= 3 ? "text-white" : "text-blue-300"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-white text-blue-900" : "bg-blue-700"}`}
            >
              3
            </div>
            <span className="text-sm font-medium">Pay</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {step === 1 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">Select Cryptocurrency to Pay With</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {cryptoHoldings.map((crypto) => (
                  <Button
                    key={crypto.symbol}
                    variant={selectedCrypto === crypto.symbol ? "default" : "outline"}
                    className={`w-full p-6 h-auto justify-start ${
                      selectedCrypto === crypto.symbol ? "bg-blue-600 text-white" : "bg-white"
                    }`}
                    onClick={() => setSelectedCrypto(crypto.symbol)}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div
                        className={`w-12 h-12 rounded-full ${crypto.color} flex items-center justify-center text-white font-bold text-lg`}
                      >
                        {crypto.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-lg">{crypto.name}</h3>
                        <p className="text-sm opacity-70">{crypto.holdings}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{crypto.value}</p>
                        <p className="text-sm opacity-70">RM {crypto.price.toLocaleString()}/coin</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
                onClick={() => setStep(2)}
                disabled={!selectedCrypto}
              >
                Continue to Convert
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && selectedCryptoData && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">Convert {selectedCryptoData.name} to Fiat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Crypto Display */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${selectedCryptoData.color} flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {selectedCryptoData.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-blue-900">{selectedCryptoData.name}</h3>
                      <p className="text-sm text-blue-600">Available: {selectedCryptoData.holdings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conversion Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="crypto-amount" className="text-sm font-medium text-gray-700">
                    Amount in {selectedCryptoData.symbol}
                  </Label>
                  <Input
                    id="crypto-amount"
                    type="number"
                    placeholder="0.00"
                    value={cryptoAmount}
                    onChange={(e) => handleCryptoAmountChange(e.target.value)}
                    className="mt-2 text-lg"
                  />
                </div>

                <div className="flex justify-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="fiat-amount" className="text-sm font-medium text-gray-700">
                    Amount in RM (Malaysian Ringgit)
                  </Label>
                  <Input
                    id="fiat-amount"
                    type="number"
                    placeholder="0.00"
                    value={fiatAmount}
                    onChange={(e) => handleFiatAmountChange(e.target.value)}
                    className="mt-2 text-lg"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Quick Amounts</Label>
                <div className="grid grid-cols-4 gap-3">
                  <Button variant="outline" onClick={() => handleFiatAmountChange("50")}>
                    RM 50
                  </Button>
                  <Button variant="outline" onClick={() => handleFiatAmountChange("100")}>
                    RM 100
                  </Button>
                  <Button variant="outline" onClick={() => handleFiatAmountChange("200")}>
                    RM 200
                  </Button>
                  <Button variant="outline" onClick={() => handleFiatAmountChange("500")}>
                    RM 500
                  </Button>
                </div>
              </div>

              {/* Conversion Summary */}
              {fiatAmount && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-green-800 mb-3">Conversion Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>You're converting:</span>
                        <span>
                          {cryptoAmount} {selectedCryptoData.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>You'll receive:</span>
                        <span>RM {fiatAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Exchange rate:</span>
                        <span>
                          1 {selectedCryptoData.symbol} = RM {selectedCryptoData.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion fee:</span>
                        <span>RM 0.00</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total to pay:</span>
                        <span>RM {fiatAmount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setStep(3)}
                  disabled={!fiatAmount || Number.parseFloat(fiatAmount) <= 0}
                >
                  Continue to Pay
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">Choose Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Summary */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800">Ready to Pay</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Converting:</span>
                      <span>
                        {cryptoAmount} {selectedCrypto}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Payment Amount:</span>
                      <span>RM {fiatAmount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <div className="space-y-4">
                <Button
                  className="w-full p-6 h-auto justify-start bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                  onClick={() => setShowQRScanner(true)}
                >
                  <QrCode className="w-8 h-8 mr-4" />
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">DuitNow QR Pay</h3>
                    <p className="text-sm opacity-90">Scan merchant QR code to pay instantly</p>
                  </div>
                </Button>
              </div>

              {/* Security Notice */}
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 text-sm">Important Notice</h4>
                      <p className="text-xs text-amber-700 mt-1">
                        Your cryptocurrency will be converted to fiat currency at the current market rate. This
                        transaction cannot be reversed once completed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Close the Card component */}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
