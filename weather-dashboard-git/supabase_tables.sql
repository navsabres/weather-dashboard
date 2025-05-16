-- Create weather_searches table
CREATE TABLE IF NOT EXISTS weather_searches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city TEXT NOT NULL,
    temperature TEXT NOT NULL,
    description TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on city for faster searches
CREATE INDEX IF NOT EXISTS idx_weather_searches_city ON weather_searches(city);

-- Create index on timestamp for sorting by recency
CREATE INDEX IF NOT EXISTS idx_weather_searches_timestamp ON weather_searches(timestamp);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL UNIQUE,
    units TEXT DEFAULT 'celsius',
    default_city TEXT DEFAULT 'New York',
    theme TEXT DEFAULT 'dark'
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
