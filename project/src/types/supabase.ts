export interface Prediction {
  id: string;
  user_id: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  predicted_crop: string;
  created_at: string;
}
