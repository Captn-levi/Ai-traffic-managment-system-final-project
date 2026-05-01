import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function PoliceLogin() {
  const navigate = useNavigate();
  const [badgeId, setBadgeId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to capture plate screen
    navigate('/police/capture-plate');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl mb-2 text-gray-900">Traffic Police Login</h1>
            <p className="text-gray-600 text-sm">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="badgeId" className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4" />
                Badge ID
              </Label>
              <Input
                id="badgeId"
                type="text"
                placeholder="Enter Badge ID"
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                className="w-full"
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
                className="w-full"
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
  );
}
