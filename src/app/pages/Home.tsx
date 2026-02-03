import { useNavigate } from "react-router";
import { Mic, Camera, Activity, MessageCircle, ChevronDown, Shield, Zap, Globe, Award } from "lucide-react";
import logo from "figma:asset/4aae9a3de90b79b2f73f4c31057de1676862c3e8.png";
import heroImage from "figma:asset/e3836e90ab8ba577aa89a9da54bc1a115fed4c31.png";
import AIAssistant from "@/app/components/AIAssistant";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F8F4] pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-lg mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="PRANA-G AI" className="h-8 w-auto" />
          </div>
          
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
            <span className="text-sm">भाषा | हिन्दी</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative">
            <img 
              src={heroImage} 
              alt="PRANA-G AI Hero" 
              className="w-full h-auto"
            />
          </div>

          {/* CTA Button */}
          <div className="px-6 py-6 relative">
            <button
              onClick={() => navigate("/camera")}
              className="w-full bg-gradient-to-r from-[#FDB931] to-[#BFA34B] text-white py-4 px-6 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3 text-lg"
            >
              <Mic size={24} />
              <span>Check Cow Health</span>
            </button>
            
            <button
              onClick={() => navigate("/camera")}
              className="w-full mt-3 text-gray-600 py-2 flex items-center justify-center gap-2 text-sm hover:text-[#2D5A27]"
            >
              <Camera size={18} />
              <span>Scan with Camera</span>
            </button>
          </div>

          {/* Quick Action Cards */}
          <div className="px-6 pb-6 grid grid-cols-3 gap-3">
            <button
              onClick={() => navigate("/camera?mode=muzzle")}
              className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-all flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center">
                <Camera size={28} className="text-[#2D5A27]" />
              </div>
              <span className="text-sm text-center">Scan Cow</span>
            </button>

            <button
              onClick={() => navigate("/camera?mode=audio")}
              className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-all flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center">
                <Activity size={28} className="text-[#2D5A27]" />
              </div>
              <span className="text-sm text-center">Listen to Sound</span>
            </button>

            <button
              onClick={() => navigate("/history")}
              className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-all flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center">
                <MessageCircle size={28} className="text-[#BFA34B]" />
              </div>
              <span className="text-sm text-center">Hear Health Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-lg mx-auto px-6 pb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#2D5A27] mb-2">
            Features of PRANA-G AI
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-3">
              <Shield size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-[#2D5A27] mb-1">99.7% Accurate</h3>
            <p className="text-xs text-gray-600">Muzzle-ID Biometric Recognition</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mb-3">
              <Zap size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-[#2D5A27] mb-1">48-Hour Alert</h3>
            <p className="text-xs text-gray-600">Early Disease Detection</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center mb-3">
              <Globe size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-[#2D5A27] mb-1">22+ Languages</h3>
            <p className="text-xs text-gray-600">Bhashini Voice Support</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center mb-3">
              <Award size={24} className="text-amber-600" />
            </div>
            <h3 className="font-semibold text-[#2D5A27] mb-1">No Hardware</h3>
            <p className="text-xs text-gray-600">100% Smartphone-based</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-lg mx-auto px-6 pb-6">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="text-center mb-4">
            <img src={logo} alt="PRANA-G AI" className="h-10 w-auto mx-auto mb-3" />
            <h4 className="font-semibold text-[#2D5A27] mb-1">PRANA-G AI</h4>
            <p className="text-xs text-gray-600">
              Hardware-less Livestock Health Monitoring
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-center gap-6 text-xs text-gray-600 mb-3">
              <button onClick={() => navigate("/help-support")} className="hover:text-[#2D5A27]">
                Help & Support
              </button>
              <span>•</span>
              <button onClick={() => navigate("/privacy-policy")} className="hover:text-[#2D5A27]">
                Privacy Policy
              </button>
            </div>
            
            <div className="text-center text-xs text-gray-500">
              <p>Made with ❤️ for Indian Farmers</p>
              <p className="mt-1">© 2026 PRANA-G AI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}