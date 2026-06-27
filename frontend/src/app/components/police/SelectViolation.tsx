
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import MobileHeader from "../shared/MobileHeader";
import { Button } from "../ui/button";

interface ViolationType {
  id: number;
  name: string;
  description: string;
  amount: number;
}

export default function SelectViolation() {
  const navigate = useNavigate();
  const location = useLocation();

  const vehicleData = location.state?.vehicleData;

  const [violations, setViolations] = useState<ViolationType[]>([]);
  const [selectedViolation, setSelectedViolation] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost/traffic/backend/get_violation_types.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setViolations(data.violations);
        } else {
          setError("Failed to load violation types.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to connect to the server.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleProceed = () => {
    const violation = violations.find(
      (v) => v.id === selectedViolation
    );

    if (!violation) {
      alert("Please select a violation.");
      return;
    }

    navigate("/police/issue-penalty", {
      state: {
        vehicleData,
        violation,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <MobileHeader
        title="Select Violation Type"
        backPath="/police/vehicle-verification"
      />

      <div className="p-4 max-w-2xl mx-auto pb-24">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Select Violation
          </h2>

          <p className="text-gray-500 mt-2">
            Choose the traffic violation committed by the driver.
          </p>
        </div>

        {loading && (
          <div className="bg-white rounded-lg p-6 text-center shadow">
            Loading violation types...
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-3">

            {violations.map((violation) => (

              <button
                key={violation.id}
                onClick={() => setSelectedViolation(violation.id)}
                className={`w-full rounded-xl border-2 p-5 text-left transition-all duration-200

                ${
                  selectedViolation === violation.id
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                }
                `}
              >

                <div className="flex justify-between items-start">

                  <div>

                    <div className="flex items-center gap-2">

                      <h3 className="text-lg font-semibold text-gray-900">
                        {violation.name}
                      </h3>

                      {selectedViolation === violation.id && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}

                    </div>

                    <p className="text-gray-500 mt-2">
                      {violation.description}
                    </p>

                  </div>

                  <div className="text-right">

                    <span className="text-sm text-gray-500">
                      Penalty
                    </span>

                    <p className="text-2xl font-bold text-blue-600">
                      ETB {violation.amount}
                    </p>

                  </div>

                </div>

              </button>

            ))}

          </div>
        )}

      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4">

        <Button
          onClick={handleProceed}
          disabled={selectedViolation === null}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
        >
          Continue to Issue Penalty
        </Button>

      </div>

    </div>
  );
}

