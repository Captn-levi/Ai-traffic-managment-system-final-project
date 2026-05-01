import { useLocation } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import MobileHeader from '../shared/MobileHeader';

export default function DriverHistory() {
  const location = useLocation();
  const vehicleData = location.state?.vehicleData;

  const violations = [
    {
      id: 1,
      date: '2026-01-05',
      type: 'Speeding',
      amount: 150,
      status: 'Paid',
      location: 'Highway 101, Mile 45'
    },
    {
      id: 2,
      date: '2025-12-20',
      type: 'Illegal Parking',
      amount: 100,
      status: 'Pending',
      location: 'Main Street, Zone B'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Driver Violation History" backPath="/police/vehicle-verification" />
      
      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <h2 className="text-lg mb-4 text-gray-900">Driver Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="text-gray-900">{vehicleData?.owner}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">License Plate:</span>
              <span className="text-gray-900">{vehicleData?.plateNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Violations:</span>
              <span className="text-gray-900">{violations.length}</span>
            </div>
          </div>
        </div>

        <h3 className="text-lg mb-3 text-gray-900">Violation History</h3>

        <div className="space-y-3">
          {violations.map((violation) => (
            <div key={violation.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-gray-900 mb-1">{violation.type}</h4>
                  <p className="text-sm text-gray-500">{violation.location}</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  violation.status === 'Paid'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {violation.status === 'Paid' ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {violation.status}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{violation.date}</span>
                <span className="text-blue-600 text-lg">${violation.amount}</span>
              </div>
            </div>
          ))}
        </div>

        {violations.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-600">No previous violations found</p>
          </div>
        )}

        {violations.filter(v => v.status === 'Pending').length > 0 && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> Driver has {violations.filter(v => v.status === 'Pending').length} pending violation(s).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
