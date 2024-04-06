import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  MagnifyingGlassIcon,
  WindowIcon,
} from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import { isEmpty } from "lodash";
import classNames from "classnames";
import { Entypo, Feather, FontAwesome5, Fontisto } from "@expo/vector-icons";

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  const handleLocation = (location) => {
    console.log(location);
  };
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        blurRadius={50}
        source={require("../assets/bg3.png")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1 py-6">
        <View className="mx-4 mt-4 z-50 h-14 relative">
          <View className="flex flex-row justify-end items-center rounded-full bg-slate-800">
            {showSearch && (
              <TextInput
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
                    <Text className="text-lg ml-2">London,US</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Forecast Section */}
        <View className="mx-4 flex justify-around flex-1 mb-2">
          <Text className="text-white text-center text-2xl font-bold">
            Mumbai,
            <Text className="text-xl font-semibold text-white">India</Text>
          </Text>

          {/* Weather image */}
          {/* <View className="flex-row justify-center">
              <Image source={} className="w-52 h-52"/>
          </View> */}

          <View className="space-y-2">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              32&#176;
            </Text>
            <Text className="text-center text-white text-xl tracking-widest">
              Partly Warm
            </Text>
          </View>

          {/* other stats */}
          <View className="flex-row justify-between">
            <View className="flex-row space-x-2 items-center">
              <FontAwesome5 name="cloud-sun-rain" size={35} color="white" />
              <Text className="text-white font-semibold">22 km</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Entypo name="drop" size={35} color="white" />
              <Text className="text-white font-semibold">22 %</Text>
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
            <View className="flex justify-center items-center w-20 mx-2 rounded-3xl py-3 space-y-1 bg-gray-700">
              <Fontisto name="lightnings" color="white" size={30} />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                32&#176;
              </Text>
            </View>
            <View className="flex justify-center items-center w-20 mx-2 rounded-3xl py-3 space-y-1 bg-gray-700">
              <Fontisto name="lightnings" color="white" size={30} />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                32&#176;
              </Text>
            </View>
            <View className="flex justify-center items-center w-20 mx-2 rounded-3xl py-3 space-y-1 bg-gray-700">
              <Fontisto name="lightnings" color="white" size={30} />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                32&#176;
              </Text>
            </View>
            <View className="flex justify-center items-center w-20 mx-2 rounded-3xl py-3 space-y-1 bg-gray-700">
              <Fontisto name="lightnings" color="white" size={30} />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                32&#176;
              </Text>
            </View>
            <View className="flex justify-center items-center w-20 mx-2 rounded-3xl py-3 space-y-1 bg-gray-700">
              <Fontisto name="lightnings" color="white" size={30} />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                32&#176;
              </Text>
            </View>
            <View className="flex justify-center items-center w-20 mx-2 rounded-3xl py-3 space-y-1 bg-gray-700">
              <Fontisto name="lightnings" color="white" size={30} />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                32&#176;
              </Text>
            </View>
            <View className="flex justify-center items-center w-20 mx-2 rounded-3xl py-3 space-y-1 bg-gray-700">
              <Fontisto name="lightnings" color="white" size={30} />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                32&#176;
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
