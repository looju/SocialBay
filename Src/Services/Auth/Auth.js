import React, { useState, createContext } from "react";
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../Config/Config";
import { makeRedirectUri, startAsync } from "expo-auth-session";
import * as Google from 'expo-auth-session/providers/google';





export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //   const [code, setCode] = useState(null);
  const [recaptcha, setRecaptcha] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const sendVerification = async (number) => {
    const applicationVerifier =  new RecaptchaVerifier();
    const phoneProvider =  PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(
      number,
      applicationVerifier
    );
    setVerificationId(verificationId);
  };

  const confirmCode = async (code) => {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const userCredential = await signInWithCredential(auth, credential);
    setUser(userCredential);
  };



  const googleSignIn = async () => {
    // This will create a redirectUri
    // This should be the URL you added to "Redirect URLs" in Supabase URL Configuration
    // If they are different add the value of redirectUrl to your Supabase Redirect URLs
    const redirectUrl = makeRedirectUri({
      path: "exp://192.168.43.55:19000/--/auth/callback", 
    });

    const authResponse = await startAsync({
      authUrl: `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`,
      returnUrl: redirectUrl,
    });

    // If the user successfully signs in
    // we will have access to an accessToken and an refreshToken
    // and then we'll use setSession (https://supabase.com/docs/reference/javascript/auth-setsession)
    // to create a Supabase-session using these token
    if ((authResponse.type = "success")) {
      await fetch("https://www.googleapis.com/plus/v1/people/me", {
        method: "POST",
        contentType: "application/json",
        headers: {
          Authorization: `Bearer ${authResponse.params.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => {
          console.log("error fetching user auth" + error);
        });
      // supabase.auth.setSession({
      //   access_token: authResponse.params.access_token,
      //   refresh_token: authResponse.params.refresh_token,
      // });
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        phoneNumber,
        inputCode,
        setPhoneNumber,
        setInputCode,
        sendVerification,
        confirmCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
