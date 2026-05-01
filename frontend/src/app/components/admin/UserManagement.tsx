import { useState, useEffect } from 'react';
import { Search, UserPlus, Edit, Trash2, MoreVertical } from 'lucide-react';
import AdminSidebar from '../shared/AdminSidebar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  // ✅ Fetch users from backend
  useEffect(() => {
    fetch("http://localhost/traffic/backend/get_users.php")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  // ✅ Delete user
  const deleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch("http://localhost/traffic/backend/delete_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });

      const data = await response.json();

      if (data.success) {
        // remove from UI
        setUsers(prev => prev.filter(user => user.driver_id !== id));
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  // ✅ Search filter
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl text-gray-900 mb-2">User Management</h1>
              <p className="text-gray-600">Manage system users</p>
            </div>

            <Button className="bg-purple-600 hover:bg-purple-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add New User
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md mb-6">
            
            {/* Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">Filters</Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs text-gray-600">User</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Email</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Status</th>
                    <th className="px-6 py-3 text-right text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredUsers.map((user) => (
                    <tr key={user.driver_id} className="hover:bg-gray-50">
                      
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{user.name}</p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </td>

                      <td className="px-6 py-4">
                        <Badge>Active</Badge>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>

                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteUser(user.driver_id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>

                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}