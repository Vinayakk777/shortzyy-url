import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kbqjhrrciouwvlnbfsbd.supabase.co"; // ✅ add this
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticWpocnJjaW91d3ZsbmJmc2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MjE0MTUsImV4cCI6MjA3NjM5NzQxNX0.fKKwAVAuWfsDkrXTMXqCC_kQ1WJq76BFh5_CqRzByZY"; // ✅ add your anon key here
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
