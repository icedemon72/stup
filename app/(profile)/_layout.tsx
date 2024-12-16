import React from 'react'
import { useSession } from '@/components/contexts/AuthContext';
import { Redirect, Stack } from 'expo-router';

const ProfileLayout = () => {
	const { session } = useSession();
	
	if(!session) {
		return <Redirect href="/home" />
	}

	return (
		<Stack screenOptions={{ 
			headerShown: false
		}}>
			<Stack.Screen name='user-profile' />		
			<Stack.Screen name='completed-surveys' />		
			<Stack.Screen name='my-surveys' />		
		</Stack>
	);
}

export default ProfileLayout;