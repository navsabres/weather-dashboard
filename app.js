// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const searchHistory = document.getElementById('search-history');
const themeSwitch = document.getElementById('theme-switch');
const unitsRadios = document.querySelectorAll('input[name="units"]');

// Global variables
let currentUnits = 'celsius';
let userId = 'user-' + Math.random().toString(36).substring(2, 9); // Generate a random user ID for demo purposes

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load user preferences
    loadUserPreferences();
    
    // Load search history
    fetchSearchHistory();
    
    // Set up event listeners
    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    themeSwitch.addEventListener('change', toggleTheme);
    
    unitsRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentUnits = e.target.value;
            saveUserPreferences();
            
            // Update displayed temperature if we have weather data
            if (temperature.textContent !== '--') {
                const currentTemp = parseFloat(temperature.textContent);
                if (currentUnits === 'fahrenheit') {
                    temperature.textContent = Math.round(celsiusToFahrenheit(currentTemp));
                    document.getElementById('units').textContent = '°F';
                } else {
                    temperature.textContent = Math.round(fahrenheitToCelsius(currentTemp));
                    document.getElementById('units').textContent = '°C';
                }
            }
        });
    });
});

// Functions
async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) return;
    
    try {
        // Fetch weather data
        const weatherData = await fetchWeatherData(city);
        
        // Update UI with weather data
        updateWeatherUI(weatherData);
        
        // Save search to history
        saveSearchToHistory(weatherData);
        
        // Fetch updated search history
        fetchSearchHistory();
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

async function fetchWeatherData(city) {
    // For demo purposes, we'll use a mock API response
    // In a real app, you would fetch from a weather API like OpenWeatherMap
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data
    const temp = Math.floor(Math.random() * 30) - 5; // Random temperature between -5 and 25
    const descriptions = ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'shower rain', 'rain', 'thunderstorm', 'snow', 'mist'];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const hum = Math.floor(Math.random() * 50) + 30; // Random humidity between 30% and 80%
    const wind = (Math.random() * 10).toFixed(1); // Random wind speed between 0 and 10 m/s
    
    return {
        city: city,
        temperature: currentUnits === 'celsius' ? temp : celsiusToFahrenheit(temp),
        description: description,
        humidity: hum,
        windSpeed: wind,
        units: currentUnits
    };
}

function updateWeatherUI(data) {
    cityName.textContent = data.city;
    temperature.textContent = Math.round(data.temperature);
    document.getElementById('units').textContent = data.units === 'celsius' ? '°C' : '°F';
    weatherDescription.textContent = data.description;
    humidity.textContent = data.humidity + '%';
    windSpeed.textContent = data.windSpeed + ' m/s';
    
    // Update weather icon based on description
    updateWeatherIcon(data.description);
}

function updateWeatherIcon(description) {
    let iconClass = 'fa-cloud';
    
    if (description.includes('clear')) {
        iconClass = 'fa-sun';
    } else if (description.includes('cloud')) {
        iconClass = description.includes('scattered') || description.includes('few') ? 'fa-cloud-sun' : 'fa-cloud';
    } else if (description.includes('rain')) {
        iconClass = description.includes('shower') ? 'fa-cloud-showers-heavy' : 'fa-cloud-rain';
    } else if (description.includes('thunderstorm')) {
        iconClass = 'fa-bolt';
    } else if (description.includes('snow')) {
        iconClass = 'fa-snowflake';
    } else if (description.includes('mist') || description.includes('fog')) {
        iconClass = 'fa-smog';
    }
    
    weatherIcon.className = `fas ${iconClass}`;
}

async function saveSearchToHistory(data) {
    try {
        const response = await fetch('/api/weather-history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city: data.city,
                temperature: `${Math.round(data.temperature)} ${data.units === 'celsius' ? '°C' : '°F'}`,
                description: data.description
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to save search to history');
        }
        
    } catch (error) {
        console.error('Error saving search to history:', error);
    }
}

async function fetchSearchHistory() {
    try {
        const response = await fetch('/api/weather-history');
        
        if (!response.ok) {
            throw new Error('Failed to fetch search history');
        }
        
        const data = await response.json();
        updateSearchHistoryUI(data);
        
    } catch (error) {
        console.error('Error fetching search history:', error);
    }
}

function updateSearchHistoryUI(historyData) {
    searchHistory.innerHTML = '';
    
    if (historyData.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No search history yet';
        searchHistory.appendChild(li);
        return;
    }
    
    historyData.forEach(item => {
        const li = document.createElement('li');
        
        const citySpan = document.createElement('span');
        citySpan.textContent = item.city;
        citySpan.style.fontWeight = 'bold';
        
        const detailsSpan = document.createElement('span');
        detailsSpan.textContent = `${item.temperature}, ${item.description}`;
        
        li.appendChild(citySpan);
        li.appendChild(detailsSpan);
        
        li.addEventListener('click', () => {
            cityInput.value = item.city;
            handleSearch();
        });
        
        searchHistory.appendChild(li);
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    saveUserPreferences();
}

async function loadUserPreferences() {
    try {
        const response = await fetch(`/api/user-preferences/${userId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch user preferences');
        }
        
        const data = await response.json();
        
        // Apply theme
        if (data.theme === 'dark') {
            document.body.classList.add('dark-theme');
            themeSwitch.checked = true;
        } else {
            document.body.classList.remove('dark-theme');
            themeSwitch.checked = false;
        }
        
        // Apply units
        currentUnits = data.units;
        document.querySelector(`input[value="${currentUnits}"]`).checked = true;
        
        // Set default city
        if (data.default_city) {
            cityInput.value = data.default_city;
            handleSearch();
        }
        
    } catch (error) {
        console.error('Error loading user preferences:', error);
    }
}

async function saveUserPreferences() {
    try {
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        
        const response = await fetch(`/api/user-preferences/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                units: currentUnits,
                theme: theme,
                default_city: cityInput.value || 'New York'
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to save user preferences');
        }
        
    } catch (error) {
        console.error('Error saving user preferences:', error);
    }
}

// Helper functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}
