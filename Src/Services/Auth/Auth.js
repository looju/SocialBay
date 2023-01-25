import React, { useState, createContext } from "react";
import firebase from "../Config/Config";
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../Config/Config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [code, setCode] = useState(null);
  const [recaptcha, setRecaptcha] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState("");

  const sendVerification = async (phoneNumber) => {
    window.RecaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: async (response) => {
          console.log(response);
          const phoneProvider = new PhoneAuthProvider(auth)
            .then(() => phoneProvider.verifyPhoneNumber(phoneNumber))
            .then((id) => setVerificationId(id));
        },
        "expired-callback": () => {
          //   recaptcha.reset(window.recaptchaWidgetId);
          console.log("failed captcha");
        },
      },
      auth
    );
  };

  const confirmCode = () => {};

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
