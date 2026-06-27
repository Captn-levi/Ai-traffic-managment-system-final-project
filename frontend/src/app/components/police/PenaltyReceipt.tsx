import {
  useNavigate,
  useLocation
} from 'react-router-dom';

import {
  CheckCircle,
  Printer
} from 'lucide-react';

import MobileHeader from '../shared/MobileHeader';

import { Button } from '../ui/button';

export default function PenaltyReceipt() {

  const navigate = useNavigate();

  const location = useLocation();

  const penalty =
    location.state?.penalty;

  if (!penalty) return null;

  const formattedDate =
    new Date(penalty.date)
      .toLocaleString();

  return (

    <div className="min-h-screen bg-gray-50">

      <MobileHeader
        title="Penalty Receipt"
        backPath="/police/capture-plate"
      />

      <div className="p-4 max-w-2xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          {/* SUCCESS */}
          <div className="text-center mb-8">

            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">

              <CheckCircle className="w-12 h-12 text-green-600" />

            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Penalty Issued Successfully
            </h2>

            <p className="text-gray-500 mt-2">
              The driver penalty has been recorded.
            </p>

          </div>

          {/* RECEIPT */}
          <div className="border rounded-2xl p-5 space-y-4">

            <div className="text-center border-b pb-4">

              <p className="text-sm text-gray-500">
                Receipt ID
              </p>

              <h3 className="text-xl font-bold">
                {penalty.id}
              </h3>

            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Date & Time
              </span>

              <span>
                {formattedDate}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                License Plate
              </span>

              <span>
                {penalty.plate_number}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Owner
              </span>

              <span>
                {penalty.owner}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Violation
              </span>

              <span>
                {penalty.type}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Location
              </span>

              <span>
                {penalty.location}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Officer
              </span>

              <span>
                {penalty.officer}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Status
              </span>

              <span className="text-red-600 font-medium">
                {penalty.status}
              </span>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">

              <span className="text-lg text-gray-600">
                Total Amount
              </span>

              <span className="text-3xl font-bold text-blue-700">
                ETB {penalty.amount}
              </span>

            </div>

          </div>

          {/* NOTES */}
          {penalty.notes && (

            <div className="mt-5 bg-gray-100 rounded-2xl p-4">

              <p className="text-sm text-gray-500 mb-1">
                Officer Notes
              </p>

              <p className="text-gray-800">
                {penalty.notes}
              </p>

            </div>
          )}

          {/* ACTIONS */}
          <div className="mt-6">

            <Button
              onClick={() => window.print()}
              variant="outline"
              className="w-full py-6"
            >

              <Printer className="w-5 h-5 mr-2" />

              Print Receipt

            </Button>

          </div>

        </div>

        {/* NEW PENALTY */}
        <Button
          onClick={() =>
            navigate('/police/capture-plate')
          }
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 py-6"
        >

          Issue Another Penalty

        </Button>

      </div>

    </div>
  );
}