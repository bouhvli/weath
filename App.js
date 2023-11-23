import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Localization from 'expo-localization';

const WeatherApp = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const { calendar, timeZone, uses24hourClock, firstWeekday } = Localization.getCalendars()[0];
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      console.log(timeZone)
      setTimezone(timeZone);
    })();
    
  }, []);

  const fetchWeatherData = () => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=${timezone}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setWeatherData(null);
      });
  };

  const renderWeather = () => {
    if (weatherData) {
      const currentTemperature = weatherData.current.temperature_2m.toFixed(2);
      const nextFiveHoursForecast = weatherData.hourly.temperature_2m
        .slice(0, 5)
        .map(temp => temp.toFixed(2))
        .join('°C, ');

      return (
        <View>
          <Text style={styles.text}>Current Temperature in your location: {currentTemperature}°C</Text>
          <Text style={styles.text}>the time zone: {timezone}</Text>
          <Text style={styles.text}>Next 5 Hours Forecast: {nextFiveHoursForecast}°C</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weather Forecast App</Text>
      
      <Button title="Get Forecast" onPress={fetchWeatherData} />

      <View style={styles.weatherContainer}>
        {renderWeather()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default WeatherApp;
