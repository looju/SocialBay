import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Lottie from "lottie-react-native";

export const MatchScreen = ({ route, navigation }) => {
  const { loggedInProfiles, userSwiped } = route.params;
  return (
    <View style={Styles.container}>
      <View style={Styles.lottie}>
        <Lottie
          autoPlay
          loop
          source={require("../../../../assets/crying.json")}
          style={{ width: 50, height: 50 }}
        />
      </View>
      <View style={Styles.headerTitle}>
        <Image
          source={{ uri: "https://links.papareact.com/mg9" }}
          style={Styles.headerImageStyle}
        />
      </View>
      <View style={Styles.matchView}>
        <Text style={Styles.matchText}>
          You and {userSwiped.name} have matched each other!
        </Text>
      </View>

      <View style={Styles.imageView}>
        <Image
          style={Styles.imageStyle}
          source={{ uri: loggedInProfiles.photo }}
        />
        <Image style={Styles.imageStyle} source={{ uri: userSwiped.photo }} />
      </View>
      <TouchableOpacity
        style={Styles.button}
        onPress={() => navigation.navigate("Chat")}
      >
        <Text style={Styles.buttonText}>Send a message</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,76,48,0.89)",
  },
  lottie: {
    backgroundColor: "#fff",
    top: Dimensions.get("screen").height * 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: Dimensions.get("screen").height * 0.05,
    height: Dimensions.get("screen").height * 0.5,
  },
  headerImageStyle: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.12,
  },
  matchView: {
    bottom: Dimensions.get("screen").height * 0.1,
  },
  matchText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
  imageView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: Dimensions.get("screen").height * 0.1,
  },
  imageStyle: {
    height: 120,
    width: 120,
    borderRadius: 60,
    bottom: Dimensions.get("screen").height * 0.055,
  },
  button: {
    backgroundColor: "#fff",
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: Dimensions.get("screen").height * 0.1,
    border: 1,
    borderColor: "#fff",
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
  },
});
