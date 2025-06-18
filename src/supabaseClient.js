import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ocjvzpnzkhxlqomrxexv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9janZ6cG56a2h4bHFvbXJ4ZXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNjM1ODcsImV4cCI6MjA2NTgzOTU4N30.hf4Ymc-i7VJI3lIIW8Yr0vQamVVmPMybb5FpuG8CSIM'; // replace with your actual anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
