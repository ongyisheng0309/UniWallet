"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Wallet, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import AuthPages from "../../auth-pages"
import ProfilePage from "../../profile-page"

interface WebsiteLayoutProps {
  children: React.ReactNode
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export default function WebsiteLayout({ children, currentPage = 1, totalPages = 5, onPageChange }: WebsiteLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAuth, setShowAuth] = useState<"signin" | "signup" | null>(null)
  const [showProfile, setShowProfile] = useState(false)

  const navigationItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Security", href: "#security" },
    { name: "Support", href: "#support" },
    { name: "About", href: "#about" },
  ]

  const handleAuthSuccess = () => {
    setShowAuth(null)
    // Here you would typically redirect to the dashboard or update auth state
  }

  const handleSwitchAuthMode = () => {
    setShowAuth(showAuth === "signin" ? "signup" : "signin")
  }

  if (showProfile) {
    return <ProfilePage onBack={() => setShowProfile(false)} />
  }

  if (showAuth) {
    return (
      <AuthPages
        type={showAuth}
        onBack={() => setShowAuth(null)}
        onSuccess={handleAuthSuccess}
        onSwitchMode={handleSwitchAuthMode}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">UniWallet</h1>
                <p className="text-xs text-gray-500">Universal Digital Wallet</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <Button
                variant="ghost"
                onClick={() => setShowProfile(true)}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Profile
              </Button>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setShowAuth("signin")}>
                Sign In
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAuth("signup")}>
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <a key={item.name} href={item.href} className="text-gray-600 hover:text-blue-600 font-medium">
                    {item.name}
                  </a>
                ))}
                <Button
                  variant="ghost"
                  onClick={() => setShowProfile(true)}
                  className="text-gray-600 hover:text-blue-600 font-medium justify-start p-0"
                >
                  Profile
                </Button>
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowAuth("signin")}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowAuth("signup")}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200/30 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-pink-200/30 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-200/30 rounded-full animate-bounce delay-1000"></div>

          {/* Gradient Orbs */}
          <div className="absolute top-32 right-32 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Wallet App Card */}
        <div className="w-3/4 mx-auto relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-3xl">
            {children}
          </div>
        </div>

        {/* Side Decorations */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="space-y-6">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300"></div>
            <div className="w-4 h-4 bg-pink-500 rounded-full animate-ping delay-700"></div>
          </div>
        </div>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="space-y-6">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-rose-500 rounded-full animate-ping delay-500"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">UniWallet</h3>
                  <p className="text-xs text-gray-400">Universal Digital Wallet</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                The most secure and user-friendly digital wallet for managing your cryptocurrencies and fiat currencies
                in one place.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Crypto Wallet
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fiat Wallet
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    DeFi Staking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    NFT Marketplace
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Trading Platform
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Bug Bounty
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>support@uniwallet.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>
                    123 Blockchain Street
                    <br />
                    Crypto Valley, CV 12345
                  </span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-6">
                <h5 className="font-medium mb-2">Stay Updated</h5>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 UniWallet. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookies
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
