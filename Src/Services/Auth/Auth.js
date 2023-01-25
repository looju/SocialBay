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
  //   const [code, setCode] = useState(null);
  const [recaptcha, setRecaptcha] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const sendVerification = async (number) => {
    window.RecaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: async (response) => {
          console.log(response);
          const phoneProvider = new PhoneAuthProvider(auth)
            .then(() => phoneProvider.verifyPhoneNumber(number))
            .then((id) => setVerificationId(id));
        },
        "expired-callback": () => {
          //   recaptcha.reset(window.recaptchaWidgetId);
          console.log("failed captcha");
          setError("oops looks like the recaptch expired");
        },
      },
      auth
    );
  };

  const confirmCode = (code) => {
    const credential = PhoneAuthProvider.credential(verificationId, code)
      .then(signInWithCredential(auth, credential))
      .then((result) => {
        setUser(result);
        console.log(user)
      });
  };

  return (
    <AuthContext.Provider value={{ user, error, phoneNumber, setPhoneNumber }}>
      {children}
    </AuthContext.Provider>
  );
};
