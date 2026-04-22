import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hlcohniiaoodrvgedbml.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsY29obmlpYW9vZHJ2Z2VkYm1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxMjk3MDgsImV4cCI6MjA5MTcwNTcwOH0.A0wIlqee42MAlaGiBzsXjiYRN1SDgCcG4n2dJXhuGHo';

export const supabase = createClient(supabaseUrl, supabaseKey);
