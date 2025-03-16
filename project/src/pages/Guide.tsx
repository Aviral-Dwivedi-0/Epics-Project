import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Guide = () => {

  const { user } = useAuth();
  const isAuthenticated = Boolean(user);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="bg-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          How to Use CropSmart
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Follow this simple guide to get the most out of CropSmart's crop recommendation system.
        </p>

        <div className="space-y-6">
          <div className="bg-emerald-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Step 1: Sign Up</h2>
            <p className="text-gray-600 mb-4">
              Create an account to save your predictions and track your farming history.
            </p>
            <Link
              to={isAuthenticated ? '/' : '/signup'}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              {isAuthenticated ? 'Home' : 'Create an account →'}
            </Link>
          </div>
          {/* ...other steps remain unchanged */}
          <div className="bg-emerald-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Step 2: Input Your Data
            </h2>
            <p className="text-gray-600 mb-4">
              Enter your soil parameters and environmental conditions in the prediction form.
              Required data includes:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Nitrogen content (N)</li>
              <li>Phosphorus content (P)</li>
              <li>Potassium content (K)</li>
              <li>Temperature</li>
              <li>Humidity</li>
              <li>pH level</li>
              <li>Rainfall</li>
            </ul>
          </div>

          <div className="bg-emerald-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Step 3: Get Recommendations
            </h2>
            <p className="text-gray-600 mb-4">
              Submit your data to receive personalized crop recommendations based on your
              specific conditions.
            </p>
            <Link
              to="/predict"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Try it now →
            </Link>
          </div>

          <div className="bg-emerald-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Step 4: Track Your History
            </h2>
            <p className="text-gray-600 mb-4">
              View your past predictions and track changes in your farming conditions over time.
            </p>
            <Link
              to="/history"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              View history →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guide;