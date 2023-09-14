import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { firebaseClientApp } from '@/firebase-client';

const auth = getAuth(firebaseClientApp);

export const AuthContext = createContext<User | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
