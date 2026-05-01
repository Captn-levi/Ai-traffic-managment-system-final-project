import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Download, Share2, Printer } from 'lucide-react';
import MobileHeader from '../shared/MobileHeader';
import { Button } from '../ui/button';

export default function PenaltyReceipt() {
  const navigate = useNavigate();
  const location = useLocation();
  const penalty = location.state?.penalty;

  if (!penalty) {
    return null;
  }

  const formattedDate = new Date(penalty.date).toLocaleString();

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Penalty Receipt" backPath="/police/capture-plate" />
      
      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-xl mb-1 text-gray-900">Penalty Issued Successfully</h2>
            <p className="text-gray-600 text-sm">Receipt generated and sent to driver</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <div className="text-center mb-2">
              <p className="text-sm text-gray-500">Penalty ID</p>
              <p className="text-xl text-gray-900">{penalty.id}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="text-gray-900">{formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">License Plate:</span>
              <span className="text-gray-900">{penalty.plateNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Owner Name:</span>
              <span className="text-gray-900">{penalty.owner}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Violation Type:</span>
              <span className="text-gray-900">{penalty.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Issuing Officer:</span>
              <span className="text-gray-900">{penalty.officer}</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="text-gray-600">Penalty Amount:</span>
              <span className="text-2xl text-blue-600">${penalty.amount}</span>
            </div>
          </div>

          {penalty.notes && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Additional Notes:</p>
              <p className="text-gray-900">{penalty.notes}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Button variant="outline" className="flex-col h-auto py-3">
            <Download className="w-5 h-5 mb-1" />
            <span className="text-xs">Download</span>
          </Button>
          <Button variant="outline" className="flex-col h-auto py-3">
            <Share2 className="w-5 h-5 mb-1" />
            <span className="text-xs">Share</span>
          </Button>
          <Button variant="outline" className="flex-col h-auto py-3">
            <Printer className="w-5 h-5 mb-1" />
            <span className="text-xs">Print</span>
          </Button>
        </div>

        <Button
          onClick={() => navigate('/police/capture-plate')}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Issue Another Penalty
        </Button>
      </div>
    </div>
  );
}
