import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import MobileHeader from '../shared/MobileHeader';
import { Button } from '../ui/button';

export default function SelectViolation() {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicleData = location.state?.vehicleData;
  const [selectedViolation, setSelectedViolation] = useState('');

  const violations = [
    { id: 'speeding', name: 'Speeding', amount: 150, description: 'Exceeding speed limit' },
    { id: 'redlight', name: 'Red Light Violation', amount: 200, description: 'Running a red light' },
    { id: 'parking', name: 'Illegal Parking', amount: 100, description: 'Parking in restricted area' },
    { id: 'nohelmet', name: 'No Helmet', amount: 80, description: 'Riding without helmet' },
    { id: 'seatbelt', name: 'Seatbelt Violation', amount: 120, description: 'Not wearing seatbelt' },
    { id: 'wrongway', name: 'Wrong Way Driving', amount: 250, description: 'Driving in wrong direction' },
    { id: 'phone', name: 'Mobile Phone Use', amount: 150, description: 'Using phone while driving' },
    { id: 'license', name: 'No License', amount: 500, description: 'Driving without valid license' },
  ];

  const handleProceed = () => {
    const violation = violations.find(v => v.id === selectedViolation);
    navigate('/police/issue-penalty', { state: { vehicleData, violation } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Select Violation Type" backPath="/police/vehicle-verification" />
      
      <div className="p-4 max-w-2xl mx-auto pb-24">
        <div className="mb-4">
          <p className="text-gray-600">Select the type of traffic violation committed</p>
        </div>

        <div className="space-y-3">
          {violations.map((violation) => (
            <button
              key={violation.id}
              onClick={() => setSelectedViolation(violation.id)}
              className={`w-full text-left bg-white rounded-lg p-4 border-2 transition-all ${
                selectedViolation === violation.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`text-gray-900 ${selectedViolation === violation.id ? '' : ''}`}>
                      {violation.name}
                    </h3>
                    {selectedViolation === violation.id && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{violation.description}</p>
                  <p className="text-sm">
                    <span className="text-gray-600">Penalty: </span>
                    <span className="text-lg text-blue-600">${violation.amount}</span>
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handleProceed}
          disabled={!selectedViolation}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
        >
          Continue to Issue Penalty
        </Button>
      </div>
    </div>
  );
}
