'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import React from "react";

type UserInformation = {
    name: string;
    role: string;
    email: string;
}

type AuthContextInterface = {
	signIn: (uid: string) => void;
	signOut: () => void;
	userInformation: UserInformation | null;
	setUserInformation: any;
	session: string | null;
}

export const AuthContext = createContext<AuthContextInterface>({
	signIn: () => null,
	signOut: () => null,
	userInformation: null,
	setUserInformation: null,
	session: null,
});

type SessionProviderProps = {
	children: any;
}


export default function SessionProvider({ children }: SessionProviderProps) {
	const [session, setSession] = useState<string | null>(null);
	const [userInformation, setUserInformation] = useState<null | UserInformation>(null);

	return (
		<AuthContext.Provider
			value={{
				signIn: (uid: string) => {
					setSession(uid)
					setUserInformation(null);
				},
				signOut: () => {
					setSession(null);
					setUserInformation(null);
				},
				session,
				userInformation,
				setUserInformation,
			}}>
			{children}
		</AuthContext.Provider>
	);
}