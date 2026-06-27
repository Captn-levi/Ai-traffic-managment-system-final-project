import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import {
  Camera,
  FileText,
  Menu,
  Shield,
  History,
  LogOut,
  Car,
  Bot,
  User,
  AlertTriangle,
  BadgeCheck,
  ChevronRight,
  Bell,
  Activity,
  ScanLine,
  Upload,
  CheckCircle2,
  XCircle,
  RefreshCcw
} from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function CapturePlate() {

  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const police =
    JSON.parse(localStorage.getItem("police") || "{}");

  const [plateNumber, setPlateNumber] = useState('');

  const [captureMode, setCaptureMode] =
    useState<'camera' | 'manual'>('camera');

  const [streaming, setStreaming] = useState(false);

  const [loading, setLoading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [detectedPlate, setDetectedPlate] = useState('');

  const [previewImage, setPreviewImage] = useState('');

  const [todayScans, setTodayScans] = useState(0);

  const [todayViolations, setTodayViolations] = useState(0);

  // DASHBOARD DATA
  useEffect(() => {

    setTodayScans(
      Math.floor(Math.random() * 40) + 10
    );

    setTodayViolations(
      Math.floor(Math.random() * 20) + 5
    );

  }, []);

  // START CAMERA
  const startCamera = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment'
          }
        });

      if (videoRef.current) {

        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {

          videoRef.current?.play();

          setStreaming(true);

        };
      }

    } catch (err) {

      console.error(err);

      alert("Camera access denied");

    }
  };

  // STOP CAMERA
  const stopCamera = () => {

    const stream = videoRef.current?.srcObject as MediaStream;

    if (stream) {

      stream.getTracks().forEach(track => track.stop());

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      setStreaming(false);
    }
  };

  // PROCESS IMAGE
  const processImage = async (imageData: string) => {

    setLoading(true);

    try {

      const res = await fetch(
        "http://127.0.0.1:5000/recognize",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            image: imageData
          })
        }
      );

      const data = await res.json();

      console.log(data);

      if (data.success) {

        setDetectedPlate(data.plate);

      } else {

        alert(data.error || "Plate not detected");
      }

    } catch (err) {

      console.error(err);

      alert("AI detection failed");

    } finally {

      setLoading(false);

    }
  };

  // CAPTURE IMAGE
  const captureImage = async () => {

    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;

    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');

    ctx?.drawImage(video, 0, 0);

    const imageData =
      canvas.toDataURL("image/jpeg");

    setPreviewImage(imageData);

    await processImage(imageData);
  };

  // IMAGE UPLOAD
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {

      const imageData = reader.result as string;

      setPreviewImage(imageData);

      await processImage(imageData);

    };

    reader.readAsDataURL(file);
  };

  // MANUAL
  const handleManual = () => {

    if (!plateNumber.trim()) {

      alert("Enter plate number");

      return;
    }

    navigate('/police/vehicle-verification', {
      state: {
        plateNumber
      }
    });
  };

  // CONTINUE
  const continueVerification = () => {

    navigate('/police/vehicle-verification', {
      state: {
        plateNumber: detectedPlate
      }
    });
  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (

        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static z-30
          w-72 h-screen
          bg-gradient-to-b
          from-blue-950 to-blue-900
          text-white
          transition-transform duration-300

          ${sidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full'}

          lg:translate-x-0
        `}
      >

        {/* HEADER */}
        <div className="p-6 border-b border-blue-800">

          <div className="flex items-center gap-4">

            <div className="bg-blue-800 p-3 rounded-2xl">

              <Shield className="w-8 h-8 text-blue-300" />

            </div>

            <div>

              <h1 className="font-bold text-xl">
                Police Dashboard
              </h1>

              <p className="text-sm text-blue-200">
                AI Traffic Penalty System
              </p>

            </div>

          </div>

        </div>

        {/* OFFICER */}
        <div className="m-4 bg-white/10 rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <div className="bg-blue-700 p-3 rounded-full">

              <User className="w-6 h-6" />

            </div>

            <div>

              <h2 className="font-semibold">
                {police.name || "Officer"}
              </h2>

              <p className="text-sm text-blue-200">
                {police.badge_id || "POL-000"}
              </p>

            </div>

          </div>

        </div>

        {/* STATS */}
        <div className="px-4 grid grid-cols-2 gap-3 mb-5">

          <div className="bg-white/10 rounded-xl p-3">

            <p className="text-xs text-blue-200 mb-1">
              Today's Scans
            </p>

            <h2 className="text-2xl font-bold">
              {todayScans}
            </h2>

          </div>

          <div className="bg-white/10 rounded-xl p-3">

            <p className="text-xs text-blue-200 mb-1">
              Violations
            </p>

            <h2 className="text-2xl font-bold text-red-300">
              {todayViolations}
            </h2>

          </div>

        </div>

        {/* NAV */}
        <nav className="px-4 space-y-2">

          <Link
            to="/police/capture-plate"
            className="flex items-center justify-between bg-blue-800 px-4 py-3 rounded-xl"
          >

            <div className="flex items-center gap-3">

              <Camera className="w-5 h-5" />

              <span>Capture Plate</span>

            </div>

            <ChevronRight className="w-4 h-4" />

          </Link>

          <Link
            to="/police/history"
            className="flex items-center justify-between hover:bg-blue-800 px-4 py-3 rounded-xl transition"
          >

            <div className="flex items-center gap-3">

              <History className="w-5 h-5" />

              <span>Violation History</span>

            </div>

            <ChevronRight className="w-4 h-4" />

          </Link>

          <Link
            to="/police/ai-detection"
            className="flex items-center justify-between hover:bg-blue-800 px-4 py-3 rounded-xl transition"
          >

            <div className="flex items-center gap-3">

              <Bot className="w-5 h-5" />

              <span>AI Detection</span>

            </div>

            <ChevronRight className="w-4 h-4" />

          </Link>

        </nav>

        {/* STATUS */}
        <div className="mx-4 mt-6 bg-white/10 rounded-2xl p-4">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-semibold text-white">
                AI Recognition System
              </h3>

              <p className="text-sm text-blue-200 mt-1">
                System operating normally
              </p>

            </div>

            <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">

              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>

              <span className="text-green-300 text-sm">
                Online
              </span>

            </div>

          </div>

        </div>

        {/* LOGOUT */}
        <div className="absolute bottom-0 w-full border-t border-blue-800 p-4">

          <button
            onClick={() => {

              localStorage.removeItem("police");

              navigate("/police/login");

            }}

            className="flex items-center gap-3 text-red-300 hover:text-white transition"
          >

            <LogOut className="w-5 h-5" />

            Logout

          </button>

        </div>

      </aside>

      {/* MAIN */}
      <div className="flex-1">

        {/* HEADER */}
        <header className="bg-white border-b sticky top-0 z-10">

          <div className="px-6 py-4 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <Button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >

                <Menu className="w-7 h-7 text-gray-700" />

              </Button>

              <div>

                <h1 className="text-2xl font-bold text-gray-800">
                  Capture License Plate
                </h1>

                <p className="text-sm text-gray-500">
                  AI-powered vehicle verification
                </p>

              </div>

            </div>

            <div className="bg-blue-100 p-3 rounded-xl">

              <ScanLine className="w-7 h-7 text-blue-700" />

            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="p-6 max-w-4xl mx-auto">

          <div className="bg-white rounded-3xl shadow-xl p-6">

            {/* MODE SWITCH */}
            <div className="grid md:grid-cols-2 gap-5 mb-8">

              <button
                onClick={() => {

                  setCaptureMode('camera');

                  setDetectedPlate('');

                }}

                className={`
                  rounded-2xl p-6 border-2 transition-all

                  ${captureMode === 'camera'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200'}
                `}
              >

                <Camera className="w-12 h-12 text-blue-700 mx-auto mb-4" />

                <h3 className="font-semibold text-lg">
                  AI Camera Detection
                </h3>

              </button>

              <button
                onClick={() => {

                  setCaptureMode('manual');

                  stopCamera();

                }}

                className={`
                  rounded-2xl p-6 border-2 transition-all

                  ${captureMode === 'manual'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200'}
                `}
              >

                <FileText className="w-12 h-12 text-blue-700 mx-auto mb-4" />

                <h3 className="font-semibold text-lg">
                  Manual Entry
                </h3>

              </button>

            </div>

            {/* CAMERA MODE */}
            {captureMode === 'camera' && (

              <div className="space-y-5">

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full rounded-2xl bg-black"
                />

                <canvas
                  ref={canvasRef}
                  className="hidden"
                />

                {!streaming ? (

                  <Button
                    onClick={startCamera}
                    className="w-full py-6"
                  >
                    Start Camera
                  </Button>

                ) : (

                  <div className="grid md:grid-cols-2 gap-4">

                    <Button
                      onClick={captureImage}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 py-6"
                    >

                      {loading
                        ? "Detecting..."
                        : "Capture & Detect"}

                    </Button>

                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      className="py-6"
                    >
                      Stop Camera
                    </Button>

                  </div>

                )}

                {/* GALLERY */}
                <div>

                  <Label className="mb-2 block">
                    Upload Image
                  </Label>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />

                </div>

                {/* PREVIEW */}
                {previewImage && (

                  <div className="border rounded-2xl p-4">

                    <img
                      src={previewImage}
                      alt="preview"
                      className="rounded-xl w-full max-h-[400px] object-cover"
                    />

                  </div>

                )}

                {/* DETECTED */}
                {detectedPlate && (

                  <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

                    <div className="flex items-center gap-3 mb-4">

                      <CheckCircle2 className="w-7 h-7 text-green-600" />

                      <div>

                        <h3 className="font-bold text-green-700">
                          Plate Detected
                        </h3>

                        <p className="text-sm text-green-600">
                          Verify before continuing
                        </p>

                      </div>

                    </div>

                    <Input
                      value={detectedPlate}
                      onChange={(e) =>
                        setDetectedPlate(
                          e.target.value.toUpperCase()
                        )
                      }
                      className="text-2xl h-14 font-bold text-center tracking-widest mb-4"
                    />

                    <div className="grid md:grid-cols-2 gap-4">

                      <Button
                        onClick={continueVerification}
                        className="bg-green-600 hover:bg-green-700 py-6"
                      >
                        Continue
                      </Button>

                      <Button
                        onClick={() => setDetectedPlate('')}
                        variant="outline"
                        className="py-6"
                      >

                        <RefreshCcw className="w-4 h-4 mr-2" />

                        Retry

                      </Button>

                    </div>

                  </div>

                )}

              </div>
            )}

            {/* MANUAL MODE */}
            {captureMode === 'manual' && (

              <div className="space-y-5">

                <div>

                  <Label className="mb-2 block">
                    License Plate Number
                  </Label>

                  <Input
                    value={plateNumber}

                    onChange={(e) =>
                      setPlateNumber(
                        e.target.value.toUpperCase()
                      )
                    }

                    placeholder="AA2-12345"

                    className="h-12 text-lg"
                  />

                </div>

                <Button
                  onClick={handleManual}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-6"
                >
                  Verify Vehicle
                </Button>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}