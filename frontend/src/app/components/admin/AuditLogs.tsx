import { Search, Filter, Download } from 'lucide-react';
import AdminSidebar from '../shared/AdminSidebar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export default function AuditLogs() {
  const logs = [
    { id: 1, timestamp: '2026-01-08 14:32:15', user: 'Officer Badge #12345', action: 'Issued Penalty', details: 'PEN-ABC123 - Speeding', type: 'penalty' },
    { id: 2, timestamp: '2026-01-08 14:15:42', user: 'john.doe@example.com', action: 'Payment Made', details: 'PEN-XYZ789 - $100', type: 'payment' },
    { id: 3, timestamp: '2026-01-08 13:45:10', user: 'admin@traffic.gov', action: 'System Config Changed', details: 'Updated AI confidence threshold', type: 'system' },
    { id: 4, timestamp: '2026-01-08 12:20:33', user: 'jane.smith@example.com', action: 'User Registered', details: 'New driver account created', type: 'user' },
    { id: 5, timestamp: '2026-01-08 11:10:05', user: 'Officer Badge #67890', action: 'Issued Penalty', details: 'PEN-DEF456 - Red Light', type: 'penalty' },
    { id: 6, timestamp: '2026-01-08 10:55:22', user: 'admin@traffic.gov', action: 'User Suspended', details: 'Suspended sarah.j@example.com', type: 'admin' },
    { id: 7, timestamp: '2026-01-08 10:30:18', user: 'system', action: 'Backup Completed', details: 'Database backup successful', type: 'system' },
    { id: 8, timestamp: '2026-01-08 09:15:44', user: 'Officer Badge #12345', action: 'Login', details: 'Mobile app login successful', type: 'auth' },
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'penalty':
        return <Badge className="bg-yellow-100 text-yellow-800">Penalty</Badge>;
      case 'payment':
        return <Badge className="bg-green-100 text-green-800">Payment</Badge>;
      case 'system':
        return <Badge className="bg-purple-100 text-purple-800">System</Badge>;
      case 'user':
        return <Badge className="bg-blue-100 text-blue-800">User</Badge>;
      case 'admin':
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      case 'auth':
        return <Badge className="bg-gray-100 text-gray-800">Auth</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl text-gray-900 mb-2">Audit Logs</h1>
              <p className="text-gray-600">Track all system activities and user actions</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input placeholder="Search logs by user, action, or details..." className="pl-10" />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{log.timestamp}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{log.user}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{log.action}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{log.details}</span>
                      </td>
                      <td className="px-6 py-4">
                        {getTypeBadge(log.type)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm text-gray-600">Showing 8 of 1,247 logs</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
