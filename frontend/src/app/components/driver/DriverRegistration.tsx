import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function DriverRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    password: '',
    confirmPassword: ''
  });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ validation
  if (
    !formData.fullName ||
    !formData.email ||
    !formData.phone ||
    !formData.licenseNumber ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    alert("Please fill all fields");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    console.log("SENDING:", formData);

    const res = await fetch("http://localhost/traffic/backend/driver_register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        license: formData.licenseNumber,
        password: formData.password
      })
    });

    const data = await res.json();

    console.log("SERVER:", data);

    if (data.success) {
      alert("✅ Registration successful");
      navigate("/driver/login");
    } else {
      alert("❌ " + data.error);
    }

  } catch (error) {
    console.error(error);
    alert("Registration failed");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl mb-2 text-gray-900">Driver Registration</h1>
            <p className="text-gray-600 text-sm">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="licenseNumber" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                License Number
              </Label>
              <Input
                id="licenseNumber"
                type="text"
                placeholder="Enter your license number"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Register
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/driver/login" className="text-sm text-green-600 hover:underline">
              Already have an account? Login
            </Link>
            <br />
            <Link to="/" className="text-sm text-gray-600 hover:underline mt-2 inline-block">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
