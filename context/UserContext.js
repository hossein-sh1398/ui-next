"use client";
import { getUserAction } from "@/actions/auth";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({
  children,
}) {
  const [user, setUser] = useState('');
  function setLoginUser(user) {
    setUser(user);
  }
  async function me() {
    let data = await getUserAction();
    if (data.success) {
      setUser(data.user);
    }
  }
  useEffect(() => {
    me()
  }, [])
  return (
    <UserContext.Provider value={{ user, setLoginUser }}>
      {children}
    </UserContext.Provider>
  );
}
