import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MobileHeaderProps {
  title: string;
  backPath?: string;
}

export default function MobileHeader({ title, backPath }: MobileHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center sticky top-0 z-10">
      {backPath && (
        <button
          onClick={() => navigate(backPath)}
          className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
      )}
      <h1 className="text-lg text-gray-900">{title}</h1>
    </div>
  );
}
