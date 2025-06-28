"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Camera, QrCode, Flashlight, RotateCcw, CheckCircle, AlertCircle } from "lucide-react"
import PaymentSuccessModal from "./payment-success-modal"

interface QRScannerPayProps {
  onBack: () => void
  onSuccess?: () => void
  cryptoAmount?: string
  cryptoSymbol?: string
  fiatAmount?: string
}

export default function QRScannerPay({
  onBack,
  onSuccess,
  cryptoAmount,
  cryptoSymbol,
  fiatAmount: initialFiatAmount,
}: QRScannerPayProps) {
  const [isScanning, setIsScanning] = useState(true)
  const [scannedData, setScannedData] = useState<any>(null)
  const [amount, setAmount] = useState(initialFiatAmount || "")
  const [note, setNote] = useState("")
  const [flashOn, setFlashOn] = useState(false)
  const [scanningAnimation, setScanningAnimation] = useState(0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [transactionId, setTransactionId] = useState("")

  // Mock QR data for different merchants
  const mockQRData = [
    {
      merchantName: "Starbucks Coffee",
      merchantId: "STARBUCKS_MY",
      duitnowId: "60123456789",
      logo: "☕",
      category: "Food & Beverage",
      location: "KLCC, Kuala Lumpur",
    },
    {
      merchantName: "7-Eleven",
      merchantId: "SEVEN_ELEVEN",
      duitnowId: "60198765432",
      logo: "🏪",
      category: "Convenience Store",
      location: "Bukit Bintang, KL",
    },
    {
      merchantName: "McDonald's",
      merchantId: "MCDONALDS_MY",
      duitnowId: "60111222333",
      logo: "🍟",
      category: "Fast Food",
      location: "Mid Valley Megamall",
    },
  ]

  // Simulate scanning animation
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanningAnimation((prev) => (prev + 1) % 100)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isScanning])

  // Simulate QR code detection after 3 seconds
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        const randomMerchant = mockQRData[Math.floor(Math.random() * mockQRData.length)]
        setScannedData(randomMerchant)
        setIsScanning(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isScanning])

  const handleRescan = () => {
    setIsScanning(true)
    setScannedData(null)
    if (!initialFiatAmount) {
      setAmount("")
    }
    setNote("")
  }

  const handlePayment = () => {
    // Generate mock transaction ID
    const txId = `TXN${Date.now().toString().slice(-8)}`
    setTransactionId(txId)
    setShowSuccessModal(true)
  }

  const handleSuccessClose = () => {
    setShowSuccessModal(false)
    if (onSuccess) {
      onSuccess()
    } else {
      onBack()
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white p-8 mx-6 mt-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-2 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <QrCode className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">DuitNow QR Pay</h1>
              <p className="text-sm text-pink-200">
                {cryptoSymbol ? `Pay with ${cryptoSymbol} via DuitNow` : "Scan to pay instantly"}
              </p>
            </div>
          </div>
        </div>

        {/* Crypto Conversion Info */}
        {cryptoAmount && cryptoSymbol && (
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-pink-200">Converting:</span>
                <span className="font-semibold">
                  {cryptoAmount} {cryptoSymbol} → RM {initialFiatAmount}
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="p-6">
        {isScanning ? (
          /* QR Scanner Interface */
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              {/* Camera Viewfinder */}
              <div className="relative bg-black rounded-2xl overflow-hidden mb-6" style={{ aspectRatio: "4/3" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
                  {/* Scanning Grid Overlay */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-gray-600 border-opacity-20" />
                      ))}
                    </div>
                  </div>

                  {/* Scanning Frame */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-64 border-2 border-pink-500 rounded-2xl">
                      {/* Corner indicators */}
                      <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-pink-400 rounded-tl-lg" />
                      <div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-pink-400 rounded-tr-lg" />
                      <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-pink-400 rounded-bl-lg" />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-pink-400 rounded-br-lg" />

                      {/* Scanning line animation */}
                      <div
                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
                        style={{
                          top: `${scanningAnimation}%`,
                          transition: "top 0.05s linear",
                        }}
                      />
                    </div>
                  </div>

                  {/* Center QR icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-white opacity-20" />
                  </div>
                </div>
              </div>

              {/* Scanning Status */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                  <p className="text-lg font-semibold text-gray-900">Scanning for QR Code...</p>
                </div>
                <p className="text-sm text-gray-600">Position the QR code within the frame</p>
              </div>

              {/* Camera Controls */}
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full p-4 bg-transparent"
                  onClick={() => setFlashOn(!flashOn)}
                >
                  <Flashlight className={`w-6 h-6 ${flashOn ? "text-yellow-500" : "text-gray-600"}`} />
                </Button>
                <Button variant="outline" size="lg" className="rounded-full p-4 bg-transparent" onClick={handleRescan}>
                  <RotateCcw className="w-6 h-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Payment Details */
          <div className="space-y-6">
            {/* Merchant Info Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-bold text-green-800">QR Code Detected!</h3>
                    <p className="text-sm text-green-600">DuitNow QR Payment</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                    {scannedData?.logo}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">{scannedData?.merchantName}</h2>
                    <p className="text-sm text-gray-600">{scannedData?.category}</p>
                    <p className="text-xs text-gray-500">{scannedData?.location}</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Merchant ID:</span>
                    <span className="font-mono text-gray-900">{scannedData?.merchantId}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">DuitNow ID:</span>
                    <span className="font-mono text-gray-900">{scannedData?.duitnowId}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-pink-600">Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Amount Input */}
                <div>
                  <Label htmlFor="payment-amount" className="text-sm font-medium text-gray-700">
                    Amount (RM) *
                  </Label>
                  <Input
                    id="payment-amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-2 text-lg"
                    required
                    disabled={!!initialFiatAmount}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {cryptoSymbol
                      ? `Converting from ${cryptoAmount} ${cryptoSymbol}`
                      : "Available balance: RM 12,847.50"}
                  </p>
                </div>

                {/* Quick Amount Buttons - Only show if not from crypto pay */}
                {!initialFiatAmount && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Quick Amounts</Label>
                    <div className="grid grid-cols-4 gap-2">
                      <Button variant="outline" size="sm" onClick={() => setAmount("10")}>
                        RM 10
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setAmount("20")}>
                        RM 20
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setAmount("50")}>
                        RM 50
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setAmount("100")}>
                        RM 100
                      </Button>
                    </div>
                  </div>
                )}

                {/* Note */}
                <div>
                  <Label htmlFor="payment-note" className="text-sm font-medium text-gray-700">
                    Note (Optional)
                  </Label>
                  <Input
                    id="payment-note"
                    placeholder="Payment reference or note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* Payment Summary */}
                {amount && (
                  <Card className="bg-pink-50 border-pink-200">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-pink-800 mb-2">Payment Summary</h3>
                      <div className="space-y-2 text-sm">
                        {cryptoSymbol && (
                          <div className="flex justify-between">
                            <span>Converting:</span>
                            <span>
                              {cryptoAmount} {cryptoSymbol}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span>RM {amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>DuitNow Fee:</span>
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

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={handleRescan}>
                    <Camera className="w-4 h-4 mr-2" />
                    Scan Again
                  </Button>
                  <Button
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
                    onClick={handlePayment}
                    disabled={!amount || Number.parseFloat(amount) <= 0}
                  >
                    Pay Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border-0 shadow-sm bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 text-sm">Secure Payment</h4>
                    <p className="text-xs text-blue-600 mt-1">
                      This payment is secured by DuitNow. Always verify merchant details before proceeding.
                      {cryptoSymbol && " Your crypto will be converted at current market rates."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        amount={`RM ${amount}`}
        merchant={scannedData?.merchantName || ""}
        transactionId={transactionId}
      />
    </div>
  )
}
