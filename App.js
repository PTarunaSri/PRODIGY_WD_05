import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import './App.css'; 

const apiKey = '7927dc3cbc53348e2de9b42417427997'; 
const url = 'https://api.openweathermap.org/data/2.5/weather';

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#weather-info').fadeIn();
}

async function getWeather() {
    const location = $('#location').val();
    if (location.trim() === "") {
        alert('Please enter a location.');
        return;
    }
    await weatherFn(location);
}

const App = () => {
    return (
        <div className="container">
            <div className="search-bar">
                <input type="text" id="location" placeholder="Enter city name" />
                <button onClick={getWeather}>Get Weather</button>
            </div>
            <div id="weather-info" style={{ display: 'none' }}>
                <h2 id="city-name">Weather Info</h2>
                <p id="date"></p>
                <p id="temperature"></p>
                <p id="description"></p>
                <p id="wind-speed"></p>
                <img id="weather-icon" alt="Weather Icon" />
            </div>
        </div>
    );
}

export default App;
