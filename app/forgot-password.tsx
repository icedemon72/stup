import { useSession } from '@/components/contexts/AuthContext';
import { ThemedText } from '@/components/themed/ThemedText';
import InputContainer from '@/components/ui/InputContainer';
import InputField from '@/components/ui/InputField';
import { Feather } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ForgotPassword = () => {
	const { session } = useSession();
	const [ email, setEmail ] = useState<string>();

	const handleResetPassword = () => {
		console.log(email);
	}

	if(session) {
		return <Redirect href="/(tabs)" />
	}

	return (
		<InputContainer>
			<View>
				<ThemedText style={{ textAlign: 'center', marginBottom: 20 }} type='subtitle'>Zaboravljena lozinka?</ThemedText>
				<ThemedText textColor='muted' style={{ textAlign: 'justify', marginBottom: 20 }}>Nema problema! Samo unesi svoju e-adresu i dobićeš uputstvo za resetovanje lozinke!</ThemedText>
			
				<InputField 
					placeholder='E-adresa'
					autoComplete='email'
					inputMode='email'
					autoFocus
					autoCapitalize='none'
					onChangeText={setEmail}
					leftIcon={<ThemedText><Feather name="mail" size={24} /></ThemedText>}
				/>

				<TouchableOpacity style={ styles.loginButton } onPress={handleResetPassword}>
					<Text style={{ textAlign: 'center' }}>Resetuj lozinku!</Text>
				</TouchableOpacity>
			</View>
		</InputContainer>
	);
}

const styles = StyleSheet.create({
	loginButton: {
		marginVertical: 20,
		padding: 15,
		backgroundColor: '#ff9f00',
		borderRadius: 10
	}
});


export default ForgotPassword;