"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, Shield, CheckCircle } from "lucide-react"

interface AuthPagesProps {
  type: "signin" | "signup"
  onBack: () => void
  onSuccess: () => void
  onSwitchMode: () => void
}

export default function AuthPages({ type, onBack, onSuccess, onSwitchMode }: AuthPagesProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // For signup: 1 = Basic Info, 2 = Security Setup, 3 = Verification

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (type === "signup" && step < 3) {
      setStep(step + 1)
    } else {
      onSuccess()
    }

    setIsLoading(false)
  }

  const isSignIn = type === "signin"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-pink-200/30 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-200/30 rounded-full animate-bounce delay-1000"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-32 right-32 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="absolute -top-2 left-0 text-gray-600 hover:text-blue-600 p-2 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center animate-scale-in">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">UniWallet</h1>
              <p className="text-sm text-gray-500">Universal Digital Wallet</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2 gradient-text">
            {isSignIn ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-gray-600">
            {isSignIn
              ? "Sign in to access your digital wallet"
              : step === 1
                ? "Join millions of users worldwide"
                : step === 2
                  ? "Secure your account"
                  : "Verify your identity"}
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md animate-slide-in-left delay-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center">{isSignIn ? "Sign In" : `Step ${step} of 3`}</CardTitle>
            {!isSignIn && (
              <div className="flex gap-2 mt-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full ${
                      i <= step ? "bg-blue-600" : "bg-gray-200"
                    } transition-all duration-300`}
                  />
                ))}
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sign In Form */}
              {isSignIn && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                      </Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <Button variant="link" className="text-sm text-blue-600 hover:text-blue-700 p-0">
                      Forgot password?
                    </Button>
                  </div>
                </>
              )}

              {/* Sign Up Form - Step 1: Basic Info */}
              {!isSignIn && step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+60 12-345 6789"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sign Up Form - Step 2: Security Setup */}
              {!isSignIn && step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Create Password
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Password Strength Indicator */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
                    <div className="space-y-1">
                      {[
                        { text: "At least 8 characters", met: formData.password.length >= 8 },
                        { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
                        { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
                        { text: "Contains number", met: /\d/.test(formData.password) },
                      ].map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className={`w-4 h-4 ${req.met ? "text-green-600" : "text-gray-300"}`} />
                          <span className={`text-xs ${req.met ? "text-green-600" : "text-gray-500"}`}>{req.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sign Up Form - Step 3: Verification */}
              {!isSignIn && step === 3 && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-scale-in">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify Your Email</h3>
                    <p className="text-gray-600 mb-4">
                      We've sent a verification code to
                      <br />
                      <span className="font-semibold">{formData.email}</span>
                    </p>
                  </div>

                  <div className="flex gap-3 justify-center">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center text-lg font-semibold border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    ))}
                  </div>

                  <Button variant="link" className="text-sm text-blue-600 hover:text-blue-700">
                    Didn't receive the code? Resend
                  </Button>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover-lift"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isSignIn ? "Signing In..." : step === 3 ? "Verifying..." : "Continue"}
                  </div>
                ) : (
                  <>{isSignIn ? "Sign In" : step === 3 ? "Verify & Create Account" : "Continue"}</>
                )}
              </Button>
            </form>

            {/* Social Login (Sign In only) */}
            {isSignIn && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 border-gray-200 hover:bg-gray-50 bg-transparent">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="h-12 border-gray-200 hover:bg-gray-50 bg-transparent">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </>
            )}

            {/* Switch Mode */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isSignIn ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  onClick={onSwitchMode}
                  className="text-blue-600 hover:text-blue-700 font-semibold p-0 ml-1"
                >
                  {isSignIn ? "Sign up" : "Sign in"}
                </Button>
              </p>
            </div>

            {/* Terms and Privacy (Sign Up only) */}
            {!isSignIn && step === 1 && (
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our{" "}
                  <Button variant="link" className="text-xs text-blue-600 hover:text-blue-700 p-0">
                    Terms of Service
                  </Button>{" "}
                  and{" "}
                  <Button variant="link" className="text-xs text-blue-600 hover:text-blue-700 p-0">
                    Privacy Policy
                  </Button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Badge */}
        <div className="text-center mt-6 animate-fade-in-up delay-500">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-gray-200">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">256-bit SSL Encryption</span>
          </div>
        </div>
      </div>
    </div>
  )
}
