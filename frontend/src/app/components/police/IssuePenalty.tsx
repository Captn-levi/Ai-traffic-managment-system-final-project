import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Upload,
  Camera,
  FileText,
  Loader2
} from 'lucide-react';

import MobileHeader from '../shared/MobileHeader';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

export default function IssuePenalty() {

  const navigate = useNavigate();
  const location = useLocation();

  const { vehicleData, violation } =
    location.state || {};

  const police =
    JSON.parse(localStorage.getItem("police") || "{}");

  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

 
const handleIssue = async () => {

  try {

    const police =
      JSON.parse(localStorage.getItem("police") || "{}");

    const penaltyData = {

      driver_id:
        vehicleData?.driver_id,

      vehicle_id:
        vehicleData?.vehicle_id,

      plate_number:
        vehicleData?.plateNumber ||
        vehicleData?.plate_number,

      type:
        violation?.name,

      violation_id:
        violation?.id || 0,

      location:
        "Addis Ababa",

      amount:
        violation?.amount,

      police_id:
        police?.id,

      notes:
        notes,

      evidence_image:
        ""

    };

    console.log("SENDING:", penaltyData);
    console.log("Vehicle Data:", vehicleData);
    console.log("Violation:", violation);
    console.log("Police:", police);
    console.log("Penalty Data:", penaltyData);

    const response = await fetch(

      "http://localhost/traffic/backend/create_penalty.php",

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(penaltyData)
      }
    );

    const data = await response.json();

    console.log("SERVER RESPONSE:", data);

    if (data.success) {

      const penalty = {

        id: data.penalty_id,

        ...penaltyData,

        owner:
          vehicleData?.owner,

        date:
          new Date().toISOString(),

        officer:
          police?.name || "Officer"

      };

      navigate(
        '/police/penalty-receipt',
        {
          state: { penalty }
        }
      );

    } else {

      alert(
        data.error || "Failed to issue penalty"
      );
    }

  } catch (error) {
  console.error("FETCH ERROR:", error);

  if (error instanceof Error) {
    alert(error.message);
  } else {
    alert("Unknown server error");
  }
}
};



  return (

    <div className="min-h-screen bg-gray-50">

      <MobileHeader
        title="Issue Traffic Penalty"
        backPath="/police/select-violation"
      />

      <div className="p-4 max-w-2xl mx-auto pb-24">

        {/* SUMMARY */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">

          <h2 className="text-xl font-semibold mb-5 text-gray-800">
            Penalty Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-500">
                License Plate
              </span>

              <span className="font-medium">
                {vehicleData?.plate_number}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Vehicle Owner
              </span>

              <span className="font-medium">
                {vehicleData?.owner}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Violation
              </span>

              <span className="font-medium">
                {violation?.name}
              </span>
            </div>

            <div className="flex justify-between border-t pt-4">

              <span className="text-gray-500">
                Penalty Amount
              </span>

              <span className="text-2xl font-bold text-red-600">
                ETB {violation?.amount}
              </span>

            </div>

          </div>

        </div>

        {/* NOTES */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <Label
            htmlFor="notes"
            className="flex items-center gap-2 mb-3"
          >

            <FileText className="w-4 h-4" />

            Additional Notes

          </Label>

          <Textarea
            id="notes"
            placeholder="Add officer remarks..."
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            rows={5}
          />

        </div>

      </div>

      {/* BOTTOM ACTION */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">

        <Button
          onClick={handleIssue}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-base"
        >

          {loading ? (
            <div className="flex items-center gap-2">

              <Loader2 className="w-5 h-5 animate-spin" />

              Issuing Penalty...

            </div>
          ) : (
            "Issue Penalty"
          )}

        </Button>

      </div>

    </div>
  );
}