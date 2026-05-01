import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, AlertTriangle, BarChart3, Settings, FileText, LogOut, Bot } from 'lucide-react';

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'User Management' },
    { path: '/admin/violations', icon: AlertTriangle, label: 'Violations' },
    { path: '/admin/reports', icon: BarChart3, label: 'Reports & Analytics' },
    { path: '/admin/configuration', icon: Settings, label: 'Configuration' },
    { path: '/admin/audit-logs', icon: FileText, label: 'Audit Logs' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Bot className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-gray-900">Traffic System</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-200 pt-4">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
