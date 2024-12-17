import React, { useState } from 'react'
import { ThemedText } from '@/components/themed/ThemedText';
import { View, StyleSheet, Text, TouchableOpacity, Platform, Pressable } from 'react-native';
import { useSession } from '@/components/contexts/AuthContext';
import { Redirect, useRouter } from 'expo-router';

import RelativeLogo from '@/components/ui/RelativeLogo';
import Feather from '@expo/vector-icons/Feather';
import InputContainer from '@/components/ui/InputContainer';
import InputField from '@/components/ui/InputField';

const Login: React.FC = () => {
	const router = useRouter();
	const { signIn, isLoading, session } = useSession();

	const [ email, setEmail ] = useState<string>('123@gmail.com');
	const [ password, setPassword ] = useState<string>('123456');
	const [ passwordShown, setPasswordShown ] = useState<boolean>(false);

	if (session) {
		return <Redirect href="/(tabs)" />;
	}

	const handleLogin = async () => {

		try {
			await signIn(email, password);
		}catch (err: any) {
			if(Platform.OS === 'ios') {
				setPassword('');
			}
			console.log(err);
		}
	};

	return (
		<InputContainer absolute={<RelativeLogo />}>
			<View>
				<ThemedText style={{ textAlign: 'center', marginBottom: 20 }} type='subtitle'>Prijava</ThemedText>
				
				{/* E-mail */}
				<InputField 
					placeholder='E-adresa'
					autoComplete='email'
					inputMode='email'
					autoFocus
					autoCapitalize='none'
					onChangeText={setEmail}
					leftIcon={<ThemedText><Feather name="mail" size={24} /></ThemedText>}
				/>
				
				{/* Password */}
				<InputField 
					placeholder='Lozinka'
					autoComplete='password'
					inputMode='text'
					secureTextEntry={ !passwordShown }
					autoCapitalize='none'
					onChangeText={setPassword}
					leftIcon={<ThemedText><Feather name="lock" size={24} /></ThemedText>}
					rightIcon={
						<ThemedText onPress={() => setPasswordShown((prev) => !prev)}>
							{ !passwordShown ? <Feather name="eye" size={24}  /> : <Feather name="eye-off" size={24} /> }
						</ThemedText>
					}
				/>
			
				<TouchableOpacity style={ styles.loginButton } onPress={handleLogin}>
					<Text style={{ textAlign: 'center' }}>Prijavi se!</Text>
				</TouchableOpacity>
				
				<Pressable onPress={() => router.navigate('/forgot-password')}>
					<ThemedText type='default' style={{ textAlign: 'center', textDecorationLine: 'underline', fontSize: 14 }}>Zaboravio/la si lozinku?</ThemedText>
				</Pressable>

			</View>
		</InputContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignContent: 'center'
	},
	loginButton: {
		marginVertical: 20,
		padding: 15,
		backgroundColor: '#ff9f00',
		borderRadius: 10
	}
});

export default Login;


