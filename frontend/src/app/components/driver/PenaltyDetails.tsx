import { useEffect, useState } from 'react';
import { CheckCircle, Clock, Download, CreditCard, FileText, MapPin, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileHeader from '../shared/MobileHeader';
import { Button } from '../ui/button';

export default function PenaltyDetails() {

  const [user, setUser] = useState<any>(null);
  const [penalties, setPenalties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<number | null>(null);

  // ✅ Read logged-in user safely (was parsed inline on every render before,
  // which also meant a malformed localStorage value would crash the page)
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      try {

        setUser(JSON.parse(storedUser));

      } catch {

        setUser(null);

      }

    } else {

      setLoading(false);

    }

  }, []);

  // ✅ Fetch penalties
  useEffect(() => {
    if (!user?.id) return;

    setLoading(true);

    fetch("http://localhost/traffic/backend/get_penalties.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ driver_id: user.id })
    })
      .then(res => res.json())
      .then(data => setPenalties(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

  }, [user]);

  // ✅ Pay function
  const payPenalty = async (penaltyId: number) => {

    setPayingId(penaltyId);

    try {
      const response = await fetch("http://localhost/traffic/backend/pay_penalty.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ penalty_id: penaltyId })
      });

      const data = await response.json();

      if (data.success) {
        // update UI
        setPenalties(prev =>
          prev.map(p =>
            p.id === penaltyId ? { ...p, status: 'Paid' } : p
          )
        );
      } else {
        alert("Payment failed");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {

      setPayingId(null);

    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Penalty Details & History" backPath="/driver/dashboard" />

      <div className="p-4 max-w-2xl mx-auto">

        {loading ? (
          <div className="flex items-center justify-center gap-2 text-gray-500 py-12">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading your penalties...
          </div>
        ) : penalties.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            No penalties found
          </div>
        ) : (
          <div className="space-y-4">

            {penalties.map((penalty) => {

              // NOTE: fixed bug — this used to check status === 'Pending',
              // but the data only ever sends 'Paid' or 'Unpaid', so the
              // Pay Now button never rendered and every card fell through
              // to the "Download Receipt" branch instead.
              const isPaid = penalty.status === 'Paid';
              const isPaying = payingId === penalty.id;

              return (
                <div key={penalty.id} className="bg-white rounded-xl shadow-md overflow-hidden">

                  {/* Header */}
                  <div className={`p-4 ${isPaid ? 'bg-emerald-50' : 'bg-yellow-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Penalty ID</p>
                        <p className="text-gray-900">{penalty.id}</p>
                      </div>

                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                        isPaid
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {isPaid
                          ? <CheckCircle className="w-4 h-4" />
                          : <Clock className="w-4 h-4" />
                        }
                        <span>{penalty.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-3">

                    <div>
                      <h3 className="text-lg text-gray-900">{penalty.type}</h3>
                      <p className="text-sm text-gray-600">{penalty.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Date</p>
                        <p className="text-gray-900">{penalty.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Time</p>
                        <p className="text-gray-900">{penalty.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm text-gray-900">{penalty.location}</p>
                      </div>
                    </div>

                    <div className="border-t pt-3 flex items-center justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="text-2xl text-emerald-600 font-semibold tabular-nums">
                        ETB {Number(penalty.amount).toLocaleString()}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">

                      {!isPaid ? (
                        <>
                          <Button
                            onClick={() => payPenalty(penalty.id)}
                            disabled={isPaying}
                            className="bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2 disabled:opacity-60"
                          >
                            {isPaying
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : <CreditCard className="w-4 h-4" />
                            }
                            {isPaying ? "Processing..." : "Pay Now"}
                          </Button>

                          <Link to="/driver/download-receipt"
                           state={{ penalty }}>
                            <Button variant="outline" className="w-full flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Details
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <Link to="/driver/download-receipt"
                         state={{ penalty }} className="col-span-2">
                          <Button variant="outline" className="w-full flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download Receipt
                          </Button>
                        </Link>
                      )}

                    </div>

                  </div>
                </div>
              );

            })}

          </div>
        )}

      </div>
    </div>
  );
}
