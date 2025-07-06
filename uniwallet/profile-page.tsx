"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Edit,
  Camera,
  Smartphone,
  Globe,
  Lock,
  CheckCircle,
  Star,
  TrendingUp,
  Wallet,
  Award,
  Target,
} from "lucide-react"

interface ProfilePageProps {
  onBack: () => void
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "Ong Yi Sheng",
    email: "ongyisheng0309@gmail.com",
    phone: "+60 1111 998088",
    dateOfBirth: "2003-03-09",
    address: "123 Blockchain Street, Kuala Lumpur",
    country: "Malaysia",
    profileImage: null,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    biometricAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    tradingAlerts: true,
    marketUpdates: true,
  })

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "achievements", label: "Achievements", icon: Award },
  ]

  const achievements = [
    {
      id: 1,
      title: "First Trade",
      description: "Completed your first cryptocurrency trade",
      icon: "🎯",
      earned: true,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Portfolio Builder",
      description: "Added 5 different cryptocurrencies to your portfolio",
      icon: "📈",
      earned: true,
      date: "2024-02-20",
    },
    {
      id: 3,
      title: "Staking Master",
      description: "Earned your first staking rewards",
      icon: "💎",
      earned: true,
      date: "2024-03-10",
    },
    {
      id: 4,
      title: "Security Champion",
      description: "Enabled all security features",
      icon: "🛡️",
      earned: true,
      date: "2024-01-20",
    },
    {
      id: 5,
      title: "Whale Status",
      description: "Portfolio value reached RM 50,000",
      icon: "🐋",
      earned: false,
      progress: 49.7,
    },
    {
      id: 6,
      title: "DeFi Explorer",
      description: "Used 10 different DeFi protocols",
      icon: "🌐",
      earned: false,
      progress: 30,
    },
  ]

  const portfolioStats = {
    totalValue: "RM 24,831.18",
    totalGain: "+RM 3,245.67",
    gainPercentage: "+15.08%",
    bestPerformer: "Ethereum (+22.5%)",
    totalTrades: 47,
    successRate: "78%",
    stakingRewards: "RM 156.89",
    referralEarnings: "RM 89.50",
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSecurityToggle = (setting: string) => {
    setSecuritySettings((prev) => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-3xl">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white p-6 m-4 rounded-3xl shadow-2xl animate-fade-in-up">
        <div className="flex items-center gap-4 mb-4 animate-slide-in-left">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-2 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <User className="w-6 h-6" />
            <div>
              <h1 className="text-xl font-bold">My Profile</h1>
              <p className="text-sm text-blue-200">Manage your account and preferences</p>
            </div>
          </div>
        </div>

        {/* Profile Summary Card */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold animate-scale-in">
                  {profileData.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-700 p-0"
                >
                  <Camera className="w-3 h-3" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 animate-slide-in-right delay-200">
                <h2 className="text-lg font-bold text-white mb-1">{profileData.fullName}</h2>
                <p className="text-blue-200 text-sm mb-2">{profileData.email}</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="text-right animate-fade-in-up delay-300">
                <p className="text-xs text-blue-200">Portfolio Value</p>
                <p className="text-lg font-bold text-white">{portfolioStats.totalValue}</p>
                <p className="text-xs text-green-300">{portfolioStats.gainPercentage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap rounded-full px-3 py-2 flex items-center gap-2 text-xs ${
                activeTab === tab.id
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Personal Info Tab */}
        {activeTab === "personal" && (
          <div className="space-y-4 animate-fade-in-up">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg text-purple-600">Personal Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                  className="bg-transparent text-xs"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-xs font-medium text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative mt-1">
                      <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        disabled={!isEditing}
                        className="pl-8 h-9 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-xs font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                        className="pl-8 h-9 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-xs font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                        className="pl-8 h-9 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth" className="text-xs font-medium text-gray-700">
                      Date of Birth
                    </Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        disabled={!isEditing}
                        className="pl-8 h-9 text-sm"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-xs font-medium text-gray-700">
                      Address
                    </Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        disabled={!isEditing}
                        className="pl-8 h-9 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country" className="text-xs font-medium text-gray-700">
                      Country
                    </Label>
                    <div className="relative mt-1">
                      <Globe className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="country"
                        value={profileData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        disabled={!isEditing}
                        className="pl-8 h-9 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-purple-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Portfolio Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <Wallet className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Total Value</p>
                    <p className="text-sm font-bold text-gray-900">{portfolioStats.totalValue}</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Total Gain</p>
                    <p className="text-sm font-bold text-green-600">{portfolioStats.totalGain}</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                    <Target className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Success Rate</p>
                    <p className="text-sm font-bold text-purple-600">{portfolioStats.successRate}</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl">
                    <Award className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Staking Rewards</p>
                    <p className="text-sm font-bold text-yellow-600">{portfolioStats.stakingRewards}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-4 animate-fade-in-up">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-purple-600 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Two-Factor Authentication</h3>
                      <p className="text-xs text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <Button
                    variant={securitySettings.twoFactorAuth ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSecurityToggle("twoFactorAuth")}
                    className={`text-xs ${securitySettings.twoFactorAuth ? "bg-green-600 hover:bg-green-700" : "bg-transparent"}`}
                  >
                    {securitySettings.twoFactorAuth ? "Enabled" : "Enable"}
                  </Button>
                </div>

                {/* Biometric Authentication */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Lock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Biometric Authentication</h3>
                      <p className="text-xs text-gray-600">Use fingerprint or face recognition</p>
                    </div>
                  </div>
                  <Button
                    variant={securitySettings.biometricAuth ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSecurityToggle("biometricAuth")}
                    className={`text-xs ${securitySettings.biometricAuth ? "bg-blue-600 hover:bg-blue-700" : "bg-transparent"}`}
                  >
                    {securitySettings.biometricAuth ? "Enabled" : "Enable"}
                  </Button>
                </div>

                {/* Password Change */}
                <div className="p-3 border border-gray-200 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Change Password</h3>
                  <p className="text-xs text-gray-600 mb-3">Update your password regularly for better security</p>
                  <Button variant="outline" size="sm" className="bg-transparent text-xs">
                    Change Password
                  </Button>
                </div>

                {/* Login Activity */}
                <div className="p-3 border border-gray-200 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Recent Login Activity</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span>Current session - Malaysia</span>
                      <span className="text-green-600">Active now</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Mobile app - Malaysia</span>
                      <span className="text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Web browser - Malaysia</span>
                      <span className="text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-4 animate-fade-in-up">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-purple-600 flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email Notifications */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Email Notifications</h3>
                      <p className="text-xs text-gray-600">Receive updates via email</p>
                    </div>
                  </div>
                  <Button
                    variant={securitySettings.emailNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSecurityToggle("emailNotifications")}
                    className={`text-xs ${
                      securitySettings.emailNotifications ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"
                    }`}
                  >
                    {securitySettings.emailNotifications ? "On" : "Off"}
                  </Button>
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">SMS Notifications</h3>
                      <p className="text-xs text-gray-600">Receive alerts via SMS</p>
                    </div>
                  </div>
                  <Button
                    variant={securitySettings.smsNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSecurityToggle("smsNotifications")}
                    className={`text-xs ${
                      securitySettings.smsNotifications ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"
                    }`}
                  >
                    {securitySettings.smsNotifications ? "On" : "Off"}
                  </Button>
                </div>

                {/* Trading Alerts */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Trading Alerts</h3>
                      <p className="text-xs text-gray-600">Get notified about price movements</p>
                    </div>
                  </div>
                  <Button
                    variant={securitySettings.tradingAlerts ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSecurityToggle("tradingAlerts")}
                    className={`text-xs ${securitySettings.tradingAlerts ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"}`}
                  >
                    {securitySettings.tradingAlerts ? "On" : "Off"}
                  </Button>
                </div>

                {/* Market Updates */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Market Updates</h3>
                      <p className="text-xs text-gray-600">Daily market summaries and news</p>
                    </div>
                  </div>
                  <Button
                    variant={securitySettings.marketUpdates ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSecurityToggle("marketUpdates")}
                    className={`text-xs ${securitySettings.marketUpdates ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"}`}
                  >
                    {securitySettings.marketUpdates ? "On" : "Off"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-4 animate-fade-in-up">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-purple-600 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Achievements & Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <Card
                      key={achievement.id}
                      className={`border-0 shadow-sm hover:shadow-md transition-all duration-300 ${
                        achievement.earned
                          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      } animate-scale-in`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`text-lg w-10 h-10 rounded-full flex items-center justify-center ${
                              achievement.earned ? "bg-green-100" : "bg-gray-200"
                            }`}
                          >
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className={`font-semibold text-sm ${achievement.earned ? "text-green-800" : "text-gray-600"}`}
                              >
                                {achievement.title}
                              </h3>
                              {achievement.earned && <CheckCircle className="w-3 h-3 text-green-600" />}
                            </div>
                            <p className={`text-xs ${achievement.earned ? "text-green-600" : "text-gray-500"} mb-2`}>
                              {achievement.description}
                            </p>
                            {achievement.earned ? (
                              <p className="text-xs text-green-500">Earned on {achievement.date}</p>
                            ) : (
                              <div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                  <div
                                    className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                                    style={{ width: `${achievement.progress}%` }}
                                  />
                                </div>
                                <p className="text-xs text-gray-500">{achievement.progress}% complete</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
