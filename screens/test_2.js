import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const WeatherForecast = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [timezone, setTimezone] = useState('');
  const [currentTemperature, setCurrentTemperature] = useState('');
  const [nextFiveHoursForecast, setNextFiveHoursForecast] = useState([]);
  const [windSpeed, setWindSpeed] = useState('');
  const [weatherCodes, setWeatherCodes] = useState([]);
  const [locationName, setLocationName] = useState('');

  const fetchLocationName = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      console.log(data);
      setLocationName(data.display_name);
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  // Mapping weather codes to their corresponding weather status
  const mapWeatherStatus = (code) => {
    switch (code) {
      case 0:
        return 'Clear sky';
      case 1:
        return 'Mainly clear';
      case 2:
        return 'partly cloudy';
      case 3:
        return 'overcast';
      case 45:
      case 48:
        return 'Fog and depositing rime fog';
      case 51:
        return 'Drizzle: Light';
      case 53:
        return 'Drizzle: moderate';
      case 55:
        return 'Drizzle: dense intensity';
      case 56:
        return 'Freezing Drizzle: Light';
      case 57:
        return 'Freezing Drizzle: dense intensity';
      case 61:
        return 'Rain: Slight';
      case 63:
        return 'Rain: moderate';
      case 65:
        return 'Rain: heavy intensity';
      case 66:
        return 'Freezing Rain: Light ';
      case 67:
        return 'Freezing Rain: heavy intensity';
      case 71:
        return 'Snow fall: Slight';
      case 73:
        return 'Snow fall: moderate';
      case 75:
        return 'Snow fall: heavy intensity';
      case 77:
        return 'Snow grains';
      case 80:
        return 'Rain showers: Slight';
      case 81:
        return 'Rain showers: moderate';
      case 82:
        return 'Rain showers: violent';
      case 85:
        return 'Snow showers: Slight';
      case 86:
        return 'Snow showers: heavy';
      case 95:
        return 'Thunderstorm: Slight hail';
      case 96:
        return 'Thunderstorm with moderate hail';
      case 99:
        return 'Thunderstorm with heavy hail';
      default:
        return 'Unknown';
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,wind_speed_10m&timezone=${timezone}`
      );
      const data = await response.json();

      // Get current temperature, wind speed, and the next 5 hours forecast
      setCurrentTemperature(data.current.temperature_2m.toFixed(2));
      setWindSpeed(data.current.wind_speed_10m.toFixed(2));
      console.log(data)
      setNextFiveHoursForecast(
        data.hourly.temperature_2m.slice(1, 6).map((temp) => temp.toFixed(2))
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchWeatherCodes = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code&timezone=${timezone}`
      );
      const data = await response.json();

      // Get weather codes for the next 5 hours
      console.log(data.daily.weather_code);
      setWeatherCodes(data.daily.weather_code.slice(1, 6));
    } catch (error) {
      console.error('Error fetching weather codes:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Enter Latitude:</Text>
      <TextInput
        value={latitude}
        onChangeText={(text) => setLatitude(text)}
        placeholder="Latitude"
        keyboardType="numeric"
      />
      <Text>Enter Longitude:</Text>
      <TextInput
        value={longitude}
        onChangeText={(text) => setLongitude(text)}
        placeholder="Longitude"
        keyboardType="numeric"
      />
      <Text>Enter Timezone:</Text>
      <TextInput
        value={timezone}
        onChangeText={(text) => setTimezone(text)}
        placeholder="Timezone"
      />
      <Button
        title="Get Weather"
        onPress={() => {
          fetchWeatherData();
          fetchWeatherCodes();
          fetchLocationName();
        }}
      />
      <Text>Location: {locationName}</Text>
      <Text>Current Temperature: {currentTemperature}°C</Text>
      <Text>Wind Speed: {windSpeed}</Text>
      <Text>Next 5 Hours Forecast:</Text>
      {nextFiveHoursForecast.map((temp, index) => (
        <Text key={index}>
          Hour {index + 1}: {temp}°C - Weather:{' '}
          {mapWeatherStatus(weatherCodes[index])}
        </Text>
      ))}
    </View>
  );
};

export default WeatherForecast;
