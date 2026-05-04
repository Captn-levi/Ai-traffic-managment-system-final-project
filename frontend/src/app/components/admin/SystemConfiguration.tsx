import { useEffect, useState } from 'react';
import { Settings, Bot, Bell, Shield } from 'lucide-react';
import AdminSidebar from '../shared/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function SystemConfiguration() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost/traffic/backend/get_settings.php")
      .then(res => res.json())
      .then(data => setSettings(data));
  }, []);

  const handleSave = async () => {
    const res = await fetch("http://localhost/traffic/backend/update_settings.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    });

    const data = await res.json();
    if (data.success) alert("✅ Settings saved");
  };

  if (!settings) return <p className="p-8">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-10">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              System Configuration
            </h1>
            <p className="text-gray-500 mt-1">
              Manage AI, notifications, security, and system behavior
            </p>
          </div>

          {/* AI SETTINGS */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="w-5 h-5 text-purple-600" />
                AI Settings
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

              {/* Toggle Row */}
              <div className="flex items-center justify-between">
                <div>
                  <Label>Plate Recognition</Label>
                  <p className="text-sm text-gray-500">
                    Detect license plates automatically
                  </p>
                </div>
                <Switch
                  checked={settings.ai_plate == 1}
                  onCheckedChange={(v) =>
                    setSettings({ ...settings, ai_plate: v ? 1 : 0 })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Violation Detection</Label>
                  <p className="text-sm text-gray-500">
                    Detect traffic violations using AI
                  </p>
                </div>
                <Switch
                  checked={settings.ai_violation == 1}
                  onCheckedChange={(v) =>
                    setSettings({ ...settings, ai_violation: v ? 1 : 0 })
                  }
                />
              </div>

              {/* Input */}
              <div>
                <Label>Confidence Threshold (%)</Label>
                <Input
                  type="number"
                  className="mt-2 w-40"
                  value={settings.confidence}
                  onChange={(e) =>
                    setSettings({ ...settings, confidence: e.target.value })
                  }
                />
              </div>

            </CardContent>
          </Card>

          {/* NOTIFICATIONS */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-blue-600" />
                Notifications
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

              {[
                { label: "Email Notifications", key: "email_notify" },
                { label: "SMS Notifications", key: "sms_notify" },
                { label: "Push Notifications", key: "push_notify" }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <Label>{item.label}</Label>
                  <Switch
                    checked={settings[item.key] == 1}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, [item.key]: v ? 1 : 0 })
                    }
                  />
                </div>
              ))}

            </CardContent>
          </Card>

          {/* SECURITY */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-red-600" />
                Security
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-6">

              <div className="flex items-center justify-between col-span-2">
                <Label>Two-Factor Authentication</Label>
                <Switch
                  checked={settings.two_factor == 1}
                  onCheckedChange={(v) =>
                    setSettings({ ...settings, two_factor: v ? 1 : 0 })
                  }
                />
              </div>

              <div>
                <Label>Session Timeout (min)</Label>
                <Input
                  type="number"
                  value={settings.session_timeout}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      session_timeout: e.target.value
                    })
                  }
                />
              </div>

              <div>
                <Label>Max Login Attempts</Label>
                <Input
                  type="number"
                  value={settings.max_attempts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      max_attempts: e.target.value
                    })
                  }
                />
              </div>

            </CardContent>
          </Card>

          {/* GENERAL */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="w-5 h-5 text-gray-700" />
                General
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-6">

              <div>
                <Label>Timezone</Label>
                <Input
                  value={settings.timezone}
                  onChange={(e) =>
                    setSettings({ ...settings, timezone: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Currency</Label>
                <Input
                  value={settings.currency}
                  onChange={(e) =>
                    setSettings({ ...settings, currency: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Grace Period (days)</Label>
                <Input
                  type="number"
                  value={settings.grace_period}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      grace_period: e.target.value
                    })
                  }
                />
              </div>

            </CardContent>
          </Card>

          {/* SAVE BUTTON */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700 px-6"
            >
              Save Changes
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
}