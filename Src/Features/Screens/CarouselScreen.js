import { View, Text, StyleSheet,Dimensions } from "react-native";
import React, { useRef } from "react";
import Carousel from "react-native-reanimated-carousel";

export const CarouselScreen = () => {
  const Data = [
    {
      id: "1",
      title: "After Everything Official Teaser (2023) After 5",
      thumbnail:
        "https://unsplash.com/photos/xqC7hdLMpgk",
    },
    {
      id: "2",
      title: "The Tomorrow Job Official Trailer (2023)",
      thumbnail:
        "https://unsplash.com/photos/wK2lihxIwZ0",
    },
    {
      id: "3",
      title: "Imani Official Trailer (2023)",
      thumbnail:
        "https://unsplash.com/photos/g1Kr4Ozfoac",
    },
    
  ];

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Text>CarouselScreen</Text>
      </View>
      <View sttyle={styles.Carousel}>
      <Carousel
      data={Data}
      loop
      autoPlay={true}
      width={Dimensions.get("screen").height*0.5}
      height={Dimensions.get("screen").height*0.5}
      scrollAnimationDuration={1500}
      style={styles.Carousel}
      renderItem={({ index }) => (
        <View
            style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: 'center',
            }}
        >
            <Text style={{ textAlign: 'center', fontSize: 30 }}>
                {index.title}
            </Text>
        </View>
    )}
      />
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button:{
  top:Dimensions.get("screen").height*0.9
  },
  Carousel: {
    marginTop:Dimensions.get("screen").height*0.15,
    
  },
});
