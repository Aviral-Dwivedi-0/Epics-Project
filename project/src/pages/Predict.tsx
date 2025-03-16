import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useToast } from '../hooks/useToast';

const Predict = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });
  const [prediction, setPrediction] = useState('');
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setPrediction('');

    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const numericalData = {
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
      };

      // Validate numerical values
      Object.entries(numericalData).forEach(([key, value]) => {
        if (isNaN(value)) {
          throw new Error(`Invalid ${key} value`);
        }
      });

      // Simple prediction logic
      let predictedCrop = 'Maize';
      if (numericalData.temperature > 30 && numericalData.humidity > 80) {
        predictedCrop = 'Rice';
      } else if (numericalData.ph > 7 && numericalData.rainfall < 200) {
        predictedCrop = 'Cotton';
      }

      // Insert prediction with text user_id
      const { error } = await supabase
        .from('predictions')
        .insert({
          user_id: user.id.toString(),
          predicted_crop: predictedCrop,
          ...numericalData,
        });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      setPrediction(`Recommended crop: ${predictedCrop}`);
      toast({
        title: 'Success!',
        description: 'Prediction saved successfully',
      });

      // Clear form
      setFormData({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: '',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save prediction',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Please sign in to make predictions
        </h2>
        <p className="text-gray-600">
          Create an account or sign in to get personalized crop recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">Crop Prediction</h1>
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <p className="text-gray-600">
            Enter your soil parameters and environmental conditions in the prediction form.
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
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="nitrogen"
              placeholder="Nitrogen (N)"
              required
              className="border p-2 rounded"
              value={formData.nitrogen}
              onChange={handleChange}
            />
            <input
              type="number"
              name="phosphorus"
              placeholder="Phosphorus (P)"
              required
              className="border p-2 rounded"
              value={formData.phosphorus}
              onChange={handleChange}
            />
            <input
              type="number"
              name="potassium"
              placeholder="Potassium (K)"
              required
              className="border p-2 rounded"
              value={formData.potassium}
              onChange={handleChange}
            />
            <input
              type="number"
              name="temperature"
              placeholder="Temperature"
              required
              className="border p-2 rounded"
              value={formData.temperature}
              onChange={handleChange}
            />
            <input
              type="number"
              name="humidity"
              placeholder="Humidity"
              required
              className="border p-2 rounded"
              value={formData.humidity}
              onChange={handleChange}
            />
            <input
              type="number"
              name="ph"
              placeholder="pH level"
              required
              className="border p-2 rounded"
              value={formData.ph}
              onChange={handleChange}
            />
            <input
              type="number"
              name="rainfall"
              placeholder="Rainfall"
              required
              className="border p-2 rounded"
              value={formData.rainfall}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-emerald-500 text-white py-3 rounded-lg font-medium 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'} 
              transition-colors`}
          >
            {isLoading ? 'Processing...' : 'Predict Crop'}
          </button>
        </form>
        {prediction && (
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-emerald-700 font-medium">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;