import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Header from '../shared/Header';
import Footer from '../shared/Footer';



export default function PoliceLogin() {
  
  const navigate = useNavigate();
  const [badgeId, setBadgeId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/traffic/backend/police_login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          badgeId,
          password
        })
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (data.success) {
        alert("✅ Login successful");

        // ✅ SAVE POLICE SESSION
        localStorage.setItem("police", JSON.stringify(data.user));

        // ✅ REDIRECT
        navigate("/police/capture-plate");

      } else {
        alert("❌ " + data.error);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5]">

      <Header />

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl mb-2 text-gray-900">Traffic Police Login</h1>
            <p className="text-gray-600 text-sm">Enter your credentials</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4" />
                Badge ID
              </Label>
              <Input
                type="text"
                placeholder="POL-001"
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
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

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Login
            </Button>

          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-blue-600 hover:underline">
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
