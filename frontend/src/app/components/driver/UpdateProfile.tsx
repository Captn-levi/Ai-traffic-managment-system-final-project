import { useEffect, useState } from 'react';
import { User, Mail, Phone, CreditCard, Camera } from 'lucide-react';
import MobileHeader from '../shared/MobileHeader';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function UpdateProfile() {

  const [profile, setProfile] = useState({
    id: 0,
    fullName: '',
    email: '',
    phone: '',
    license_Number: '',
    address: '',
    currentPassword: '',
    newPassword: ''
  });

  // ✅ LOAD USER
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("driver") || "{}");

    if (!user.id) {
      alert("Not logged in");
      return;
    }

    setProfile({
      id: user.id,
      fullName: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      license_Number: user.license_Number || '',
      address: user.address || '',
      currentPassword: '',
      newPassword: ''
    });

  }, []);

  // ✅ SAVE
  const handleSave = async () => {
  if (!profile.fullName || !profile.email) {
    alert("Name and Email required");
    return;
  }

  try {
    const res = await fetch("http://localhost/traffic/backend/update_driver.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: profile.id,
        name: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        license_Number: profile.license_Number,
        address: profile.address,
        currentPassword: profile.currentPassword,
        newPassword: profile.newPassword
      })
    });

    const data = await res.json();

    console.log("SERVER RESPONSE:", data); // 🔥 DEBUG

    if (data.success) {
      alert("✅ Profile updated");

      localStorage.setItem("driver", JSON.stringify({
        id: profile.id,
        name: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        license_Number: profile.license_Number,
        address: profile.address
      }));

      setProfile({
        ...profile,
        currentPassword: '',
        newPassword: ''
      });

    } else {
      alert("❌ " + data.error);
    }

  } catch (err) {
    console.error("FETCH ERROR:", err);
    alert("❌ Failed to connect to server");
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Update Profile" backPath="/driver/dashboard" />
      
      <div className="p-4 max-w-2xl mx-auto pb-24">
        <div className="bg-white rounded-xl shadow-md p-6 mb-4">

          {/* PROFILE HEADER */}
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
            <p className="text-sm text-gray-500">{profile.license_Number}</p>
          </div>

          {/* FORM */}
          <div className="space-y-4">

            <div>
              <Label>Full Name</Label>
              <Input
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              />
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </Label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                License Number
              </Label>
              <Input value={profile.license_Number} disabled className="bg-gray-100" />
            </div>

            <div>
              <Label>Address</Label>
              <Input
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </div>

            {/* PASSWORD SECTION */}
            <div>
              <Label>Current Password</Label>
              <Input
                type="password"
                value={profile.currentPassword}
                onChange={(e) =>
                  setProfile({ ...profile, currentPassword: e.target.value })
                }
              />
            </div>

            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                value={profile.newPassword}
                onChange={(e) =>
                  setProfile({ ...profile, newPassword: e.target.value })
                }
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