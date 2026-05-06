import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, CreditCard, Car } from 'lucide-react';
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
    confirmPassword: '',

    // 🚗 NEW VEHICLE DATA
    plateNumber: '',
    vehicleType: '',
    model: '',
    color: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.licenseNumber ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.plateNumber
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
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
          password: formData.password,

          // 🚗 VEHICLE DATA
          plate_number: formData.plateNumber,
          vehicle_type: formData.vehicleType,
          model: formData.model,
          color: formData.color
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Registration successful");
        navigate("/driver/login");
      } else {
        alert("❌ " + data.error);
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* HEADER */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Driver Registration
            </h1>
            <p className="text-gray-500 text-sm">
              Create your account and register your vehicle
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* DRIVER INFO */}
            <h2 className="text-sm font-semibold text-gray-500">Driver Info</h2>

            <Input
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />

            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <Input
              placeholder="License Number"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            />

            {/* VEHICLE INFO */}
            <h2 className="text-sm font-semibold text-gray-500 pt-2">Vehicle Info</h2>

            <div className="grid grid-cols-2 gap-3">

              <Input
                placeholder="Plate Number"
                value={formData.plateNumber}
                onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value.toUpperCase() })}
              />

              <Input
                placeholder="Type (Car, Truck...)"
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
              />

              <Input
                placeholder="Model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />

              <Input
                placeholder="Color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />

            </div>

            {/* PASSWORD */}
            <h2 className="text-sm font-semibold text-gray-500 pt-2">Security</h2>

            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <Input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />

            {/* BUTTON */}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 mt-3">
              Register
            </Button>

          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center text-sm">
            <Link to="/driver/login" className="text-green-600 hover:underline">
              Already have an account? Login
            </Link>
            <br />
            <Link to="/" className="text-gray-500 hover:underline mt-2 inline-block">
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}