import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Volume2, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import logo from "figma:asset/4aae9a3de90b79b2f73f4c31057de1676862c3e8.png";
import { signIn } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [demoMode, setDemoMode] = useState(false);

  // Demo login handler
  const handleDemoLogin = () => {
    setDemoMode(true);
    setError("");
    
    // Set demo user
    const demoUser = {
      id: "demo-user-123",
      phone: "+919876543210",
      user_metadata: {
        name: "राज पटेल (Raj Patel)",
        location: "Ahmedabad, Gujarat"
      }
    };
    
    setUser(demoUser);
    
    // Navigate to home after short delay
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (phoneNumber.length === 10) {
      setStep("otp");
      // In production, this would send OTP via SMS
      console.log("OTP sent to:", phoneNumber);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }

      // Auto-submit when all 4 digits are entered
      if (index === 3 && value && newOtp.every((digit) => digit)) {
        handleOtpSubmit(newOtp);
      }
    }
  };

  const handleOtpSubmit = async (otpValues: string[]) => {
    setIsVerifying(true);
    setError("");
    
    try {
      const otpCode = otpValues.join("");
      const response = await signIn(`+91${phoneNumber}`, otpCode);
      
      // Set user in context
      if (response.user) {
        setUser(response.user);
      }
      
      // Success - navigate to home
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
      setIsVerifying(false);
      // Reset OTP fields
      setOtp(["", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    }
  };

  const speakInstructions = () => {
    // In real app, this would use Bhashini TTS
    const message = step === "phone" 
      ? "Please enter your 10-digit mobile number"
      : "Please enter the 4-digit OTP sent to your phone";
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F8F4] to-[#e8e6dc] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logo} alt="PRANA-G AI" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl text-[#2D5A27] mb-2">Welcome to PRANA-G AI</h1>
          <p className="text-gray-600 text-sm">Hardware-less Livestock Health Monitoring</p>
        </div>

        {/* Demo Login Button */}
        <button
          onClick={handleDemoLogin}
          disabled={isVerifying}
          className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#BFA34B] to-[#8E7932] text-white rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 animate-pulse"
        >
          <CheckCircle size={20} />
          <span className="font-medium">🚀 Demo Login (No Database)</span>
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#F9F8F4] text-gray-500">OR use Phone Login</span>
          </div>
        </div>

        {/* Voice Instructions Button */}
        <button
          onClick={speakInstructions}
          className="w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
        >
          <Volume2 size={20} className="text-[#BFA34B]" />
          <span className="text-sm font-medium text-gray-700">सुनें | Hear Instructions</span>
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {step === "phone" ? (
            <form onSubmit={handlePhoneSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Mobile Number | मोबाइल नंबर
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Phone size={20} className="text-gray-400" />
                    <span className="text-gray-600">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    className="w-full pl-24 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-[#2D5A27] focus:outline-none transition-all"
                    maxLength={10}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Enter your 10-digit mobile number
                </p>
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length !== 10}
                className="w-full bg-gradient-to-r from-[#2D5A27] to-[#3d7a35] text-white py-4 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>Get OTP | ओटीपी प्राप्त करें</span>
                <ArrowRight size={20} />
              </button>
            </form>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Enter OTP | ओटीपी दर्ज करें</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Sent to +91 {phoneNumber}
                  <button
                    onClick={() => setStep("phone")}
                    className="text-[#2D5A27] ml-2 underline"
                  >
                    Change
                  </button>
                </p>

                {/* OTP Input Slots */}
                <div className="flex justify-center gap-3 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="tel"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-200 rounded-2xl focus:border-[#2D5A27] focus:outline-none transition-all"
                      maxLength={1}
                      required
                    />
                  ))}
                </div>

                {isVerifying && (
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                    <CheckCircle size={20} />
                    <span className="text-sm font-medium">Verifying...</span>
                  </div>
                )}

                <button
                  onClick={() => handleOtpSubmit(otp)}
                  disabled={otp.some((digit) => !digit) || isVerifying}
                  className="w-full bg-gradient-to-r from-[#FDB931] to-[#BFA34B] text-white py-4 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify & Login | सत्यापित करें और लॉगिन करें
                </button>

                <button
                  onClick={() => {
                    // Resend OTP logic
                    setOtp(["", "", "", ""]);
                  }}
                  className="w-full mt-3 text-[#2D5A27] text-sm font-medium hover:underline"
                >
                  Resend OTP | ओटीपी पुनः भेजें
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-xs text-gray-700">Secure Login</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-2xl mb-1">🗣️</div>
            <p className="text-xs text-gray-700">Voice-First</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-2xl mb-1">📱</div>
            <p className="text-xs text-gray-700">No Hardware</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}