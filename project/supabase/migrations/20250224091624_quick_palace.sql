/*
  # Create Predictions Schema

  1. New Tables
    - `predictions`
      - `id` (uuid, primary key)
      - `user_id` (text, changed from uuid for Clerk IDs)
      - `nitrogen` (numeric)
      - `phosphorus` (numeric)
      - `potassium` (numeric)
      - `temperature` (numeric)
      - `humidity` (numeric)
      - `ph` (numeric)
      - `rainfall` (numeric)
      - `predicted_crop` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `predictions` table
    - Add policies for authenticated users to:
      - Create their own predictions
      - Read their own predictions
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS predictions;
DROP POLICY IF EXISTS "Users can manage their own predictions" ON predictions;

-- Create predictions table with text user_id
CREATE TABLE predictions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id text NOT NULL, -- Changed from uuid to text for Clerk IDs
    nitrogen numeric NOT NULL,
    phosphorus numeric NOT NULL,
    potassium numeric NOT NULL,
    temperature numeric NOT NULL,
    humidity numeric NOT NULL,
    ph numeric NOT NULL,
    rainfall numeric NOT NULL,
    predicted_crop text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Enable authenticated user access" ON predictions
    FOR ALL 
    TO authenticated
    USING (auth.uid()::text = user_id)
    WITH CHECK (auth.uid()::text = user_id);

-- Create indexes
CREATE INDEX idx_predictions_user_id ON predictions(user_id);
CREATE INDEX idx_predictions_created_at ON predictions(created_at DESC);