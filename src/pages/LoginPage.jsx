import { Coffee } from "lucide-react";

const LoginPage = ({ onLogin, setPage }) => (
  <div className="pt-32 pb-24 max-w-sm mx-auto px-5 text-center">
    <Coffee size={26} className="mx-auto nb-text-mocha" />
    <h2 className="nb-display text-3xl mt-4">Welcome back.</h2>
    <p className="text-sm nb-text-fade mt-2">Sign in to see your orders, points, and saved favorites.</p>
    <div className="space-y-3 mt-8 text-left">
      <input defaultValue="aditi.shah@email.com" placeholder="Email" className="w-full border nb-border px-3 py-2.5 text-sm outline-none nb-focus" />
      <input type="password" defaultValue="••••••••" placeholder="Password" className="w-full border nb-border px-3 py-2.5 text-sm outline-none nb-focus" />
    </div>
    <button onClick={onLogin} className="nb-btn nb-btn-primary w-full py-3 text-sm mt-6 nb-focus">Sign In</button>
    <p className="text-xs nb-text-fade mt-4">This is a demo login — any details work.</p>
  </div>
);


export default LoginPage;
