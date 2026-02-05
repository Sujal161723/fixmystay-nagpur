export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-gray-100 rounded-3xl p-10 shadow-2xl">
        <h2 className="text-3xl font-black text-blue-700 mb-2 text-center tracking-tighter">FixMyStay</h2>
        <p className="text-gray-500 text-center mb-8 font-medium">Nagpur's No-Brokerage Login</p>
        
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mobile Number</label>
            <div className="flex gap-3 mt-2">
              <span className="border border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-600 font-bold">+91</span>
              <input 
                type="text" 
                placeholder="Enter 10 digit number" 
                className="flex-1 border border-gray-200 p-4 rounded-xl outline-none focus:border-blue-500 text-black font-semibold" 
              />
            </div>
          </div>
          
          <button className="w-full bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-100">
            Send OTP
          </button>
          
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
          </div>

          <button className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-5 h-5" />
            Google
          </button>
          
          <p className="text-[11px] text-gray-400 text-center leading-relaxed">
            By logging in, you agree to FixMyStay's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </main>
  );
}