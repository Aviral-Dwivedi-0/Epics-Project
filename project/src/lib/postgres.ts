import postgres from "postgres";

const connectionString = import.meta.env.VITE_DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL environment variable");
}

const sql = postgres(connectionString, {
  ssl: "require",
  max: 10, // Connection pool size
  idle_timeout: 20,
  connect_timeout: 10,
});

export default sql;
