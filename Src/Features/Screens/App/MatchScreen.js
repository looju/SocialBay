import { View, Text, StyleSheet, Image, TouchableOpacity,Dimensions } from "react-native";
import React from "react";

export const MatchScreen = ({ route, navigation }) => {
  const { loggedInProfiles, userSwiped } = route.params;
  return (
    <View style={Styles.container}>
      <View style={Styles.headerTitle}>
        <Image
          source={{ uri: "https://links.papareact.com/mg9" }}
          style={Styles.headerImageStyle}
        />
      </View>
      <Text style={Styles.matchText}>
        You and {userSwiped.name} have matched each other!
      </Text>
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
    paddingTop: 15,
  },
  headerTitle: {
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  headerImageStyle: {
    width:Dimensions.get("screen").width,
height:20,

},
  matchText: {
    marginTop: 5,
    color: "#fff",
    textAlign: "center",
  },
  imageView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  imageStyle: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  button: {
    backgroundColor: "#fff",
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 20,
    border: 1,
    borderColor: "#fff",
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
  },
});
