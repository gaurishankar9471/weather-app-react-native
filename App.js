import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import UnitsPicker from "./components/UnitsPicker";
import WeatherDetails from "./components/WeatherDetails";
import { colors } from "./utils/index";
import RelaodIcon from "./components/ReloadIcon";
import ReloadIcon from "./components/ReloadIcon";
// import {WEATHER_API_KEY} from 'react-native-dotenv'

const WEATHER_API_KEY = "8e733e137d8feb45adb2c389200a5c3b";
const WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/weather?";

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");

  useEffect(() => {
    load();
  }, [unitsSystem]);
  async function load() {
    setCurrentWeather(null);
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status != "granted") {
        setErrorMessage("Access to location neeeded to run this app");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      const weatherUrl = `${WEATHER_BASE_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weatherUrl);

      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <Text style={styles.AppName}>Weather App</Text>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load}></ReloadIcon>
          <WeatherInfo currentWeather={currentWeather}> </WeatherInfo>
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitsSystem={unitsSystem}
        ></WeatherDetails>
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load}></ReloadIcon>

        <Text style={{ textAlign: "center" }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  main: {
    justifyContent: "center",
    flex: 1
  },
  AppName: {
    textAlign: "center",
    fontSize: 40,
    color: "#E8290B",
    fontWeight: "700"
  }
});
