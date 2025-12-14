import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dhlxzqfjlueieqcgdwfj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobHh6cWZqbHVlaWVxY2dkd2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NDU2MzcsImV4cCI6MjA3NzMyMTYzN30.3_PYKPy7t2mBvkbaNi0NaHTWyUyLO9zFQfgDTrWumdc'

export const supabase = createClient(supabaseUrl, supabaseKey)