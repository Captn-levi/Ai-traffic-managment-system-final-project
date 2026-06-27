import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  CheckCircle,
  AlertCircle,
  Car,
  User,
  Calendar,
  Loader2,
  ShieldAlert,
  Phone,
  Mail,
  FileBadge
} from 'lucide-react';

import MobileHeader from '../shared/MobileHeader';
import { Button } from '../ui/button';

export default function VehicleVerification() {

  const navigate = useNavigate();
  const location = useLocation();

  const plateNumber = location.state?.plateNumber;

  const [vehicleData, setVehicleData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔥 AI STATES
  const [aiConfidence, setAiConfidence] = useState(0);
  const [riskLevel, setRiskLevel] = useState('');

  // 🔥 FETCH VEHICLE
  useEffect(() => {

    if (!plateNumber) return;

    fetch(`http://localhost/traffic/backend/get_vehicle.php?plate=${plateNumber}`)

      .then(res => res.json())

      .then(data => {

        if (data.success) {

          setVehicleData(data.vehicle);

          // 🔥 AI SIMULATION
          const confidence =
            Math.floor(Math.random() * 10) + 90;

          setAiConfidence(confidence);

          // 🔥 RISK LEVEL
          if (data.vehicle.violations >= 5) {

            setRiskLevel("High Risk");

          } else if (data.vehicle.violations >= 2) {

            setRiskLevel("Medium Risk");

          } else {

            setRiskLevel("Low Risk");
          }

        } else {

          setError("Vehicle not found");
        }

        setLoading(false);

      })

      .catch(err => {

        console.error(err);

        setError("Server error");

        setLoading(false);

      });

  }, [plateNumber]);

  return (

    <div className="min-h-screen bg-gray-100">

      <MobileHeader
        title="Vehicle Verification"
        backPath="/police/capture-plate"
      />

      <div className="p-4 max-w-2xl mx-auto">

        {/* 🔄 LOADING */}
        {loading && (

          <div className="text-center py-20 text-gray-500">

            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />

            Verifying vehicle...

          </div>
        )}

        {/* ❌ ERROR */}
        {!loading && error && (

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-sm">

            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />

            <p className="text-red-700 font-medium">
              {error}
            </p>

          </div>
        )}

        {/* ✅ SUCCESS */}
        {!loading && vehicleData && (

          <>
            {/* MAIN CARD */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-4 border border-white">

              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold text-gray-900">
                  Vehicle Details
                </h2>

                <div className="flex items-center gap-2 text-green-600">

                  <CheckCircle className="w-5 h-5" />

                  <span className="text-sm font-medium">
                    Verified
                  </span>

                </div>

              </div>

              {/* 🔥 AI CARD */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      AI Detection Confidence
                    </p>

                    <p className="text-3xl font-bold text-blue-700">
                      {aiConfidence}%
                    </p>

                  </div>

                  <ShieldAlert className="w-10 h-10 text-blue-600" />

                </div>

                <div className="mt-3">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm font-medium

                      ${
                        riskLevel === "High Risk"
                          ? "bg-red-100 text-red-700"

                          : riskLevel === "Medium Risk"
                          ? "bg-yellow-100 text-yellow-700"

                          : "bg-green-100 text-green-700"
                      }
                    `}
                  >
                    {riskLevel}
                  </span>

                </div>

              </div>

              {/* PLATE */}
              <div className="bg-gray-50 p-5 rounded-xl mb-5 text-center border">

                <div className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl text-3xl font-bold tracking-widest shadow">

                  {vehicleData.plate_number}

                </div>

              </div>

              {/* DETAILS */}
              <div className="grid gap-5">

                {/* OWNER */}
                <div className="flex items-start gap-3">

                  <User className="w-5 h-5 text-gray-400 mt-1" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Owner
                    </p>

                    <p className="text-gray-900 font-medium">
                      {vehicleData.owner || "Unknown"}
                    </p>

                  </div>

                </div>

                {/* PHONE */}
                <div className="flex items-start gap-3">

                  <Phone className="w-5 h-5 text-gray-400 mt-1" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Phone
                    </p>

                    <p className="text-gray-900 font-medium">
                      {vehicleData.phone || "-"}
                    </p>

                  </div>

                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-3">

                  <Mail className="w-5 h-5 text-gray-400 mt-1" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Email
                    </p>

                    <p className="text-gray-900 font-medium">
                      {vehicleData.email || "-"}
                    </p>

                  </div>

                </div>

                {/* LICENSE */}
                <div className="flex items-start gap-3">

                  <FileBadge className="w-5 h-5 text-gray-400 mt-1" />

                  <div>

                    <p className="text-sm text-gray-500">
                      License Number
                    </p>

                    <p className="text-gray-900 font-medium">
                      {vehicleData.license_number || "-"}
                    </p>

                  </div>

                </div>

                {/* VEHICLE TYPE */}
                <div className="flex items-start gap-3">

                  <Car className="w-5 h-5 text-gray-400 mt-1" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Vehicle Type
                    </p>

                    <p className="text-gray-900 font-medium">
                      {vehicleData.vehicle_type || "-"}
                    </p>

                  </div>

                </div>

                {/* MODEL */}
                <div className="flex items-start gap-3">

                  <Car className="w-5 h-5 text-gray-400 mt-1" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Model
                    </p>

                    <p className="text-gray-900 font-medium">
                      {vehicleData.model || "-"}
                    </p>

                  </div>

                </div>

                {/* COLOR */}
                <div className="flex items-start gap-3">

                  <Car className="w-5 h-5 text-gray-400 mt-1" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Color
                    </p>

                    <p className="text-gray-900 font-medium">
                      {vehicleData.color || "-"}
                    </p>

                  </div>

                </div>

                {/* DATE */}
                <div className="flex items-start gap-3">

                  <Calendar className="w-5 h-5 text-gray-400 mt-1" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Registration Date
                    </p>

                    <p className="text-gray-900 font-medium">

                      {
                        vehicleData.registration_date
                          ?.split(" ")[0] || "-"
                      }

                    </p>

                  </div>

                </div>

                {/* VIOLATIONS */}
                <div className="flex items-start gap-3">

                  <AlertCircle className="w-5 h-5 text-red-400 mt-1" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Previous Violations
                    </p>

                    <p className="text-gray-900 font-medium">

                      {vehicleData.violations} violations

                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="grid gap-3">

              {/* ISSUE PENALTY */}
              <Button

                onClick={() =>
                  navigate('/police/select-violation', {
                    state: { vehicleData }
                  })
                }

                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base rounded-xl"
              >
                Proceed to Violation Type
              </Button>

              {/* DRIVER HISTORY */}
              <Button

                onClick={() =>
                  navigate('/police/driver-history', {
                    state: {
                      vehicleData,
                      plateNumber: vehicleData.plate_number
                    }
                  })
                }

                variant="outline"

                className="w-full py-6 text-base rounded-xl"
              >
                View Driver History
              </Button>

            </div>

          </>
        )}

      </div>

    </div>
  );
}