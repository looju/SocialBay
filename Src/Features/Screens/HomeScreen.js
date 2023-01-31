import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Swiper from "react-native-deck-swiper";

export const HomeScreen = () => {
  const dummyData = [
    {
      firstname: "Dwayne",
      lastname: "Johnson",
      age: 51,
      occupation: "Actor",
      image:
        "https://c4.wallpaperflare.com/wallpaper/635/965/145/actor-dwayne-johnson-dwayne-johnson-dwayne-the-rock-johnson-wallpaper-preview.jpg",
      id: 1,
    },
    {
      image:
        "https://c4.wallpaperflare.com/wallpaper/792/640/939/denzel-washington-new-photoshoot-wallpaper-preview.jpg",
      id: 2,
    },
    {
      firstname: "Dwayne",
      lastname: "Johnson",
      age: 51,
      occupation: "Actor",
      image:
        "https://c4.wallpaperflare.com/wallpaper/500/146/346/leonardo-dicaprio-actor-face-beard-wallpaper-preview.jpg",
      id: 3,
    },
    {
      firstname: "Dwayne",
      lastname: "Johnson",
      age: 51,
      occupation: "Actor",
      image:
        "https://c4.wallpaperflare.com/wallpaper/892/110/435/tom-hanks-actor-face-smile-wallpaper-preview.jpg",
      id: 4,
    },
    {
      firstname: "Dwayne",
      lastname: "Johnson",
      age: 51,
      occupation: "Actor",
      image:
        "https://c4.wallpaperflare.com/wallpaper/227/876/911/kevin-hart-2015-actor-award-wallpaper-preview.jpg",
      id: 5,
    },
    {
      firstname: "Dwayne",
      lastname: "Johnson",
      age: 51,
      occupation: "Actor",
      image:
        "https://c4.wallpaperflare.com/wallpaper/992/351/703/face-jennifer-lawrence-actress-celebrity-wallpaper-preview.jpg",
      id: 6,
    },
    {
      firstname: "Dwayne",
      lastname: "Johnson",
      age: 51,
      occupation: "Actor",
      image:
        "https://c4.wallpaperflare.com/wallpaper/653/423/614/meryl-streep-actress-oscar-celebrity-wallpaper-preview.jpg",
      id: 7,
    },
    {
      firstname: "Dwayne",
      lastname: "Johnson",
      age: 51,
      occupation: "Actor",
      image:
        "https://c4.wallpaperflare.com/wallpaper/514/423/744/amy-adams-face-eyes-celebrity-wallpaper-preview.jpg",
      id: 8,
    },
    {
      firstname: "Dwayne",
      lastname: "Johnson",
      age: 51,
      occupation: "Actor",
      image:
        "https://c4.wallpaperflare.com/wallpaper/305/881/91/4k-photo-jennifer-aniston-wallpaper-preview.jpg",
      id: 9,
    },
    {
      firstname: "Dwayne",
      lastname: "Johnson",
      age: 51,
      occupation: "Actor",
      image:
        "https://c4.wallpaperflare.com/wallpaper/685/113/280/gal-gadot-celebrity-women-portrait-wallpaper-preview.jpg",
      id: 10,
    },
  ];

  const RenderCard = ({ item }) => (
    <View style={styles.overview}>
      <View style={styles.card}>
        <Image
          source={{ uri: `${item.image}` }}
          style={{ flex: 1, height: "100%", borderRadius: 10, }}
        />
      </View>
      <View style={styles.details}>
        <View>
          <Text style={styles.nameText}>
            {item.firstname} {item.lastname}
          </Text>
          <Text style={styles.occupationText}>{item.occupation}</Text>
        </View>
        <Text style={styles.ageText}>{item.age}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.imageView}>
          <Image
            style={styles.image}
            source={require("../../../assets/sample.jpg")}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoView}>
          <Image
            style={styles.logo}
            source={require("../../../assets/icon.jpg")}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatLogoView}>
          <MaterialCommunityIcons size={35} color="#000" name="wechat" />
        </TouchableOpacity>
      </View>
      <View>
        <Swiper
          cards={dummyData}
          keyExtractor={(card)=>card.id}
          renderCard={(card) => <RenderCard item={card} />}
          infinite
          showSecondCard
          verticalSwipe={false}
          stackSize={5}
          cardIndex={0}
          swipeAnimationDuration={400}
          stackSeparation={12}
          animateCardOpacity
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex:0.1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: Dimensions.get("screen").height * 0.01,
  },
  imageView: {
    backgroundColor: "#000",
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  logoView: {
    height: 90,
    width: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  chatLogoView: {
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  overview: {
    flex: 1,
  
  },
  card: {
    flex: 0.8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor:"#fff",
    backgroundColor: "#ff0",
    shadowColor:"#000",
    shadowOpacity:0.1,
    shadowRadius:1.5,
    shadowOffset:{
      width: 0,
      height:20
    },
    elevation:2
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  details: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 2,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 70,
    shadowColor:"#000",
    shadowOpacity:0.1,
    shadowRadius:1.5,
    shadowOffset:{
      width: 0,
      height:20
    },
    elevation:2
  },
  nameText:{
   fontSize:20,
   fontWeight:"500"
  },
  ageText:{
   fontSize:25,
   fontWeight:"bold"
  },
  occupationText:{
    fontSize:15,
    fontWeight:"300"
  }
});
