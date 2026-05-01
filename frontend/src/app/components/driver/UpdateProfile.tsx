import { useState } from 'react';
import { User, Mail, Phone, CreditCard, Camera } from 'lucide-react';
import MobileHeader from '../shared/MobileHeader';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function UpdateProfile() {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    licenseNumber: 'DL-123456789',
    address: '123 Main Street, City, State 12345'
  });

  const handleSave = () => {
    // Save profile logic
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Update Profile" backPath="/driver/dashboard" />
      
      <div className="p-4 max-w-2xl mx-auto pb-24">
        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-green-600" />
              </div>
              <Button className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full text-white hover:bg-green-700">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <h2 className="text-lg mt-3 text-gray-900">{profile.fullName}</h2>
            <p className="text-sm text-gray-500">{profile.licenseNumber}</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
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
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="license" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                License Number
              </Label>
              <Input
                id="license"
                value={profile.licenseNumber}
                onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">License number cannot be modified</p>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
