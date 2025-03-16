import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useToast } from '../hooks/useToast';

interface Prediction {
  id: string;
  created_at: string;
  predicted_crop: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

const History = () => {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPredictions = useCallback(async () => {
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPredictions(data || []);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load predictions history',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (user) {
      fetchPredictions();
    }
  }, [user, fetchPredictions]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Please sign in to view your prediction history
        </h2>
        <p className="text-gray-600">
          Create an account or sign in to track your crop predictions over time.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">Your Prediction History</h1>

      {predictions.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <p className="text-gray-600">No predictions found. Try making some predictions!</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl p-8 shadow-lg overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-6">Recent Predictions</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Crop</th>
                  <th className="pb-3">N-P-K</th>
                  <th className="pb-3">Temperature</th>
                  <th className="pb-3">Humidity</th>
                  <th className="pb-3">pH</th>
                  <th className="pb-3">Rainfall</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((prediction) => (
                  <tr key={prediction.id} className="border-b">
                    <td className="py-3">
                      {format(new Date(prediction.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="py-3">{prediction.predicted_crop}</td>
                    <td className="py-3">
                      {prediction.nitrogen}-{prediction.phosphorus}-{prediction.potassium}
                    </td>
                    <td className="py-3">{prediction.temperature}°C</td>
                    <td className="py-3">{prediction.humidity}%</td>
                    <td className="py-3">{prediction.ph}</td>
                    <td className="py-3">{prediction.rainfall}mm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Trends</h2>
            <LineChart
              width={900}
              height={400}
              data={predictions.slice().reverse()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="created_at"
                tickFormatter={(date) => format(new Date(date), 'MMM d')}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature" />
              <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity" />
              <Line type="monotone" dataKey="rainfall" stroke="#ffc658" name="Rainfall" />
            </LineChart>
          </div>
        </>
      )}
    </div>
  );
};

export default History;

