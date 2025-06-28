"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, QrCode, Copy, Share, Download, CheckCircle, Wallet } from "lucide-react"

interface CryptoReceivePageProps {
  onBack: () => void
  cryptoData: any[]
}

export default function CryptoReceivePage({ onBack, cryptoData }: CryptoReceivePageProps) {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoData[0]?.symbol || "BTC")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [copied, setCopied] = useState(false)

  const selectedCryptoData = cryptoData.find((crypto) => crypto.symbol === selectedCrypto)

  // Mock wallet addresses for different cryptocurrencies
  const walletAddresses = {
    BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    ETH: "0x742d35Cc6634C0532925a3b8D4C2C4e4C8C8C8C8",
    ADA: "addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    SOL: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    LINK: "0x742d35Cc6634C0532925a3b8D4C2C4e4C8C8C8C8",
    MATIC: "0x742d35Cc6634C0532925a3b8D4C2C4e4C8C8C8C8",
    UNI: "0x742d35Cc6634C0532925a3b8D4C2C4e4C8C8C8C8",
    AVAX: "X-avax1xy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    DOGE: "DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L",
    DOT: "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5",
    SHIB: "0x742d35Cc6634C0532925a3b8D4C2C4e4C8C8C8C8",
  }

  const currentAddress = walletAddresses[selectedCrypto as keyof typeof walletAddresses] || walletAddresses.BTC

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Receive ${selectedCrypto}`,
        text: `Send ${selectedCrypto} to this address: ${currentAddress}`,
      })
    }
  }

  const generateQRData = () => {
    let qrData = currentAddress
    if (amount) {
      qrData += `?amount=${amount}`
    }
    if (note) {
      qrData += `${amount ? "&" : "?"}message=${encodeURIComponent(note)}`
    }
    return qrData
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white p-8 mx-6 mt-6 rounded-3xl shadow-2xl animate-fade-in-up">
        <div className="flex items-center gap-4 mb-6 animate-slide-in-left">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-2 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <QrCode className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Receive Crypto</h1>
              <p className="text-sm text-green-200">Generate address to receive cryptocurrency</p>
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
                  <p className="text-green-200 text-sm">{selectedCryptoData.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{selectedCryptoData.value}</p>
                  <p className="text-green-200 text-sm">{selectedCryptoData.holdings}</p>
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
            <CardTitle className="text-xl text-green-600 flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Select Cryptocurrency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cryptoData.map((crypto) => (
                <Button
                  key={crypto.symbol}
                  variant={selectedCrypto === crypto.symbol ? "default" : "outline"}
                  className={`p-4 h-auto justify-start ${
                    selectedCrypto === crypto.symbol
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-white hover:bg-green-50"
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
                      <p className="text-xs opacity-70">{crypto.name}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* QR Code Display */}
        <Card className="border-0 shadow-lg animate-fade-in-up delay-400">
          <CardHeader>
            <CardTitle className="text-xl text-green-600">Receive Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Code */}
            <div className="text-center">
              <div className="w-64 h-64 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center border-4 border-green-100 shadow-lg animate-scale-in delay-500">
                <div className="w-56 h-56 bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* QR Code Pattern Simulation */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-2">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${
                          Math.random() > 0.5 ? "bg-black" : "bg-white"
                        } rounded-sm transition-all duration-300 hover:scale-110`}
                      />
                    ))}
                  </div>
                  <QrCode className="w-32 h-32 text-white relative z-10 animate-pulse" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Scan this QR code to send {selectedCrypto} to your wallet</p>
            </div>

            {/* Address Display */}
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-gray-700">Wallet Address</Label>
                  <Badge variant="secondary" className="text-xs">
                    {selectedCrypto} Network
                  </Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <code className="flex-1 text-sm font-mono text-gray-800 break-all">{currentAddress}</code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyAddress}
                    className={`${
                      copied ? "bg-green-50 border-green-200 text-green-700" : "bg-transparent"
                    } transition-all duration-300`}
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                {copied && (
                  <p className="text-sm text-green-600 mt-2 animate-fade-in-up">✓ Address copied to clipboard!</p>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Optional Amount and Note */}
        <Card className="border-0 shadow-lg animate-fade-in-up delay-600">
          <CardHeader>
            <CardTitle className="text-xl text-green-600">Request Details (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                Request Amount ({selectedCrypto})
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">Specify an amount to request (optional)</p>
            </div>

            <div>
              <Label htmlFor="note" className="text-sm font-medium text-gray-700">
                Note/Message
              </Label>
              <Input
                id="note"
                placeholder="Payment for..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">Add a note for the sender (optional)</p>
            </div>

            {(amount || note) && (
              <Card className="bg-green-50 border-green-200 animate-scale-in">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Request Summary</h4>
                  <div className="space-y-1 text-sm">
                    {amount && (
                      <div className="flex justify-between">
                        <span>Requested Amount:</span>
                        <span className="font-semibold">
                          {amount} {selectedCrypto}
                        </span>
                      </div>
                    )}
                    {note && (
                      <div className="flex justify-between">
                        <span>Note:</span>
                        <span className="font-semibold">"{note}"</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up delay-700">
          <Button
            variant="outline"
            className="p-4 h-auto flex flex-col items-center gap-2 bg-transparent hover:bg-blue-50"
            onClick={handleShare}
          >
            <Share className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium">Share</span>
          </Button>

          <Button
            variant="outline"
            className="p-4 h-auto flex flex-col items-center gap-2 bg-transparent hover:bg-purple-50"
          >
            <Download className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium">Save QR</span>
          </Button>

          <Button
            className="p-4 h-auto flex flex-col items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            onClick={handleCopyAddress}
          >
            <Copy className="w-6 h-6" />
            <span className="text-sm font-medium">Copy Address</span>
          </Button>
        </div>

        {/* Security Notice */}
        <Card className="border-0 shadow-sm bg-amber-50 border-amber-200 animate-fade-in-up delay-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 text-sm">Security Tips</h4>
                <ul className="text-xs text-amber-700 mt-1 space-y-1">
                  <li>• Only share this address with trusted senders</li>
                  <li>• Verify the network matches the cryptocurrency being sent</li>
                  <li>• Double-check the address before sharing</li>
                  <li>• This address is unique to your {selectedCrypto} wallet</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
