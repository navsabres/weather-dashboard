# Weather Dashboard API Documentation

This document provides detailed information about the API endpoints available in the Weather Dashboard application.

## Base URL

When running locally, the base URL is:
```
http://localhost:3000
```

When deployed to Vercel, the base URL will be your Vercel deployment URL.

## Authentication

Currently, the API does not require authentication. User identification is handled through randomly generated user IDs on the client side.

## API Endpoints

### Weather History

#### GET `/api/weather-history`

Retrieves the most recent weather searches.

**Request Parameters:**
- None

**Response:**
```json
[
  {
    "id": "uuid",
    "city": "New York",
    "temperature": "15 °C",
    "description": "Rain, mist",
    "timestamp": "2025-05-14T03:44:13.138+00:00"
  },
  {
    "id": "uuid",
    "city": "London",
    "temperature": "10 °C",
    "description": "Cloudy",
    "timestamp": "2025-05-14T03:40:22.138+00:00"
  }
]
```

**Status Codes:**
- 200: Success
- 500: Server error

#### POST `/api/weather-history`

Saves a new weather search to the history.

**Request Body:**
```json
{
  "city": "New York",
  "temperature": "15 °C",
  "description": "Rain, mist"
}
```

**Response:**
```json
{
  "message": "Weather search saved successfully"
}
```

**Status Codes:**
- 201: Created
- 500: Server error

### User Preferences

#### GET `/api/user-preferences/:userId`

Retrieves user preferences.

**URL Parameters:**
- `userId`: The ID of the user

**Response:**
```json
{
  "id": "uuid",
  "user_id": "user-123",
  "units": "celsius",
  "default_city": "New York",
  "theme": "dark"
}
```

**Status Codes:**
- 200: Success
- 500: Server error

#### PUT `/api/user-preferences/:userId`

Updates user preferences.

**URL Parameters:**
- `userId`: The ID of the user

**Request Body:**
```json
{
  "units": "fahrenheit",
  "default_city": "Los Angeles",
  "theme": "light"
}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "user-123",
  "units": "fahrenheit",
  "default_city": "Los Angeles",
  "theme": "light"
}
```

**Status Codes:**
- 200: Success
- 500: Server error

## Error Handling

All API endpoints return appropriate HTTP status codes and error messages in case of failure.

Example error response:
```json
{
  "error": "Failed to fetch weather history"
}
```

## Database Schema

The API interacts with two tables in the Supabase database:

### weather_searches
- `id`: UUID (Primary Key)
- `city`: TEXT
- `temperature`: TEXT
- `description`: TEXT
- `timestamp`: TIMESTAMPTZ

### user_preferences
- `id`: UUID (Primary Key)
- `user_id`: TEXT (Unique)
- `units`: TEXT
- `default_city`: TEXT
- `theme`: TEXT

## Rate Limiting

Currently, there are no rate limits implemented for the API.

## Versioning

This is version 1.0 of the API. Future versions will be announced and documented accordingly.
