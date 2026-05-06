import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, FileText } from 'lucide-react';
import MobileHeader from '../shared/MobileHeader';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function CapturePlate() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [plateNumber, setPlateNumber] = useState('');
  const [captureMode, setCaptureMode] = useState<'camera' | 'manual'>('camera');
  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🎥 START CAMERA
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch (err) {
      console.error(err);
      alert("Camera access denied");
    }
  };

  // 📸 CAPTURE IMAGE
  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");

    setLoading(true);

    try {
      // 🔥 SEND TO BACKEND AI
      const res = await fetch("http://localhost/traffic/backend/recognize_plate.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: imageData })
      });

      const data = await res.json();

      if (data.success) {
        navigate('/police/vehicle-verification', {
          state: { plateNumber: data.plate }
        });
      } else {
        alert("Plate not detected");
      }

    } catch (err) {
      console.error(err);
      alert("AI detection failed");
    } finally {
      setLoading(false);
    }
  };

  // 🧾 MANUAL
  const handleManual = () => {
    if (!plateNumber.trim()) {
      alert("Enter plate number");
      return;
    }

    navigate('/police/vehicle-verification', {
      state: { plateNumber }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Capture License Plate" backPath="/police/login" />
      
      <div className="p-4 max-w-2xl mx-auto">

        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <h2 className="text-lg mb-4 text-gray-900">Capture Method</h2>

          {/* MODE SWITCH */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => {
                setCaptureMode('camera');
                startCamera();
              }}
              className={`p-4 rounded-lg border-2 ${
                captureMode === 'camera'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <Camera className="w-8 h-8 mx-auto mb-2" />
              Camera
            </button>

            <button
              onClick={() => setCaptureMode('manual')}
              className={`p-4 rounded-lg border-2 ${
                captureMode === 'manual'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <FileText className="w-8 h-8 mx-auto mb-2" />
              Manual
            </button>
          </div>

          {/* CAMERA MODE */}
          {captureMode === 'camera' && (
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                className="rounded-lg w-full bg-black"
              />

              <canvas ref={canvasRef} className="hidden" />

              {!streaming && (
                <Button onClick={startCamera} className="w-full">
                  Start Camera
                </Button>
              )}

              <Button
                onClick={captureImage}
                disabled={loading}
                className="w-full bg-blue-600"
              >
                {loading ? "Processing..." : "Capture & Detect Plate"}
              </Button>
            </div>
          )}

          {/* MANUAL MODE */}
          {captureMode === 'manual' && (
            <div className="space-y-4">
              <div>
                <Label>Plate Number</Label>
                <Input
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                  placeholder="ABC-1234"
                />
              </div>

              <Button onClick={handleManual} className="w-full bg-blue-600">
                Verify Vehicle
              </Button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}