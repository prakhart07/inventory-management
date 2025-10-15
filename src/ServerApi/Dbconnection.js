import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = 'https://nabcwfkoylclncjoikxv.supabase.co';
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hYmN3ZmtveWxjbG5jam9pa3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NDE1NTUsImV4cCI6MjA3NTMxNzU1NX0.O4CEgrysOfP5AoKTkzSO28cFa3Npl9gZrUnTNTZ9Ewk'; 


export const supabase=createClient(supabaseUrl,supabaseKey);