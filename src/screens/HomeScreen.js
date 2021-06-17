import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import getImageForWeather from '../utils/getImageForWeather';
import {fetchLocationId, fetchWeather} from '../utils/api';
import SearchInput from '../components/SearchInput';

const d = Dimensions.get('window');

function HomeScreen() {
  const [location, setLocation] = useState('San Francisco');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [weather, setWeather] = useState('');

  const handleUpdateLocation = async city => {
    if (!city) return;

    try {
      setLoading(true);
      const locationId = await fetchLocationId(city);
      const {fetchedLocation, fetchedWeather, fetchedTemperature} =
        await fetchWeather(locationId);
      setLoading(false);
      setError(false);
      setLocation(fetchedLocation);
      setWeather(fetchedWeather);
      setTemperature(fetchedTemperature);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    handleUpdateLocation(location);
  }, [location]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
        resizeMode="cover">
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="#fff" size="large" />
          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city
                </Text>
              )}
              {!error && (
                <View>
                  <Text style={[styles.textStyle, styles.largeText]}>
                    {location}
                  </Text>
                  <Text style={[styles.textStyle, styles.smallText]}>
                    {weather}
                  </Text>
                  <Text style={[styles.textStyle, styles.largeText]}>
                    {`${Math.round(temperature)}°`}
                  </Text>
                </View>
              )}
              <SearchInput
                placeholder="Search any city"
                setLocation={setLocation}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: '#fff',
    //  ...Platform.select({
    //    ios: {
    //      fontFamily: 'AvenirNext-Regular',
    //    },
    //    android: {
    //      fontFamily: 'Roboto',
    //    },
    //  }),
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
    position: 'absolute',
    width: d.width,
    height: d.height,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
