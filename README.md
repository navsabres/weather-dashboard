# Weather Dashboard with Supabase Integration

## Project Description
The Weather Dashboard is a web application that allows users to search for weather information by city name. The application displays current weather conditions including temperature, weather description, humidity, and wind speed. Users can toggle between Celsius and Fahrenheit temperature units and switch between light and dark themes. The application saves search history and user preferences in a Supabase database, allowing users to quickly access their previous searches and maintain their preferred settings.

### Key Features
- Search for weather by city name
- Toggle between Celsius and Fahrenheit
- Switch between light and dark themes
- View search history
- Persistent user preferences
- Responsive design for all screen sizes

### Target Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers: iOS Safari 14+, Chrome for Android 90+

## [Developer Manual](#developer-manual)

---

# Developer Manual

## Installation

### Prerequisites
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- A Supabase account and project

### Setting Up the Project

1. Clone the repository:
```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

4. Set up the Supabase database by running the SQL commands in `supabase_tables.sql` in your Supabase SQL editor.

## Running the Application

### Development Mode
To run the application in development mode with hot reloading:
```bash
npm run dev
```

### Production Mode
To run the application in production mode:
```bash
npm start
```

The application will be available at `http://localhost:3000` (or the port specified in your .env file).

## Testing

To run the tests:
```bash
npm test
```

This will execute the test suite and display the results in the terminal.

## API Documentation

### GET `/api/weather-history`
- **Description**: Retrieves the most recent weather searches
- **Response**: Array of weather search objects
  ```json
  [
    {
      "id": "uuid",
      "city": "New York",
      "temperature": "15 °C",
      "description": "Rain, mist",
      "timestamp": "2025-05-14T03:44:13.138+00:00"
    }
  ]
  ```

### POST `/api/weather-history`
- **Description**: Saves a new weather search to the history
- **Request Body**:
  ```json
  {
    "city": "New York",
    "temperature": "15 °C",
    "description": "Rain, mist"
  }
  ```
- **Response**: Success message
  ```json
  {
    "message": "Weather search saved successfully"
  }
  ```

### GET `/api/user-preferences/:userId`
- **Description**: Retrieves user preferences
- **Parameters**: `userId` - The ID of the user
- **Response**: User preferences object
  ```json
  {
    "id": "uuid",
    "user_id": "user-123",
    "units": "celsius",
    "default_city": "New York",
    "theme": "dark"
  }
  ```

### PUT `/api/user-preferences/:userId`
- **Description**: Updates user preferences
- **Parameters**: `userId` - The ID of the user
- **Request Body**:
  ```json
  {
    "units": "fahrenheit",
    "default_city": "Los Angeles",
    "theme": "light"
  }
  ```
- **Response**: Updated user preferences object

## Project Structure

```
weather-dashboard/
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies and scripts
├── server.js             # Express server and API endpoints
├── supabase_tables.sql   # SQL for setting up Supabase tables
├── test-supabase.js      # Script to test Supabase connection
├── public/               # Static files
│   ├── index.html        # Main HTML file
│   ├── css/              # CSS files
│   │   └── styles.css    # Main stylesheet
│   └── js/               # JavaScript files
│       └── app.js        # Main application logic
└── docs/                 # Documentation files
```

## Known Issues and Limitations

1. The application currently uses mock weather data instead of connecting to a real weather API.
2. There is no user authentication system; user IDs are generated randomly on page load.
3. The application does not support multiple days forecast yet.

## Future Development Roadmap

1. **Short-term improvements**:
   - Connect to a real weather API (OpenWeatherMap, WeatherAPI, etc.)
   - Add 5-day forecast display
   - Implement geolocation to automatically detect user's city

2. **Medium-term goals**:
   - Add user authentication
   - Implement weather alerts
   - Add weather maps visualization

3. **Long-term vision**:
   - Create mobile applications using React Native
   - Add IoT integration for home weather stations
   - Implement machine learning for personalized weather insights

## Libraries Used

1. **Express.js**: Server framework for handling API requests
2. **@supabase/supabase-js**: Client library for Supabase database
3. **Font Awesome**: Icon library for weather icons and UI elements
4. **dotenv**: Environment variable management

## Deployment

This application is deployed on Vercel. To deploy your own instance:

1. Create a Vercel account if you don't have one
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Deploy the application:
   ```bash
   vercel
   ```
4. Add your environment variables in the Vercel dashboard

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request
