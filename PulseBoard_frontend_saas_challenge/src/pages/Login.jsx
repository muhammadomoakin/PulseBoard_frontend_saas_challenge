import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, ShieldCheck } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-700">
        <div className="mb-10 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-600/30 rotate-3 hover:rotate-0 transition-transform duration-500">
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            PulseBoard
          </h1>
          <p className="text-slate-500 font-bold max-w-xs mx-auto text-sm">
            The next generation of financial intelligence for high-growth teams.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
            <ShieldCheck size={120} className="text-indigo-600" />
          </div>

          <div className="relative z-10">
            <h2 className="mb-2 text-2xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mb-8 text-sm text-slate-400 font-bold">
              Secure access to your command center.
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  System ID (Email)
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 font-bold text-slate-900 placeholder:text-slate-300 shadow-inner"
                  placeholder="admin@pulseboard.io"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Access Key (Password)
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 font-bold text-slate-900 placeholder:text-slate-300 shadow-inner"
                  placeholder="••••••••••••"
                />
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-md border-slate-200 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">
                    Keep me signed in
                  </span>
                </label>
                <a
                  href="#"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Forgot key?
                </a>
              </div>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 py-4.5 text-white bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-4 ring-offset-white transition-all shadow-xl shadow-indigo-600/30 active:scale-[0.98]"
              >
                Initialise Session
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <p className="text-sm font-bold text-slate-400">
            System status:{" "}
            <span className="text-emerald-500 uppercase tracking-widest text-[10px] ml-1">
              Nominal
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
