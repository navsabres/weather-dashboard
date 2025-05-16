require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key (first 10 chars):', supabaseKey.substring(0, 10) + '...');

async function testSupabaseConnection() {
  try {
    // Test connection by trying to get the list of tables
    console.log('Testing Supabase connection...');
    
    // Try to insert a test record
    const { data: insertData, error: insertError } = await supabase
      .from('weather_searches')
      .insert([
        { 
          city: 'Test City', 
          temperature: '20°C',
          description: 'Test Description',
          timestamp: new Date()
        }
      ]);
    
    if (insertError) {
      console.error('Error inserting test record:', insertError);
    } else {
      console.log('Successfully inserted test record');
    }
    
    // Try to fetch records
    const { data: fetchData, error: fetchError } = await supabase
      .from('weather_searches')
      .select('*')
      .limit(5);
    
    if (fetchError) {
      console.error('Error fetching records:', fetchError);
    } else {
      console.log('Successfully fetched records:', fetchData);
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testSupabaseConnection();
