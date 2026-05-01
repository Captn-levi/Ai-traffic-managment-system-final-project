import { useLocation } from 'react-router-dom';
import { Download, Share2, Printer, CheckCircle } from 'lucide-react';
import MobileHeader from '../shared/MobileHeader';
import { Button } from '../ui/button';

export default function DownloadReceipt() {

  const location = useLocation();
  const penalty = location.state?.penalty;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!penalty) {
    return <div className="p-4">No receipt data found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Download Receipt" backPath="/driver/penalty-details" />

      <div className="p-4 max-w-2xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-xl text-gray-900">Payment Receipt</h2>
            <p className="text-gray-600 text-sm">Transaction Successful</p>
          </div>

          {/* Receipt ID */}
          <div className="border-t border-b border-gray-200 py-4 mb-4 text-center">
            <p className="text-sm text-gray-500">Receipt #</p>
            <p className="text-lg text-gray-900">{penalty.id}</p>
          </div>

          {/* Details */}
          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Date:</span>
              <span className="text-gray-900">{new Date().toISOString().split('T')[0]}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Violation Type:</span>
              <span className="text-gray-900">{penalty.type}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Violation Date:</span>
              <span className="text-gray-900">{penalty.date}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="text-gray-900">{penalty.location}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Driver Name:</span>
              <span className="text-gray-900">{user.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="text-gray-900">System Payment</span>
            </div>

            <div className="flex justify-between border-t pt-3">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="text-2xl text-green-600">${penalty.amount}</span>
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-3 gap-3">

          <Button
            onClick={() => window.print()}
            className="flex-col h-auto py-3 bg-green-600 hover:bg-green-700"
          >
            <Download className="w-5 h-5 mb-1" />
            <span className="text-xs">Download</span>
          </Button>

          <Button variant="outline" className="flex-col h-auto py-3">
            <Share2 className="w-5 h-5 mb-1" />
            <span className="text-xs">Share</span>
          </Button>

          <Button
            onClick={() => window.print()}
            variant="outline"
            className="flex-col h-auto py-3"
          >
            <Printer className="w-5 h-5 mb-1" />
            <span className="text-xs">Print</span>
          </Button>

        </div>

      </div>
    </div>
  );
}