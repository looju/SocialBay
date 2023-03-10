import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, {
  useRef,
  useState,
  useLayoutEffect,
  useContext,
  useEffect,
} from "react";
import {
  onSnapshot,
  doc,
  collection,
  setDoc,
  getDocs,
  getDoc,
  where,
  query,
  DocumentSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../Services/Config/Config";
import { generateId } from "../../../Lib/GenerateId";
import { AuthContext } from "../../../Services/Auth/Auth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Swiper from "react-native-deck-swiper";
import Lottie from "lottie-react-native";

export const HomeScreen = ({ navigation }) => {
  const [profiles, setProfiles] = useState([]);
  const [userMatched, setUserMatched] = useState([]);
  const [userPassedOn, setUserPassedOn] = useState([]);
  const { user } = useContext(AuthContext);

  useLayoutEffect(() => {
    onSnapshot(doc(db, "Users", user.user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("Profile");
      }
    });
  }, []);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) {
      return;
    }
    const userSwiped = profiles[cardIndex]; //contains the object info of the person who you swiped pass on
    console.log(`You swiped Pass on  ${userSwiped.name}`);
    setDoc(
      doc(db, "Users", user.user.uid, "Passes", userSwiped.id),
      userSwiped
    );
  };

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = getDocs(collection(db, "Users", user.user.uid, "Passes"))
        .then((snapshot) => {
          snapshot.docs.map((doc) => doc.id);
        })
        .catch((error) =>
          console.log("Error fetching passed documents: " + error)
        ); //this returns an array of passed users

      const swipes = getDocs(collection(db, "Users", user.user.uid, "Swipes"))
        .then((snapshot) => {
          snapshot.docs.map((doc) => doc.id);
        })
        .catch((error) =>
          console.log("Error fetching passed documents: " + error)
        ); //this returns an array of matched users

      const passedUserIds = passes.length > 0 ? passes : ["test array"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test array"];

      unsub = onSnapshot(
        query(
          collection(db, "Users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };
    fetchCards();
    return unsub;
  }, [db]);

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) {
      return;
    }

    const userSwiped = profiles[cardIndex];

    const loggedInProfiles = await (
      await getDoc(doc(db, "Users", user.user.uid))
    ).data(); //this contains the data of the user in object form

    // checking user documents for a swiped user and then accessing the swipes document of the swiped user to see if your id is present, meaning he has matched with you
    getDoc(doc(db, "Users", userSwiped.id, "Swipes", user.user.uid)).then(
      (DocumentSnapshot) => {
        if (DocumentSnapshot.exists()) {
          //user has matched with you before you matched with them
          //Add user details to your db collection
          console.log(`You matched with ${userSwiped.name}`);
          setDoc(doc(db, "Users", user.user.uid, "Swipes", userSwiped.id), {
            userSwiped,
          });
          //CREATE MATCH
          setDoc(doc(db, "Matches", generateId(user.user.uid, userSwiped.id)), {
            users: {
              [user.user.uid]: loggedInProfiles,
              [userSwiped.id]: userSwiped,
            },
            userMatched: [user.user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });
          navigation.navigate("MatchScreen", {
            loggedInProfiles,
            userSwiped,
          });
        } else {
          //you swiped first before the user swiped on you OR you haven't gotten swiped on
          console.log(
            `You swiped Match on  ${userSwiped.name}  ${userSwiped.occupation}`
          );

          setDoc(doc(db, "Users", user.user.uid, "Swipes", userSwiped.id), {
            userSwiped,
          });
        }
      }
    );
  };

  const swipeRef = useRef(null);

  const RenderCard = ({ item }) => (
    <View style={styles.overview}>
      <View style={styles.card}>
        <Image
          source={{ uri: `${item.photo}` }}
          style={{ flex: 1, height: "100%", borderRadius: 10 }}
        />
      </View>
      <View style={styles.details}>
        <View>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.occupationText}>{item.occupation}</Text>
        </View>
        <Text style={styles.ageText}>{item.Age}</Text>
      </View>
    </View>
  );

  const NoCard = () => (
    <View style={styles.overview}>
      <View style={styles.noCard}>
        <View style={styles.displayView}>
          <Text
            style={{
              color: "#000",
              fontSize: 20,
              fontFamily: "BebasNeue_400Regular",
            }}
          >
            Loading profiles
          </Text>
          <View style={styles.lottieView}>
            <Lottie
              loop
              autoPlay
              source={require("../../../../assets/loading2.json")}
              style={{ bottom: 30, width: 300, height: 300, right: 60 }}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.imageView}>
          <Image
            style={styles.image}
            source={require("../../../../assets/sample.jpg")}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoView}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            style={styles.logo}
            source={require("../../../../assets/icon.jpg")}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chatLogoView}
          onPress={() => navigation.navigate("Chat")}
        >
          <MaterialCommunityIcons size={40} color={"#ff0000"} name="wechat" />
        </TouchableOpacity>
      </View>
      <View>
        <Swiper
          cards={profiles}
          renderCard={(card) =>
            card ? <RenderCard item={card} /> : <NoCard />
          }
          ref={swipeRef}
          infinite
          showSecondCard
          verticalSwipe={false}
          stackSize={5}
          cardIndex={0}
          swipeAnimationDuration={300}
          stackSeparation={12}
          animateCardOpacity
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            right: {
              element: (
                <Text style={{ color: "#00FF00", fontSize: 30 }}>MATCH</Text>
              ),
              title: "MATCH",
              style: {
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
            left: {
              element: (
                <Text style={{ color: "#FF0000", fontSize: 30 }}>PASS</Text>
              ),
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.iconView}>
        <TouchableOpacity
          style={styles.passIcon}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <MaterialCommunityIcons
            size={35}
            color="#FF0000"
            name="window-close"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.matchIcon}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <MaterialCommunityIcons size={35} color="#00FF00" name="heart" />
        </TouchableOpacity>
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
    flex: 0.1,
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
    borderColor: "#fff",
    backgroundColor: "#ff0000",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 2,
  },
  noCard: {
    flex: 0.8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF0000",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 2,
  },
  lottieView: {
    width: 50,
    height: 100,
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "500",
  },
  ageText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  occupationText: {
    fontSize: 15,
    fontWeight: "300",
  },
  iconView: {
    top: Dimensions.get("screen").height * 0.8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  passIcon: {
    backgroundColor: "rgba(	255, 192, 203,0.5)",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    bottom: 25,
  },
  matchIcon: {
    backgroundColor: "rgba(0,128,0,0.2)",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    bottom: 25,
  },
  displayView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 200,
    alignItems: "center",
    top: "25%",
  },
});
