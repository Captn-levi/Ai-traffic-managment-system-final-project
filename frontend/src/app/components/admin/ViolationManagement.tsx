import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import AdminSidebar from '../shared/AdminSidebar';
import { Button } from '../ui/button';

export default function ViolationManagement() {

  const [violations, setViolations] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [currentId, setCurrentId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // ✅ FETCH
  const fetchViolations = () => {
    fetch("http://localhost/traffic/backend/get_violations.php")
      .then(res => res.json())
      .then(data => setViolations(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchViolations();
  }, []);

  // ✅ ADD / UPDATE
  const saveViolation = async () => {
    if (!name.trim() || !amount) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const url = isEdit
        ? "http://localhost/traffic/backend/update_violation.php"
        : "http://localhost/traffic/backend/add_violation.php";

      const payload = isEdit
        ? { id: currentId, name, description, amount: Number(amount) }
        : { name, description, amount: Number(amount) };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        alert(isEdit ? "✅ Updated successfully" : "✅ Added successfully");

        resetForm();
        fetchViolations();
      } else {
        alert("❌ " + data.error);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // ✅ DELETE
 const deleteViolation = async (id: number) => {
  if (!confirm("Are you sure you want to delete this violation?")) return;

  try {
    console.log("Deleting ID:", id); // DEBUG

    const res = await fetch("http://localhost/traffic/backend/delete_violation.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    const data = await res.json();

    console.log("SERVER RESPONSE:", data); // 🔥 IMPORTANT

    if (data.success) {
      alert("✅ Deleted successfully");
      fetchViolations();
    } else {
      alert("❌ " + data.error); // 🔥 SHOW REAL ERROR
    }

  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};

  // ✅ OPEN ADD
  const openAddModal = () => {
    setIsEdit(false);
    resetForm();
    setShowModal(true);
  };

  // ✅ OPEN EDIT
  const openEditModal = (v: any) => {
    setIsEdit(true);
    setCurrentId(v.id);
    setName(v.name);
    setDescription(v.description);
    setAmount(v.amount);
    setShowModal(true);
  };

  // ✅ RESET
  const resetForm = () => {
    setName('');
    setDescription('');
    setAmount('');
    setCurrentId(null);
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex justify-between mb-8">
            <div>
              <h1 className="text-3xl text-gray-900">Violation Management</h1>
              <p className="text-gray-600">Manage violations and penalties</p>
            </div>

            <Button onClick={openAddModal} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Violation
            </Button>
          </div>

          {/* LIST */}
          <div className="grid gap-4">
            {violations.map((v) => (
              <div key={v.id} className="bg-white p-6 rounded-lg shadow">

                <div className="flex justify-between">

                  <div>
                    <h3 className="text-lg text-gray-900">{v.name}</h3>
                    <p className="text-sm text-gray-600">{v.description}</p>

                    <div className="flex gap-6 mt-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        ${v.amount}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(v)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteViolation(v.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-full max-w-md">

              <h2 className="text-xl mb-4">
                {isEdit ? "Edit Violation" : "Add Violation"}
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Violation Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border p-2 rounded"
                />

              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>

                <Button onClick={saveViolation} className="bg-purple-600">
                  {isEdit ? "Update" : "Save"}
                </Button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}