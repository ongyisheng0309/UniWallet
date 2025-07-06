"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, Receipt, Share, Copy, Download } from "lucide-react"

interface PaymentSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  amount: string
  recipient?: string
  transactionId: string
  transactionType?: string
  additionalDetails?: { label: string; value: string }[]
}

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  title = "Payment Successful!",
  subtitle = "Your payment has been processed successfully",
  amount,
  recipient,
  transactionId,
  transactionType = "DuitNow QR",
  additionalDetails = [],
}: PaymentSuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleCopyTxId = () => {
    navigator.clipboard.writeText(transactionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {showConfetti && (
          <>
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  animationDuration: `${1.5 + Math.random() * 1.5}s`,
                }}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    ["bg-pink-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400"][
                      Math.floor(Math.random() * 5)
                    ]
                  }`}
                />
              </div>
            ))}
          </>
        )}
      </div>

      <Card className="w-full max-w-sm border-0 shadow-2xl bg-white/95 backdrop-blur-md animate-scale-in">
        <CardContent className="p-0">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 text-white p-6 rounded-t-lg relative overflow-hidden">
            <div className="relative z-10 text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                <CheckCircle className="w-10 h-10 text-white animate-bounce" />
              </div>

              <h2 className="text-xl font-bold mb-1">{title}</h2>
              <p className="text-green-100 text-sm mb-4">{subtitle}</p>

              {/* Amount Display */}
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-2xl font-bold">{amount}</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 space-y-4">
            {/* Recipient Info */}
            {recipient && (
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm font-bold">{recipient.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{recipient}</h3>
              </div>
            )}

            {/* Transaction Details */}
            <Card className="bg-gray-50 border-gray-100">
              <CardContent className="p-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Transaction ID:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-xs text-gray-700">{transactionId}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyTxId}
                        className="p-1 h-auto hover:bg-gray-200"
                      >
                        {copied ? (
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="text-gray-700">{new Date().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="text-gray-700">{transactionType}</span>
                  </div>
                  {additionalDetails.map((detail, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{detail.label}:</span>
                      <span className="text-gray-700">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2.5 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                onClick={onClose}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="bg-white hover:bg-gray-50 border-gray-200 rounded-lg py-2 flex flex-col items-center gap-1 h-auto"
                >
                  <Receipt className="w-4 h-4 text-blue-600" />
                  <span className="text-xs">Receipt</span>
                </Button>
                <Button
                  variant="outline"
                  className="bg-white hover:bg-gray-50 border-gray-200 rounded-lg py-2 flex flex-col items-center gap-1 h-auto"
                >
                  <Download className="w-4 h-4 text-purple-600" />
                  <span className="text-xs">Download</span>
                </Button>
                <Button
                  variant="outline"
                  className="bg-white hover:bg-gray-50 border-gray-200 rounded-lg py-2 flex flex-col items-center gap-1 h-auto"
                >
                  <Share className="w-4 h-4 text-green-600" />
                  <span className="text-xs">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
