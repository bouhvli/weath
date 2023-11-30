import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, StatusBar, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// or any files within the Snack

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const API_KEY = 'uKZovQ07muez8VvSgDkgDw==gVqaKpXkBODWHwbZ';
      const response = await fetch(
        'https://api.api-ninjas.com/v1/quotes?category=inspirational',
        {
          headers: {
            'X-Api-Key': API_KEY,
          },
        }
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { quote, author } = data[0];
        setQuote(quote);
        setAuthor(author);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };
  return (
    <ImageBackground source={require('./assets/778b0f90678065a3fbe657034a67de0b.jpeg')} style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={styles.weatherToday}>
        <Text style={styles.today}>Today</Text>
        <View style={styles.currentTemp}>
          <MaterialCommunityIcons name="weather-partly-cloudy" size={100} color="#E4F1F9" />
          <Text style={styles.tempeture}>18°</Text>
        </View>
        <Text style={styles.weatherCode}>Sunny</Text>
        <Text style={styles.weathytext}>Casablanca-Settat</Text>
        <Text style={styles.weathytext}>26 Novamber 2023</Text>
        <Text style={styles.weathytext}>Feels like 19°C  |  Sunset at 18:02</Text> 
      </View>
      <View style={styles.nextForcast}>
        <View style={styles.nextHoursWeather}>
          <View style={styles.nextHour}>
            <Text style={styles.nextHourWeatherTitle}>Now</Text>
            <View style={styles.nextHourWeatherState}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="#E4F1F9" />
              <Text style={styles.nextHoursWeatherTemp}>23°</Text>
            </View>
          </View>
          <View style={styles.nextHour}>
            <Text style={styles.nextHourWeatherTitle}>3 PM</Text>
            <View style={styles.nextHourWeatherState}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="#E4F1F9" />
              <Text style={styles.nextHoursWeatherTemp}>24°</Text>
            </View>
          </View>
          <View style={styles.nextHour}>
            <Text style={styles.nextHourWeatherTitle}>4 PM</Text>
            <View style={styles.nextHourWeatherState}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="#E4F1F9" />
              <Text style={styles.nextHoursWeatherTemp}>23°</Text>
            </View>
          </View>
          <View style={styles.nextHour}>
            <Text style={styles.nextHourWeatherTitle}>5 PM</Text>
            <View style={styles.nextHourWeatherState}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="#E4F1F9" />
              <Text style={styles.nextHoursWeatherTemp}>21°</Text>
            </View>
          </View>
          <View style={styles.nextHour}>
            <Text style={styles.nextHourWeatherTitle}>6 PM</Text>
            <View style={styles.nextHourWeatherState}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="#E4F1F9" />
              <Text style={styles.nextHoursWeatherTemp}>21°</Text>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.nextHoursWeather}>
          <View style={styles.nextHour}>
            <Text style={styles.nextHourWeatherTitle}>7 PM</Text>
            <View style={styles.nextHourWeatherState}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="#E4F1F9" />
              <Text style={styles.nextHoursWeatherTemp}>23°</Text>
            </View>
          </View>
          <View style={styles.nextHour}>
            <Text style={styles.nextHourWeatherTitle}>8 PM</Text>
            <View style={styles.nextHourWeatherState}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="#E4F1F9" />
              <Text style={styles.nextHoursWeatherTemp}>24°</Text>
            </View>
          </View>
          <View style={styles.nextHour}>
            <Text style={styles.nextHourWeatherTitle}>9 PM</Text>
            <View style={styles.nextHourWeatherState}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="#E4F1F9" />
              <Text style={styles.nextHoursWeatherTemp}>23°</Text>
            </View>
          </View>
          <View style={styles.nextHour}>
            <Text style={styles.nextHourWeatherTitle}>10 PM</Text>
            <View style={styles.nextHourWeatherState}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="#E4F1F9" />
              <Text style={styles.nextHoursWeatherTemp}>21°</Text>
            </View>
          </View>
          <View style={styles.nextHour}>
            <Text style={styles.nextHourWeatherTitle}>11 PM</Text>
            <View style={styles.nextHourWeatherState}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="#E4F1F9" />
              <Text style={styles.nextHoursWeatherTemp}>21°</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.quoteSection}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.quote}>{quote}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    padding: 8,
  },
  weatherToday: {
    backgroundColor: '#99B8CC',
    alignItems:'center',
    borderRadius: 25,
    marginTop: 50,
    padding: 20,
    height: 380,
    width: 350,
  },
  today: {
    color: '#E4F1F9',
    fontSize: 40,
  },
  currentTemp: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tempeture: {
    fontSize: 100,
    fontWeight: '400',
    color: '#E4F1F9',
  },
  weatherCode: {
    fontSize: 20,
    color: '#E4F1F9',
    marginBottom: 15,
  },
  weathytext: {
    marginTop: 15,
    color: '#E4F1F9'
  },
  quoteSection: {
    width: 350,
    padding: 20,
  },
  author: {
    color: '#417699',
    fontWeight:'bold'
  },
  quote: {
    color: '#417699',
    fontWeight:'bold'
  },
  line: {
    height: 2,
    width: 300,
    backgroundColor: '#fff',
  },
  nextForcast: {
    marginTop:15,
    height: 200,
    width: 350,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(213,226,235)',
    backgroundColor: 'radial-gradient(circle, rgba(153,184,204,0.9) 0%, rgba(153,184,204,0.9) 17%, rgba(153,184,204,0.9) 51%, rgba(153,184,204,0.9) 79%, rgba(153,184,204,0.9) 100%)',
  },
  nextHoursWeather: {
    display: 'flex',
    flexDirection: 'row',
    margin:10,
  },
  nextHour: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  nextHourWeatherState: {
    display: 'flex',
    alignItems: 'baseline',
    flexDirection: 'row'
  },
  nextHoursWeatherTemp: {
    color: "#FFF",
    paddingLeft: 5
  },
  nextHourWeatherTitle: {
    color: "#FFF",
    marginBottom: 10,
  }
});

export default App;