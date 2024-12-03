import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, db } from '@/constants/Firebase';
import { LoggedInUser } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	session: LoggedInUser | null;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
	signIn: async () => {},
	signOut: async () => {},
	session: null,
	isLoading: true,
});

export function useSession() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useSession must be used within an AuthProvider');
	}
	return context;
}

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [ session, setSession ] = useState<LoggedInUser | null>(null);
	const [ isLoading, setIsLoading ] = useState<boolean>(true);

	const checkIfIsLoggedIn = async () => {
		try {
			const user = await AsyncStorage.getItem('user');
			(user !== null) 
				? setSession(JSON.parse(user) as LoggedInUser)
				: setSession(null);
		} catch (err: any) {
			console.error(err);
			setSession(null);
		}
	}

	useEffect(() => {
		checkIfIsLoggedIn();
	}, []);

	const signIn = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);

			const userRef = doc(db, 'users', userCredential.user.uid);
			const userData = await getDoc(userRef);
			
			const userSession: LoggedInUser = {
				...userCredential.user,
				...userData.data()
			}

			await AsyncStorage.setItem('user', JSON.stringify(userSession));
						
			// const userData = await getDoc(doc(db, 'users', userCredential.user.uid));
			
			setSession(userSession);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const signOut = async () => {
		setIsLoading(true);
		try {
			await AsyncStorage.removeItem('user');
			await firebaseSignOut(auth);
			setSession(null);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}