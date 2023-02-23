import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const Header = ({ title, callEnabled, navigation }) => {
  const tw = useTailwind();

  return (
    <View style={tw("p-2 flex-row items-center justify-between")}>
      <View style={tw("flex flex-row items-center")}>
        <TouchableOpacity style={tw("p-2")} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={25} color={"#ff0000"} />
        </TouchableOpacity>
        <Text stlye={tw("text-2xl font-bold pl-2")}>{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity style={tw("rounded-full mr-4 p-3 bg-red-200")}>
          <MaterialCommunityIcons
            name="video"
            size={30}
            color={"#FF0000"}
            onPress={() => navigation.navigate("IdScreen")}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

co;
