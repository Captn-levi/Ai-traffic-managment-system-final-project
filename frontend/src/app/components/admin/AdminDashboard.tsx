import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Users, AlertTriangle, DollarSign, Activity } from 'lucide-react';
import AdminSidebar from '../shared/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function AdminDashboard() {

  const [stats, setStats] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [violations, setViolations] = useState<any[]>([]);

  // ✅ Fetch all dashboard data
  useEffect(() => {
    // stats
    fetch("http://localhost/traffic/backend/get_reports.php")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    // logs
    fetch("http://localhost/traffic/backend/get_logs.php")
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => console.error(err));

    // violations
    fetch("http://localhost/traffic/backend/get_top_violations.php")
      .then(res => res.json())
      .then(data => setViolations(data))
      .catch(err => console.error(err));

  }, []);

  // ✅ Prepare stats UI
  const statsData = stats ? [
    { title: 'Total Penalties', value: stats.total, icon: AlertTriangle, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { title: 'Active Users', value: stats.users, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Revenue', value: `$${stats.revenue || 0}`, icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Pending Cases', value: stats.pending, icon: Activity, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ] : [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Live system insights</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.bgColor} p-3 rounded-lg`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>

                    <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                    <p className="text-2xl text-gray-900">{stat.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {logs.length === 0 && (
                    <p className="text-sm text-gray-500">No activity yet</p>
                  )}

                  {logs.map((log, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>

                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{log.action}</p>
                      </div>

                      <span className="text-xs text-gray-400">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Violations */}
            <Card>
              <CardHeader>
                <CardTitle>Top Violations</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {violations.length === 0 && (
                    <p className="text-sm text-gray-500">No data available</p>
                  )}

                  {violations.map((v, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-900">{v.type}</span>
                        <span className="text-sm text-gray-600">{v.count}</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${Math.min(v.count * 5, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

        </div>
      </main>
    </div>
  );
}