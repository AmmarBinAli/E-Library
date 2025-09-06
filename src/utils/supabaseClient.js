import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bijfgejfegddjcwutgkv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpamZnZWpmZWdkZGpjd3V0Z2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNTE4NzEsImV4cCI6MjA3MjcyNzg3MX0.YCuu2HFGBVasIevldJz9sC9pR5ulmRdPC3-53fjlmls';
export const supabase = createClient(supabaseUrl, supabaseKey);