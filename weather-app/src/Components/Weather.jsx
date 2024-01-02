
import React, { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const StyledDiv = styled('div')(({ isBackgroundBlack, theme }) => ({
  backgroundColor: isBackgroundBlack ? 'red' : 'white',
  color: isBackgroundBlack ? 'white' : 'black',
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  textAlign: 'center',
}));

const StyledInputContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme => theme.spacing(2),
});

const StyledButton = styled('button')({
  marginLeft: theme => theme.spacing(1),
});

const StyledWeatherDetails = styled('div')({
  marginTop: theme => theme.spacing(2),
});

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isBackgroundBlack, setIsBackgroundBlack] = useState(false);

  const API_KEY = '0fbba6e349464b62c151b15c7e966dea';

 //&----> WE ARE FETCHING THE DATA FROM WEATHER-API USING AXIOS

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        
      );
      console.log(response.data)
      setWeatherData(response.data);
      
    } 
    catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

 

//&----> CONVERTING KELVIN TO CELSIUS

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };
//&----->TOGGLE BUTTON 

  const toggleBackgroundColor = () => {
    setIsBackgroundBlack(!isBackgroundBlack);
  };

  return (
    <StyledDiv isBackgroundBlack={isBackgroundBlack}>
      <h2>Weather App</h2>
      <StyledInputContainer>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <StyledButton onClick={fetchWeather}>Get Weather</StyledButton>
        <StyledButton onClick={toggleBackgroundColor}>Toggle Background</StyledButton>
      </StyledInputContainer>
      <Box display="flex" flexDirection="column" alignItems="center">
        {weatherData && (
          <StyledWeatherDetails>
            <h3>{weatherData.name}, {weatherData.sys.country}</h3>
            <p>{weatherData.weather[0].description}</p>
            <p>Temperature: {kelvinToCelsius(weatherData.main.temp).toFixed(2)} °C</p>
            <p>WIND-SPEED : {weatherData.wind.speed}</p>
            <p>WIND-DEG : {weatherData.wind.deg}</p>
            
          </StyledWeatherDetails>
        )}
      </Box>
    </StyledDiv>
  );
};

export default Weather;

