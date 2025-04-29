import { createClient } from "@supabase/supabase-js";

const supabaseUrl =process.env.REACT_APP_SUPABASE_URL;
const supabaseKey =process.env.REACT_APP_SUPABASE_KEY;

// Debugging: Check if the key is loading
// console.log("Supabase Key:", supabaseKey);

if (!supabaseKey) {
  throw new Error("Supabase key is missing! Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;