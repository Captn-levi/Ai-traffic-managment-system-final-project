import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, AlertCircle, Car, User, Calendar } from 'lucide-react';
import MobileHeader from '../shared/MobileHeader';
import { Button } from '../ui/button';

export default function VehicleVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const plateNumber = location.state?.plateNumber || 'ABC-1234';

  // Mock vehicle data
  const vehicleData = {
    plateNumber: plateNumber,
    owner: 'John Doe',
    vehicleType: 'Private Car',
    model: 'Toyota Camry 2020',
    registrationDate: '2020-03-15',
    status: 'Active',
    previousViolations: 2
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Vehicle Verification" backPath="/police/capture-plate" />
      
      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-gray-900">Vehicle Details</h2>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Verified</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <div className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-2xl tracking-wider mb-2">
                  {vehicleData.plateNumber}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Owner Name</p>
                  <p className="text-gray-900">{vehicleData.owner}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Vehicle Type</p>
                  <p className="text-gray-900">{vehicleData.vehicleType}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Model</p>
                  <p className="text-gray-900">{vehicleData.model}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p className="text-gray-900">{vehicleData.registrationDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Previous Violations</p>
                  <p className="text-gray-900">{vehicleData.previousViolations} violations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <Button
            onClick={() => navigate('/police/select-violation', { state: { vehicleData } })}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Proceed to Issue Penalty
          </Button>
          
          <Button
            onClick={() => navigate('/police/driver-history', { state: { vehicleData } })}
            variant="outline"
            className="w-full"
          >
            View Driver History
          </Button>
        </div>
      </div>
    </div>
  );
}
