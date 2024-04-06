import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import { debounce, isEmpty } from "lodash";
import classNames from "classnames";
import { Entypo, Feather, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { fetchLocationsData, fetchWeatherData } from "../api/weather";
import { format } from "date-fns";
import * as Progress from "react-native-progress";
import { getUserData, storeUserData } from "../utils/storage";

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLocation = (location) => {
    setLocations([]);
    setLoading(true);
    fetchWeatherData({
      city: location.name,
      days: 7,
    }).then((res) => {
      setLoading(false);
      setCurrentWeather(res);
      setShowSearch(false);
      storeUserData("city", location.name);
    });
  };

  const handleSearch = (cityName) => {
    fetchLocationsData({ city: cityName }).then((res) => {
      setLocations(res);
    });
  };

  useEffect(() => {
    fetchCurrentWeatherData();
  }, []);

  const fetchCurrentWeatherData = async () => {
    const userCity = await getUserData("city");
    setLoading(true);
    fetchWeatherData({
      city: userCity ? userCity : "Mumbai",
      days: "7",
    }).then((res) => {
      setLoading(false);
      setCurrentWeather(res);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 800), []);

  const { current, location } = currentWeather;

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        blurRadius={50}
        source={require("../assets/bg3.png")}
        className="absolute h-full w-full"
      />
      {loading ? (
        <View className="h-full flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1 py-6">
          <View className="mx-4 mt-4 z-50 h-14 relative">
            <View className="flex flex-row justify-end items-center rounded-full bg-slate-800">
              {showSearch && (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search City"
                  placeholderTextColor="white"
                  className="pl-6 h-10 flex-1 text-white"
                />
              )}
              <TouchableOpacity
                className="rounded-full p-3 m-1 bg-gray-500"
                onPress={() => setShowSearch(!showSearch)}
              >
                <MagnifyingGlassIcon size={25} color="white" />
              </TouchableOpacity>
            </View>

            {!isEmpty(locations) && showSearch && (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleLocation(item)}
                      className={classNames(
                        "py-3 px-4 flex-row items-center mb-1",
                        index != locations.length - 1 &&
                          "border-b-2 border-b-gray-400"
                      )}
                    >
                      <MapPinIcon size={20} color="gray" />
                      <Text className="text-lg ml-2">
                        {item?.name},{item?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* Forecast Section */}
          <View className="mx-4 flex justify-around flex-1 mb-2 py-8">
            <Text className="text-white text-center text-2xl font-bold">
              {location?.name},
              <Text className="text-xl font-semibold text-white">
                {" " + location?.country}
              </Text>
            </Text>

            {/* Weather image */}
            <View className="flex-row justify-center">
              <Image
                source={{ uri: `https://${current?.condition?.icon}` }}
                className="w-52 h-52"
              />
            </View>

            <View className="space-y-2">
              <Text className="text-center font-bold text-white text-6xl ml-5">
                {current?.temp_c}&#176;
              </Text>
              <Text className="text-center text-white text-xl tracking-widest">
                {current?.condition.text}
              </Text>
            </View>

            {/* other stats */}
            <View className="flex-row justify-between">
              <View className="flex-row space-x-2 items-center">
                <FontAwesome5 name="cloud-sun-rain" size={35} color="white" />
                <Text className="text-white font-semibold">
                  {current?.wind_kph} km
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Entypo name="drop" size={35} color="white" />
                <Text className="text-white font-semibold">
                  {current?.humidity} %
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Feather name="sun" size={35} color="white" />
                <Text className="text-white font-semibold">6:05 AM</Text>
              </View>
            </View>
          </View>

          {/* forecast for next day */}
          <View className="py-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
              <CalendarDaysIcon size={22} color="white" />
              <Text className="text-white">Daily Forecast</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {currentWeather?.forecast?.forecastday?.map((item, index) => {
                return (
                  <View
                    key={index}
                    className="flex justify-center items-center w-20 mx-2 rounded-3xl py-3 space-y-1 bg-gray-700"
                  >
                    <Fontisto name="lightnings" color="white" size={30} />
                    <Text className="text-white">
                      {format(item?.date, "EEE")}
                    </Text>
                    <Text className="text-white text-xl font-semibold">
                      {" "}
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default HomeScreen;
