# Weather Dashboard Documentation

## Project Overview

The Weather Dashboard is a web application developed as part of the INST 377 course at the University of Maryland. It allows users to search for weather information by city name, displaying current weather conditions including temperature, weather description, humidity, and wind speed.

The application features a responsive design that works on both desktop and mobile devices, with support for theme switching between light and dark modes, and temperature unit conversion between Celsius and Fahrenheit.

## Features

- **Search for weather by city name**: Users can enter a city name and get current weather information.
- **Toggle between Celsius and Fahrenheit**: Users can switch between temperature units.
- **Switch between light and dark themes**: The application supports both light and dark modes for better user experience.
- **View search history**: Recent searches are displayed and can be clicked to search again.
- **Persistent user preferences**: User settings like theme and temperature unit preference are saved.
- **Responsive design**: The application works well on all screen sizes.

## Project Structure

```
weather-dashboard-git/
├── node_modules/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   ├── about.html
│   └── index.html
├── .env
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── vercel.json
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: Supabase
- **Deployment**: Vercel
- **Icons**: Font Awesome

## API Endpoints

### GET /api/weather-history
Retrieves the 10 most recent weather searches.

### POST /api/weather-history
Saves a new weather search to the history.

### GET /api/user-preferences/:userId
Retrieves user preferences (theme, units, default city).

### PUT /api/user-preferences/:userId
Updates user preferences.

## Database Schema

### weather_searches Table
- id (primary key)
- city (text)
- temperature (text)
- description (text)
- timestamp (timestamp with time zone, default: now())

### user_preferences Table
- id (primary key)
- user_id (text, unique)
- units (text, default: 'celsius')
- theme (text, default: 'light')
- default_city (text, default: 'New York')

## How to Run the Project

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Supabase credentials
4. Start the server:
   ```
   npm start
   ```
   or
   ```
   node server.js
   ```
5. Open your browser and navigate to `http://localhost:3001`

## Development Notes

- The application uses a mock weather API in the frontend for demonstration purposes. In a production environment, it would connect to a real weather API like OpenWeatherMap.
- User IDs are randomly generated for demo purposes. In a production environment, proper authentication would be implemented.
- The application stores user preferences and search history in a Supabase database.

## Future Enhancements

- Integration with a real weather API
- 5-day forecast display
- Geolocation for automatic city detection
- User authentication
- Weather alerts
- Weather maps visualization
