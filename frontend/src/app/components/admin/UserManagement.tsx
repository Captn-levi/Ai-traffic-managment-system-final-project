import { useState, useEffect } from 'react';
import { Search, UserPlus, Edit, Trash2, X } from 'lucide-react';
import AdminSidebar from '../shared/AdminSidebar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export default function UserManagement() {

  const [activeTab, setActiveTab] = useState<'drivers' | 'police'>('drivers');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    license: '',
    badge_id: ''
  });

  // ✅ FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost/traffic/backend/get_users.php");
      const text = await res.text();
      const data = JSON.parse(text);
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ DELETE USER
  const deleteUser = async (user: any) => {
    if (!confirm("Delete this user?")) return;

    try {
      const res = await fetch("http://localhost/traffic/backend/delete_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: user.id,
          role: user.role
        })
      });

      const data = await res.json();

      if (data.success) {
        fetchUsers();
      } else {
        alert("Delete failed");
      }

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ ADD / UPDATE USER
  const handleSave = async () => {

    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password.trim();
    const phone = form.phone.trim();
    const license = form.license.trim();
    const badge_id = form.badge_id.trim();

    if (!name || !email) {
      alert("Name and Email required");
      return;
    }

    let url = "";
    let method = editingUser ? "PUT" : "POST";

    if (activeTab === "drivers") {
      if (!phone || !license) {
        alert("Driver must have phone and license");
        return;
      }

      url = editingUser
        ? "http://localhost/traffic/backend/update_driver.php"
        : "http://localhost/traffic/backend/driver_register.php";

    } else {
      if (!badge_id) {
        alert("Police must have badge ID");
        return;
      }

      url = editingUser
        ? "http://localhost/traffic/backend/update_police.php"
        : "http://localhost/traffic/backend/add_police.php";
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser?.id,
          name,
          email,
          password,
          phone,
          license,
          badge_id
        })
      });

      const data = await res.json();

      if (data.success) {
        alert(editingUser ? "Updated successfully" : "User added");

        setShowModal(false);
        setEditingUser(null);

        setForm({
          name: '',
          email: '',
          password: '',
          phone: '',
          license: '',
          badge_id: ''
        });

        fetchUsers();
      } else {
        alert(data.error || "Failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // ✅ EDIT USER
  const handleEdit = (user: any) => {
    setEditingUser(user);
    setShowModal(true);

    setForm({
      name: user.name || '',
      email: user.email || '',
      password: '',
      phone: user.phone || '',
      license: user.license_number || '',
      badge_id: user.badge_id || ''
    });
  };

  // ✅ FILTER
  const filteredUsers = users.filter(user => {
    const matchSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchRole =
      activeTab === 'drivers'
        ? user.role === 'driver'
        : user.role === 'police';

    return matchSearch && matchRole;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}>
        <AdminSidebar />
      </div>

      {/* MAIN */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* HEADER */}
          <div className="flex items-center justify-between">

            <div>
              <Button
                variant="outline"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mb-3"
              >
                {sidebarOpen ? "Hide Menu" : "Show Menu"}
              </Button>

              <h1 className="text-3xl font-semibold text-gray-900">
                User Management
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Manage drivers and traffic police
              </p>

              {/* TABS */}
              <div className="flex gap-3 mt-4">
                {['drivers', 'police'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 rounded transition ${
                      activeTab === tab
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {tab === 'drivers' ? 'Drivers' : 'Police'}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => {
                setEditingUser(null);
                setShowModal(true);
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add {activeTab === 'drivers' ? 'Driver' : 'Police'}
            </Button>

          </div>

          {/* SEARCH */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Phone</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredUsers.map(user => (
                  <tr key={`${user.role}-${user.id}`}>

                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone || "—"}</td>

                    <td className="px-6 py-4">
                      <Badge>{user.role}</Badge>
                    </td>

                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteUser(user)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {editingUser ? "Edit" : "Add"} {activeTab === 'drivers' ? 'Driver' : 'Police'}
              </h2>
              <X onClick={() => setShowModal(false)} className="cursor-pointer" />
            </div>

            <Input placeholder="Name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} className="mb-2" />

            <Input placeholder="Email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} className="mb-2" />

            <Input type="password" placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })} className="mb-2" />

            {activeTab === "drivers" && (
              <>
                <Input placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mb-2" />

                <Input placeholder="License Number"
                  value={form.license}
                  onChange={(e) => setForm({ ...form, license: e.target.value })} className="mb-2" />
              </>
            )}

            {activeTab === "police" && (
              <>
                <Input placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mb-2" />

                <Input placeholder="Badge ID"
                  value={form.badge_id}
                  onChange={(e) => setForm({ ...form, badge_id: e.target.value })} className="mb-2" />
              </>
            )}

            <Button onClick={handleSave} className="w-full bg-purple-600 mt-3">
              Save
            </Button>

          </div>
        </div>
      )}

    </div>
  );
}