import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const Header = ({ title, callEnabled, navigation }) => {
  const tw = useTailwind();

  return (
    <View style={Styles.container}>
      <View style={Styles.headerContent}>
        <TouchableOpacity
          style={Styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={30} color={"#ff0000"} />
        </TouchableOpacity>
        <Text stlye={Styles.userName}>{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity>
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

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: Dimensions.get("screen").height * 0.06,
  },
  headerContent: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 0.5,
  },
  backButton: {
    padding: 2,
    top: 2,
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
