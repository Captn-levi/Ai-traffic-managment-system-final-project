import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, FileText, ScanLine } from 'lucide-react';
import MobileHeader from '../shared/MobileHeader';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function CapturePlate() {
  const navigate = useNavigate();
  const [plateNumber, setPlateNumber] = useState('');
  const [captureMode, setCaptureMode] = useState<'camera' | 'manual'>('camera');

  const handleCapture = () => {
    // Simulate plate capture - navigate to verification
    navigate('/police/vehicle-verification', { state: { plateNumber: plateNumber || 'ABC-1234' } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Capture License Plate" backPath="/police/login" />
      
      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <h2 className="text-lg mb-4 text-gray-900">Capture Method</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setCaptureMode('camera')}
              className={`p-4 rounded-lg border-2 transition-all ${
                captureMode === 'camera'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Camera className={`w-8 h-8 mx-auto mb-2 ${captureMode === 'camera' ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-sm ${captureMode === 'camera' ? 'text-blue-600' : 'text-gray-600'}`}>Camera</span>
            </button>
            
            <button
              onClick={() => setCaptureMode('manual')}
              className={`p-4 rounded-lg border-2 transition-all ${
                captureMode === 'manual'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <FileText className={`w-8 h-8 mx-auto mb-2 ${captureMode === 'manual' ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-sm ${captureMode === 'manual' ? 'text-blue-600' : 'text-gray-600'}`}>Manual Input</span>
            </button>
          </div>

          {captureMode === 'camera' ? (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <ScanLine className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Camera View</p>
                  <p className="text-xs opacity-75">Position license plate in frame</p>
                </div>
              </div>
              <Button onClick={handleCapture} className="w-full bg-blue-600 hover:bg-blue-700">
                <Camera className="w-4 h-4 mr-2" />
                Capture License Plate
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="plateNumber">License Plate Number</Label>
                <Input
                  id="plateNumber"
                  type="text"
                  placeholder="Enter plate number (e.g., ABC-1234)"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  className="uppercase"
                />
              </div>
              <Button onClick={handleCapture} className="w-full bg-blue-600 hover:bg-blue-700">
                Verify Vehicle
              </Button>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Ensure the license plate is clearly visible and well-lit for accurate AI recognition.
          </p>
        </div>
      </div>
    </div>
  );
}
