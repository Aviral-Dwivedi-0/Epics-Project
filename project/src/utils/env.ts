export function validateEnv() {
  const requiredEnvVars = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL?.trim(),
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY?.trim(),
    VITE_CLERK_PUBLISHABLE_KEY:
      import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim(),
    VITE_DATABASE_URL: import.meta.env.VITE_DATABASE_URL?.trim(),
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }

  // Validate URLs
  try {
    new URL(requiredEnvVars.VITE_SUPABASE_URL);
    new URL(requiredEnvVars.VITE_DATABASE_URL);
  } catch {
    throw new Error("Invalid URL format in environment variables");
  }
}
