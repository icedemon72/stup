import { useRegisterContext } from '@/components/contexts/RegisterContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { ThemedView } from '@/components/themed/ThemedView';
import NavigationArrows from '@/components/ui/NavigationArrows';
import RelativeLogo from '@/components/ui/RelativeLogo';
import { Colors } from '@/constants/Colors';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RelativePathString, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RegisterStepFour = () => {
	const { email, password, setPassword, gender, step, setStep, faculty, setFaculty, dateOfBirth, name } = useRegisterContext();
	
	const [ passwordShown, setPasswordShown ] = useState<boolean>(false);

	const router = useRouter();

	const handleRegister = () => {
		setStep(5);
	}

	const handlePrevious = () => {
		router.replace('/(register)/register-step-3' as RelativePathString);
	}

	console.log(faculty);

	return (
		<View style={ styles.container }>
			<ThemedView style={ styles.inputContainer }>
				<RelativeLogo />
				
				<ThemedText style={{ textAlign: 'center' }} type='subtitle'>Informacije o registraciji</ThemedText>
				<ThemedText style={{ marginTop: 20, }}>Proveri podatke još jednom pre registracije!</ThemedText>
				
				{/* E-mail */}
				<ThemedView
					style={styles.inputField}
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
						autoCapitalize='none'
						style={{ flex: 1 }}
						editable={false}
						value={email}
						lightColor={Colors.light.backgroundSecondary}
						darkColor={Colors.dark.backgroundSecondary}
					/>

				</ThemedView>

				{/* Password */}
				<ThemedView
					style={styles.inputField}
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
						secureTextEntry={!passwordShown}
						autoCapitalize='none'
						lightColor={Colors.light.backgroundSecondary}
						darkColor={Colors.dark.backgroundSecondary}
						onChangeText={setPassword}
						value={password}
						editable={false}
						style={{ flex: 1 }}
					/>

					<ThemedText onPress={() => setPasswordShown((prev) => !prev)}>
						{!passwordShown ? <Feather name="eye" size={24} /> : <Feather name="eye-off" size={24} />}
					</ThemedText>
				</ThemedView>

				{/* Name */}
				<ThemedView
					style={styles.inputField}
					lightColor={Colors.light.backgroundSecondary}
					darkColor={Colors.dark.backgroundSecondary}
				>
					<ThemedText>
						<MaterialCommunityIcons name={gender === 'M' ? 'face-man-outline' : 'face-woman-outline' } size={24} />
					</ThemedText>

					<ThemedTextInput
						placeholder='Ime i prezime'
						autoCapitalize='words'
						style={{ flex: 1 }}
						// onChangeText={setName}
						editable={false}
						value={name}
						lightColor={Colors.light.backgroundSecondary}
						darkColor={Colors.dark.backgroundSecondary}
					/>

				</ThemedView>

				{/* Date of birth */}
				<ThemedView 
					style={ styles.inputField }
					lightColor={Colors.light.backgroundSecondary} 
					darkColor={Colors.dark.backgroundSecondary}
				>
					<ThemedText>
						<Feather name="calendar" size={24} />
					</ThemedText>
					<ThemedText style={{ flex: 1 }}>
						{ new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(dateOfBirth as Date) }
					</ThemedText>

				</ThemedView>

				{/* Faculty */}
				<ThemedView
					style={styles.inputField}
					lightColor={Colors.light.backgroundSecondary}
					darkColor={Colors.dark.backgroundSecondary}
				>
					<ThemedText>
						<Ionicons name="school-outline" size={24} />
					</ThemedText>

					<ThemedTextInput
						inputMode='text'
						lightColor={Colors.light.backgroundSecondary}
						darkColor={Colors.dark.backgroundSecondary}
						editable={false}
						value={faculty!.name}
						style={{ flex: 1 }}
					/>
				</ThemedView>
			
				<TouchableOpacity style={ styles.registerButton }>
					<Text style={{ textAlign: 'center' }}>Registruj se!</Text>
				</TouchableOpacity>
			</ThemedView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignContent: 'center',
	},

	// INPUT
	inputContainer: {
		position: 'relative',
		padding: 15,
		paddingTop: 80,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		minHeight: '75%'
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

	registerButton: {
		marginVertical: 20,
		padding: 15,
		backgroundColor: '#ff9f00',
		borderRadius: 10
	},
});


export default RegisterStepFour;