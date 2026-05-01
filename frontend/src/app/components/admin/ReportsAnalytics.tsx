import { BarChart3, Download, TrendingUp } from 'lucide-react';
import AdminSidebar from '../shared/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export default function ReportsAnalytics() {
  const monthlyData = [
    { month: 'Jan', penalties: 234, revenue: 35100 },
    { month: 'Feb', penalties: 289, revenue: 43350 },
    { month: 'Mar', penalties: 312, revenue: 46800 },
    { month: 'Apr', penalties: 267, revenue: 40050 },
    { month: 'May', penalties: 345, revenue: 51750 },
    { month: 'Jun', penalties: 398, revenue: 59700 },
  ];

  const topOfficers = [
    { name: 'Officer Badge #12345', penalties: 156, revenue: '$23,400' },
    { name: 'Officer Badge #67890', penalties: 134, revenue: '$20,100' },
    { name: 'Officer Badge #11223', penalties: 112, revenue: '$16,800' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl text-gray-900 mb-2">Reports & Analytics</h1>
              <p className="text-gray-600">Monthly and annual performance statistics</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Total Penalties (6 months)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl text-gray-900 mb-1">1,845</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+15% from last period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Total Revenue (6 months)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl text-gray-900 mb-1">$276,750</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+22% from last period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Average Penalty Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl text-gray-900 mb-1">$150</p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span>Consistent with policy</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data) => (
                    <div key={data.month}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-900">{data.month}</span>
                        <div className="text-right">
                          <p className="text-sm text-gray-900">{data.penalties} penalties</p>
                          <p className="text-xs text-gray-500">${data.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(data.penalties / 400) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Officers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topOfficers.map((officer, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{officer.name}</p>
                        <p className="text-xs text-gray-500">{officer.penalties} penalties issued</p>
                      </div>
                      <p className="text-sm text-purple-600">{officer.revenue}</p>
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
