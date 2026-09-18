import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function connect(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return Promise.reject(new Error("Missing MONGODB_URI environment variable"));
  }
  return new MongoClient(uri).connect();
}

// Reuse the client across hot reloads in dev so we don't exhaust connections.
const clientPromise =
  process.env.NODE_ENV === "development"
    ? (global._mongoClientPromise ??= connect())
    : connect();

// A rejected clientPromise (e.g. MONGODB_URI not configured yet) would otherwise
// surface as an unhandled rejection at module load, before callers get a chance
// to catch it; this silences that without affecting what callers await.
clientPromise.catch(() => {});

export default clientPromise;
