'use client';

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getUser } from '../actions/user.action';
import { currentUser, useAuth } from '@clerk/nextjs';

interface UserContextProps {
  user: any;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>('');

  const { userId } = useAuth();

  if (userId) {
    const getUserInfo = async () => {
      const response = await getUser(userId);
      setUser(response);
    };
    useEffect(() => {
      getUserInfo();
    }, []);
  }

  console.log('user: ', user);

  const contextValue: UserContextProps = {
    user,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
