import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, Clock, FileText, Bot, User } from 'lucide-react';
import { Button } from '../ui/button';

export default function DriverDashboard() {

  // ✅ SAFE USER FETCH
  const [user, setUser] = useState<any>(null);
  const [penalties, setPenalties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    }
  }, []);

  // ✅ PAY PENALTY
  const payPenalty = async (penaltyId: number) => {
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
    }
  };

  // ✅ FETCH PENALTIES
  useEffect(() => {
    if (!user?.id) return;

    fetch("http://localhost/traffic/backend/get_penalties.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ driver_id: user.id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === false) {
          console.error(data.error);
          return;
        }
        setPenalties(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

  }, [user]);

  // ✅ CALCULATIONS
  const totalPending = penalties
    .filter(p => p.status === 'Pending')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pendingCount = penalties.filter(p => p.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">

          <div>
            <h1 className="text-xl font-semibold">My Dashboard</h1>

            {/* ✅ FIXED NAME DISPLAY */}
            <p className="text-sm opacity-90">
              Welcome {user?.name ? `Mr. ${user.name}` : 'Driver'}
            </p>
          </div>

          <Link to="/driver/update-profile">
            <Button className="p-2 hover:bg-green-700 rounded-lg">
              <User className="w-6 h-6" />
            </Button>
          </Link>

        </div>

        <div className="bg-white/20 backdrop-blur rounded-xl p-4">
          <p className="text-sm mb-1 opacity-90">Pending Penalties</p>

          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-bold">${totalPending}</p>
            <p className="text-sm">
              {pendingCount} {pendingCount === 1 ? 'penalty' : 'penalties'}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 max-w-2xl mx-auto">

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 gap-3 mb-6">

          <Link to="/driver/penalty-details">
            <button className="bg-white rounded-lg p-4 text-left hover:shadow-md w-full">
              <FileText className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-sm text-gray-600">View All</p>
              <p className="text-gray-900 font-medium">Penalties</p>
            </button>
          </Link>

          <Link to="/driver/chatbot">
            <button className="bg-white rounded-lg p-4 text-left hover:shadow-md w-full">
              <Bot className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm text-gray-600">AI Support</p>
              <p className="text-gray-900 font-medium">Chatbot</p>
            </button>
          </Link>

        </div>

        {/* PENALTIES */}
        <h2 className="text-lg mb-3 text-gray-900">Recent Penalties</h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : penalties.length === 0 ? (
          <div className="bg-white rounded-lg p-6 text-center text-gray-500">
            No penalties found
          </div>
        ) : (
          <div className="space-y-3">
            {penalties.map((penalty) => (
              <div key={penalty.id} className="bg-white rounded-lg shadow-md p-4">

                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-gray-900 font-medium">{penalty.type}</h3>
                    <p className="text-sm text-gray-500">{penalty.location}</p>
                  </div>

                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    penalty.status === 'Paid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {penalty.status === 'Paid'
                      ? <CheckCircle className="w-3 h-3" />
                      : <Clock className="w-3 h-3" />
                    }
                    {penalty.status}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm border-t pt-2">
                  <span className="text-gray-600">{penalty.date}</span>

                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-lg font-semibold">
                      ${penalty.amount}
                    </span>

                    {penalty.status === 'Pending' && (
                      <Button
                        onClick={() => payPenalty(penalty.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs h-7 px-3"
                      >
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* WARNING */}
        {pendingCount > 0 && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />

            <div>
              <p className="text-sm text-yellow-800">
                You have {pendingCount} pending penalties. Please pay to avoid additional charges.
              </p>

              <Link to="/driver/penalty-details">
                <Button className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm h-8">
                  View & Pay Now
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}