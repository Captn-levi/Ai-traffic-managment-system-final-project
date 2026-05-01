import { Settings, Bot, Bell, Shield } from 'lucide-react';
import AdminSidebar from '../shared/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function SystemConfiguration() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">System Configuration</h1>
            <p className="text-gray-600">Configure AI settings, thresholds, and system preferences</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Model Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>AI License Plate Recognition</Label>
                    <p className="text-sm text-gray-500">Enable automatic plate detection</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>AI Violation Detection</Label>
                    <p className="text-sm text-gray-500">Automatically detect violations from images</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div>
                  <Label>Recognition Confidence Threshold (%)</Label>
                  <Input type="number" defaultValue="85" className="mt-2 w-32" />
                  <p className="text-xs text-gray-500 mt-1">Minimum confidence level for AI recognition</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Send email alerts for new penalties</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Send SMS alerts for penalties</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">Mobile app push notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div>
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" defaultValue="30" className="mt-2 w-32" />
                </div>

                <div>
                  <Label>Maximum Login Attempts</Label>
                  <Input type="number" defaultValue="3" className="mt-2 w-32" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>System Timezone</Label>
                  <Input defaultValue="UTC-5 (Eastern Time)" className="mt-2" />
                </div>

                <div>
                  <Label>Currency</Label>
                  <Input defaultValue="USD ($)" className="mt-2" />
                </div>

                <div>
                  <Label>Payment Grace Period (days)</Label>
                  <Input type="number" defaultValue="30" className="mt-2 w-32" />
                  <p className="text-xs text-gray-500 mt-1">Days before late fee is applied</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline">Reset to Defaults</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
