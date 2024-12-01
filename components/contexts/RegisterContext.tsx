import { FacultyType } from '@/constants/Data';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface RegisterContextType {
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	gender: string;
	setGender: React.Dispatch<React.SetStateAction<string>>;
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	dateOfBirth: Date | null;
	setDateOfBirth: React.Dispatch<React.SetStateAction<Date | null>>;
	faculty: FacultyType | null; // needs to be a type
	setFaculty: React.Dispatch<React.SetStateAction<FacultyType | null>>; // needs to be a type
	step: number;
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const RegisterContext = createContext<RegisterContextType> ({
	email: '',
	setEmail: () => {},
	name: '',
	setName: () => {},
	gender: 'M',
	setGender: () => {},
	password: '',
	setPassword: () => {},
	dateOfBirth: null,
	setDateOfBirth: () => {},
	faculty: null,
	setFaculty: () => {},
	step: 1,
	setStep: () => {}
});


interface RegisterProviderProps {
	children: ReactNode
}

export const useRegisterContext = () => {
  const context = useContext(RegisterContext);
  if (context == null) {
    throw new Error("useRegisterContext called outside of provider");
  }
  return context;
}

export function RegisterProvider({ children }: RegisterProviderProps) {
	const [ email, setEmail ] = useState<string>('');
	const [ name, setName ] = useState<string>('');
	const [ gender, setGender ] = useState<string>('M');
	const [ faculty, setFaculty ] = useState<FacultyType | null>(null); // This should be interface with name and id
	const [ password, setPassword ] = useState<string>('')
	const [ dateOfBirth, setDateOfBirth ] = useState<Date | null>(null);
	const [ step, setStep ] = useState<number>(1);



	return (
		<RegisterContext.Provider value={{ 
			email, name, gender, faculty, password, dateOfBirth, step,
			setEmail, setName, setGender, setFaculty, setPassword, setDateOfBirth, setStep
		}}>
			{ children }
		</RegisterContext.Provider>
	);
}