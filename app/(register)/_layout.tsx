import { Stack } from "expo-router";
import { RegisterProvider, useRegisterContext } from '@/components/contexts/RegisterContext';
import { useEffect } from 'react';

const RegisterLayout = () => {
	const { step } = useRegisterContext();

	useEffect(() => {
		console.log(step);
	}, [ step ]);

  return (
		<RegisterProvider>
			<Stack screenOptions={{ 
				headerShown: false
			}}>
				<Stack.Screen name='register-step-1' />
				<Stack.Screen name='register-step-2' />
				<Stack.Screen name='register-step-3' />
				<Stack.Screen name='register-step-4' />
				<Stack.Screen name='register-step-5' />
			</Stack>
		</RegisterProvider>
	);
}

export default RegisterLayout;