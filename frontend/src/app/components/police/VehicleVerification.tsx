import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Car, User, Calendar, Loader2 } from 'lucide-react';
import MobileHeader from '../shared/MobileHeader';
import { Button } from '../ui/button';

export default function VehicleVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const plateNumber = location.state?.plateNumber;

  const [vehicleData, setVehicleData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔥 FETCH REAL DATA
  useEffect(() => {
    if (!plateNumber) return;

    fetch(`http://localhost/traffic/backend/get_vehicle.php?plate=${plateNumber}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setVehicleData(data.data);
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
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Vehicle Verification" backPath="/police/capture-plate" />
      
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
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* ✅ SUCCESS */}
        {!loading && vehicleData && (
          <>
            <div className="bg-white rounded-xl shadow-md p-6 mb-4">

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-gray-900">Vehicle Details</h2>

                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Verified</span>
                </div>
              </div>

              {/* PLATE */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center">
                <div className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-2xl tracking-wider">
                  {vehicleData.plate_number}
                </div>
              </div>

              <div className="grid gap-4">

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Owner</p>
                    <p className="text-gray-900">{vehicleData.owner || "Unknown"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Vehicle Type</p>
                    <p className="text-gray-900">{vehicleData.vehicle_type || "-"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Model</p>
                    <p className="text-gray-900">{vehicleData.model || "-"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Registration Date</p>
                    <p className="text-gray-900">
                      {vehicleData.registration_date?.split(" ")[0] || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Previous Violations</p>
                    <p className="text-gray-900">
                      {vehicleData.violations} violations
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* ACTIONS */}
            <div className="grid gap-3">

              <Button
                onClick={() => navigate('/police/select-violation', {
                  state: { vehicleData }
                })}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Issue Penalty
              </Button>

              <Button
                onClick={() => navigate('/police/driver-history', {
                  state: {
                    vehicleData,
                    plateNumber: vehicleData.plate_number
                  }
                })}
                variant="outline"
                className="w-full"
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