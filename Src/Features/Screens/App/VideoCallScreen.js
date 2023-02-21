import { View, StyleSheet, Alert, Modal, Text } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import InCallManager from "react-native-incall-manager";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc";

export const VideoCallScreen = ({ navigation, ...props }) => {
  let name;
  let connectedUser;

  const [userId, setUserId] = useState("");
  const [socketActive, setSocketActive] = useState(false);
  const [calling, setCalling] = useState(false);

  //video srcs
  const [localStream, setLocalStream] = useState({toURL: () => null});
  const [remoteStream, setRemoteStream] = useState({toURL: () => null});
  const [conn, setConn] = useState(new WebSocket('ws://3.20.188.26:8080'));

  return (
    <View>
      <Text>VideoCallScreen</Text>
    </View>
  );
};
