import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Upload, Camera, FileText } from 'lucide-react';
import MobileHeader from '../shared/MobileHeader';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

export default function IssuePenalty() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleData, violation } = location.state || {};
  const [notes, setNotes] = useState('');
  const [evidence, setEvidence] = useState<string[]>([]);

  const handleIssue = () => {
    // Create penalty record
    const penalty = {
      id: 'PEN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      ...vehicleData,
      ...violation,
      notes,
      evidence,
      date: new Date().toISOString(),
      officer: 'Badge #12345'
    };

    navigate('/police/penalty-receipt', { state: { penalty } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Issue Traffic Penalty" backPath="/police/select-violation" />
      
      <div className="p-4 max-w-2xl mx-auto pb-24">
        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <h2 className="text-lg mb-4 text-gray-900">Penalty Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">License Plate:</span>
              <span className="text-gray-900">{vehicleData?.plateNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Owner:</span>
              <span className="text-gray-900">{vehicleData?.owner}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Violation:</span>
              <span className="text-gray-900">{violation?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Penalty Amount:</span>
              <span className="text-xl text-blue-600">${violation?.amount}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <h3 className="text-lg mb-4 text-gray-900">Evidence Upload</h3>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-600 hover:bg-blue-50 transition-colors">
              <Camera className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">Take Photo</span>
            </button>
            <button className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-600 hover:bg-blue-50 transition-colors">
              <Upload className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">Upload</span>
            </button>
            {evidence.length > 0 && (
              <div className="aspect-square bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">{evidence.length} files</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <Label htmlFor="notes" className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4" />
            Additional Notes
          </Label>
          <Textarea
            id="notes"
            placeholder="Enter any additional details about the violation..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full"
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handleIssue}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Issue Penalty
        </Button>
      </div>
    </div>
  );
}
