import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

export default function DriverLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost/traffic/backend/driver_login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {

        // 🔥 FIX: clear old data
        localStorage.removeItem("user");

        // 🔥 FIX: store using correct key
        localStorage.setItem("user", JSON.stringify(data.user));

        // OPTIONAL: debug
        console.log("Logged in user:", data.user);

        navigate('/driver/dashboard');

      } else {
        alert(data.error || "Invalid credentials");
      }

    } catch (error) {
      console.error(error);
      alert("Server or connection error!\nPlease try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5]">

      <Header />
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl text-gray-900">Driver Login</h1>
            <p className="text-gray-600 text-sm">Access your penalty information</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4" />
                Email or License Number
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter email or license number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

          </form>

          <div className="mt-6 text-center space-y-2">
            <Link to="/driver/registration" className="text-sm text-green-600 hover:underline block">
              Don't have an account? Register
            </Link>

            <Link to="/" className="text-sm text-gray-600 hover:underline block">
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
     <Footer />
    </div>
  );
}