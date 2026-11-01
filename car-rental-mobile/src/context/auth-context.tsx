import { createContext, ReactNode, useContext, useState } from 'react';

import { apiPut, apiPost } from '@/api';

export type User = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  birthDay: string;
  gender: string;
};

export type Profile = Omit<User, 'id'>;

type AuthValue = {
  user: User | null;
  logIn: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  setUser: (user: User) => void;
  saveProfile: (profile: Profile) => Promise<void>;
  logOut: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const logIn = async (email: string, password: string) => {
    setUser(await apiPost<User>('/auth/login', { email, password }));
  };

  const register = async (fullName: string, email: string, password: string) => {
    setUser(await apiPost<User>('/auth/register', { fullName, email, password }));
  };

  const saveProfile = async (profile: Profile) => {
    if (!user) throw new Error('Please log in again');
    setUser(await apiPut<User>(`/users/${user.id}`, profile));
  };

  const logOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, logIn, register, setUser, saveProfile, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth нужно вызывать внутри AuthProvider');
  }
  return auth;
}
