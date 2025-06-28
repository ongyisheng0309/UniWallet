"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, Receipt, Share } from "lucide-react"

interface PaymentSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  amount: string
  merchant: string
  transactionId: string
}

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  amount,
  merchant,
  transactionId,
}: PaymentSuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardContent className="p-8 text-center">
          {/* Success Animation */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
              <CheckCircle className="w-12 h-12 text-green-600 animate-bounce" />
            </div>
            {showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-bounce text-2xl">🎉</div>
                <div className="animate-bounce delay-100 text-xl absolute -top-2 -left-2">✨</div>
                <div className="animate-bounce delay-200 text-xl absolute -top-2 -right-2">🎊</div>
                <div className="animate-bounce delay-300 text-lg absolute -bottom-2 -left-2">⭐</div>
                <div className="animate-bounce delay-400 text-lg absolute -bottom-2 -right-2">💫</div>
              </div>
            )}
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2 animate-fade-in-up delay-300 gradient-text">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6 animate-fade-in-up delay-500">
            Your payment has been processed successfully
          </p>

          {/* Transaction Details */}
          <Card className="bg-gray-50 border-gray-200 mb-6">
            <CardContent className="p-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-gray-900">{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Merchant:</span>
                  <span className="font-semibold text-gray-900">{merchant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-xs text-gray-700">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="text-gray-700">{new Date().toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 animate-fade-in-up delay-700">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 hover-lift transition-all duration-300 hover:scale-105"
              onClick={onClose}
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="bg-transparent hover-lift transition-all duration-300 hover:scale-105"
              >
                <Receipt className="w-4 h-4 mr-2 animate-pulse" />
                Receipt
              </Button>
              <Button
                variant="outline"
                className="bg-transparent hover-lift transition-all duration-300 hover:scale-105"
              >
                <Share className="w-4 h-4 mr-2 animate-pulse delay-200" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
