import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Bot,
  User,
  Bell,
  Wallet,
  Loader2,
  LayoutDashboard,
  Menu,
  X,
  LogOut,
  ShieldCheck
} from 'lucide-react';

import { Button } from '../ui/button';

export default function DriverDashboard() {

  const [user, setUser] = useState<any>(null);
  const [penalties, setPenalties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      setUser(JSON.parse(storedUser));

    }

  }, []);

  const payPenalty = async (penaltyId: number) => {

    setPayingId(penaltyId);

    try {

      const response = await fetch(
        "http://localhost/traffic/backend/pay_penalty.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            penalty_id: penaltyId
          })
        }
      );

      const data = await response.json();

      if (data.success) {

        setPenalties(prev =>
          prev.map(p =>
            p.id === penaltyId
              ? { ...p, status: "Paid" }
              : p
          )
        );

      } else {

        alert("Payment failed");

      }

    } catch (err) {

      console.error(err);

      alert("Server Error");

    } finally {

      setPayingId(null);

    }

  };

  useEffect(() => {

    if (!user?.id) return;

    fetch(
      "http://localhost/traffic/backend/get_penalties.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          driver_id: user.id
        })
      }
    )
      .then(res => res.json())
      .then(data => {

        if (data.success === false) {

          console.error(data.error);

          return;

        }

        setPenalties(data);

      })
      .catch(console.error)
      .finally(() => setLoading(false));

  }, [user]);

  // NOTE: fixed bug — this used to filter on "Unpaid" while the card
  // below checked for "Pending", so the Pay Now button never rendered.
  // Both sides now agree: anything that isn't "Paid" counts as unpaid.
  const unpaidPenalties = penalties.filter(
    p => p.status !== "Paid"
  );

  const paidPenalties = penalties.filter(
    p => p.status === "Paid"
  );

  const totalPending = unpaidPenalties.reduce(
    (sum, p) => sum + Number(p.amount),
    0
  );

  const pendingCount = unpaidPenalties.length;

  const paidCount = paidPenalties.length;

  const today = new Date().toLocaleDateString(
    "en-GB",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const initials = user?.name
    ? user.name.split(" ").map((p: string) => p[0]).slice(0, 2).join("").toUpperCase()
    : "DR";

  const navItems = [
    { label: "Dashboard", to: "/driver/dashboard", icon: LayoutDashboard },
    { label: "My Penalties", to: "/driver/penalty-details", icon: FileText },
    { label: "Payments", to: "/driver/penalty-details", icon: Wallet },
    { label: "AI Assistant", to: "/driver/chatbot", icon: Bot },
    { label: "My Profile", to: "/driver/update-profile", icon: User },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col">

      {/* BRAND */}
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500">
          <ShieldCheck className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">Traffic Portal</p>
          <p className="text-xs text-slate-400 leading-tight">Driver Account</p>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map(({ label, to, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              label === "Dashboard"
                ? "bg-emerald-500/15 text-emerald-400 font-medium"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon className={`h-[18px] w-[18px] ${label === "Dashboard" ? "text-emerald-400" : "text-slate-400"}`} />
            {label}
          </Link>
        ))}
      </nav>

      {/* USER FOOTER */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{user?.name || "Driver"}</p>
            <p className="truncate text-xs text-slate-400">{user?.email || "—"}</p>
          </div>
          <button
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
            className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-64 lg:flex-col bg-slate-900">
        {sidebarContent}
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-slate-900 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">Traffic Portal</span>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="rounded-md p-2 text-slate-300 hover:bg-white/5"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-64 bg-slate-900 shadow-xl">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-3 rounded-md p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="lg:pl-64">

        {/* HEADER */}
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 text-white p-6 rounded-b-3xl shadow-lg lg:rounded-none">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-2xl font-bold">
                Driver Dashboard
              </h1>

              <p className="text-emerald-100 mt-1">
                Welcome back,
                <span className="font-semibold">
                  {" "}
                  {user?.name || "Driver"}
                </span>
              </p>

              <p className="text-emerald-200 text-sm mt-1">
                {today}
              </p>

            </div>

            <div className="flex gap-2">

              <Button className="bg-white/20 p-2 rounded-xl hover:bg-white/30 transition">

                <Bell className="w-5 h-5" />

              </Button>

              <Link to="/driver/update-profile">

                <Button className="bg-white/20 p-2 rounded-xl hover:bg-white/30 transition">

                  <User className="w-5 h-5" />

                </Button>

              </Link>

            </div>

          </div>

          <div className="mt-6 bg-white/15 backdrop-blur rounded-2xl p-5">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-emerald-100">

                  Total Unpaid Penalties

                </p>

                <h2 className="text-4xl font-bold mt-1 tabular-nums">

                  ETB {totalPending.toLocaleString()}

                </h2>

              </div>

              <Wallet className="w-10 h-10 opacity-80" />

            </div>

          </div>

          <div className="grid grid-cols-3 gap-3 mt-5">

            <div className="bg-white/20 rounded-xl p-3 text-center">

              <p className="text-xs text-emerald-100">
                Unpaid
              </p>

              <h3 className="text-2xl font-bold tabular-nums">
                {pendingCount}
              </h3>

            </div>

            <div className="bg-white/20 rounded-xl p-3 text-center">

              <p className="text-xs text-emerald-100">
                Paid
              </p>

              <h3 className="text-2xl font-bold tabular-nums">
                {paidCount}
              </h3>

            </div>

            <div className="bg-white/20 rounded-xl p-3 text-center">

              <p className="text-xs text-emerald-100">
                Total
              </p>

              <h3 className="text-2xl font-bold tabular-nums">
                {penalties.length}
              </h3>

            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-4 max-w-2xl mx-auto lg:max-w-4xl">

          {/* QUICK ACTIONS */}

          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            <Link to="/driver/penalty-details">
              <Button className="bg-white rounded-xl shadow hover:shadow-lg transition-all p-5 w-full text-left h-full">

                <FileText className="w-8 h-8 text-emerald-600 mb-3" />

                <h3 className="font-semibold text-gray-900">
                  My Penalties
                </h3>

                <p className="text-sm text-gray-500">
                  View all issued penalties
                </p>

              </Button>
            </Link>

            <Link to="/driver/chatbot">
              <button className="bg-white rounded-xl shadow hover:shadow-lg transition-all p-5 w-full text-left h-full">

                <Bot className="w-8 h-8 text-purple-600 mb-3" />

                <h3 className="font-semibold text-gray-900">
                  AI Assistant
                </h3>

                <p className="text-sm text-gray-500">
                  Ask traffic questions
                </p>

              </button>
            </Link>

            <Link to="/driver/update-profile">
              <button className="bg-white rounded-xl shadow hover:shadow-lg transition-all p-5 w-full text-left h-full">

                <User className="w-8 h-8 text-blue-600 mb-3" />

                <h3 className="font-semibold text-gray-900">
                  My Profile
                </h3>

                <p className="text-sm text-gray-500">
                  Update personal details
                </p>

              </button>
            </Link>

            <Link to="/driver/penalty-details">
              <button className="bg-white rounded-xl shadow hover:shadow-lg transition-all p-5 w-full text-left h-full">

                <Wallet className="w-8 h-8 text-orange-600 mb-3" />

                <h3 className="font-semibold text-gray-900">
                  Payments
                </h3>

                <p className="text-sm text-gray-500">
                  Pay outstanding penalties
                </p>

              </button>
            </Link>

          </div>

          {/* PENALTIES */}
          <h2 className="text-lg mb-3 text-gray-900">Recent Penalties</h2>

          {loading ? (
            <div className="flex items-center justify-center gap-2 text-gray-500 py-8">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </div>
          ) : penalties.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-center text-gray-500">
              No penalties found
            </div>
          ) : (
            <div className="space-y-3">
              {penalties.map((penalty) => {

                const isPaid = penalty.status === "Paid";

                return (
                  <div key={penalty.id} className="relative bg-white rounded-lg shadow-md p-4 pl-5 overflow-hidden">

                    <div className={`absolute left-0 top-0 h-full w-1.5 ${isPaid ? "bg-emerald-500" : "bg-yellow-500"}`} />

                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 font-medium">{penalty.type}</h3>
                        <p className="text-sm text-gray-500">{penalty.location}</p>
                      </div>

                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        isPaid
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {isPaid
                          ? <CheckCircle className="w-3 h-3" />
                          : <Clock className="w-3 h-3" />
                        }
                        {penalty.status}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm border-t pt-2">
                      <span className="text-gray-600">{penalty.date}</span>

                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 text-lg font-semibold tabular-nums">
                          ETB {Number(penalty.amount).toLocaleString()}
                        </span>

                        {!isPaid && (
                          <Button
                            onClick={() => payPenalty(penalty.id)}
                            disabled={payingId === penalty.id}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-7 px-3 disabled:opacity-60"
                          >
                            {payingId === penalty.id
                              ? <Loader2 className="w-3 h-3 animate-spin" />
                              : "Pay Now"
                            }
                          </Button>
                        )}
                      </div>
                    </div>

                  </div>
                );

              })}
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

    </div>
  );
}
