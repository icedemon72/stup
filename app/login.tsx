import React, { useState } from 'react'
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { ThemedView } from '@/components/themed/ThemedView';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useSession } from '@/components/contexts/AuthContext';
import { Redirect } from 'expo-router';

import RelativeLogo from '@/components/ui/RelativeLogo';
import Feather from '@expo/vector-icons/Feather';
import InputContainer from '@/components/ui/InputContainer';

const Login: React.FC = () => {
	const [ email, setEmail ] = useState<string>('123@gmail.com');
	const [ password, setPassword ] = useState<string>('123456');
	const [ passwordShown, setPasswordShown ] = useState<boolean>(false);
	const { signIn, isLoading, session } = useSession();

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
				<ThemedView 
					style={ styles.inputField }
					lightColor={Colors.light.backgroundSecondary} 
					darkColor={Colors.dark.backgroundSecondary}
				>
					<ThemedText>
						<Feather name="mail" size={24} />
					</ThemedText>
					<ThemedTextInput
						placeholder='E-adresa'
						autoComplete='email'
						inputMode='email'
						autoFocus
						autoCapitalize='none'
						onChangeText={setEmail}
						lightColor={Colors.light.backgroundSecondary} 
						darkColor={Colors.dark.backgroundSecondary}
						style={{ flex: 1 }}
					/>

				</ThemedView>

				{/* Password */}
				<ThemedView 
					style={ styles.inputField }
					lightColor={Colors.light.backgroundSecondary} 
					darkColor={Colors.dark.backgroundSecondary}
				>
					<ThemedText>
						<Feather name="lock" size={24} />
					</ThemedText>

					<ThemedTextInput
						placeholder='Lozinka'
						autoComplete='password'
						inputMode='text'
						secureTextEntry={ !passwordShown }
						autoCapitalize='none'
						onChangeText={setPassword}
						lightColor={Colors.light.backgroundSecondary} 
						darkColor={Colors.dark.backgroundSecondary}
						style={{ flex: 1 }}
					/>

					<ThemedText onPress={() => setPasswordShown((prev) => !prev)}>
						{ !passwordShown ? <Feather name="eye" size={24}  /> : <Feather name="eye-off" size={24} /> }
					</ThemedText>
				</ThemedView>

				<TouchableOpacity style={ styles.loginButton } onPress={handleLogin}>
					<Text style={{ textAlign: 'center' }}>Prijavi se!</Text>
				</TouchableOpacity>

				<ThemedText type='default' style={{ textAlign: 'center', textDecorationLine: 'underline', fontSize: 14 }}>Zaboravio/la si lozinku?</ThemedText>
			</View>
		</InputContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignContent: 'center'
	},
	inputContainer: {
		padding: 15,
		paddingTop: 80,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		height: '75%'
	},
	inputField: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
		marginBottom: 10,
		gap: 5,
		paddingHorizontal: 10,
		borderRadius: 10
	},
	loginButton: {
		marginVertical: 20,
		padding: 15,
		backgroundColor: '#ff9f00',
		borderRadius: 10
	}
});

export default Login;


