import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Settings, Lock, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');   // ✅ FIXED
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/traffic/backend/admin_login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (data.success) {
        alert("✅ Login successful");

        // optional: store session
        localStorage.setItem("admin", JSON.stringify(data.admin));

        navigate("/admin/dashboard"); // ✅ redirect
      } else {
        alert("❌ " + data.error);
      }

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Settings className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-2xl mb-2 text-gray-900">Admin Login</h1>
            <p className="text-gray-600 text-sm">System Administration Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4" />
                Email
              </Label>
              <Input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Login to Dashboard
            </Button>

          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-purple-600 hover:underline">
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}