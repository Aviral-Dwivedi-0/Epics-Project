import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <Sprout className="h-24 w-24 text-emerald-500 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Oops! It seems like this page has been harvested. Let's get you back to fertile ground.
        </p>
        <Link
          to="/"
          className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;