"use client";
import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  // if (typeof window !== "undefined") {
  //   const savedState = window.localStorage.getItem("userState");
  //   const initialState = savedState
  //     ? JSON.parse(savedState)
  //     : {
  //       id: null,
  //       dni: null,
  //       cuil: null,
  //       email: null,
  //       phone: null,
  //       role: null,
  //       userCompanies: [],
  //       token: null,
  //     };
  // }

  const [userState, setUserState] = useState({})

  const [initialState, setInitialState] = useState({
    id: null,
    dni: null,
    cuil: null,
    email: null,
    phone: null,
    role: null,
    userCompanies: [],
    token: null,
  });

  // Guarda el estado del usuario en localStorage cada vez que se actualice
  useEffect(() => {
    window.localStorage.setItem("initialState", JSON.stringify(initialState));
  }, [initialState]);

  useEffect(() => {
    const isExists = JSON.parse(localStorage.getItem('initialState')) || {}
    if(isExists) {
      setUserState(isExists)
    }
  }, [])


  return (
    <AppContext.Provider value={{ userState, setUserState }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};
