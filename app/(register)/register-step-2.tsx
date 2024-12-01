import React, { useState }  from 'react';
import { useRegisterContext } from '@/components/contexts/RegisterContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { RelativePathString, useRouter } from 'expo-router';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import NavigationArrows from '@/components/ui/NavigationArrows';
import { ThemedView } from '@/components/themed/ThemedView';
import RelativeLogo from '@/components/ui/RelativeLogo';

const screenHeight = Dimensions.get('screen').height;

const RegisterStepTwo = () => {
	const router = useRouter();
	const { gender, step, setStep, email, setEmail, password, setPassword} = useRegisterContext();

	const [ passwordShown, setPasswordShown ] = useState<boolean>(false);

	const handleNext = () => {
		setStep(3);
		router.navigate('/(register)/register-step-3' as RelativePathString);
	}

	const handlePrevious = () => {
		router.replace('/(register)/register-step-1' as RelativePathString);
	}

	return (
		<View style={ styles.container }>
				{/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} /> */}
				<ThemedView style={styles.inputContainer}>
					<RelativeLogo />
					{/* Email */}
					<ScrollView style={{ height: '75%' }}>
					<ThemedText style={{ textAlign: 'center' }} type='subtitle'>E-adresa i lozinka</ThemedText>
					<ThemedText style={{ marginTop: 20, }}>Da li bi {gender === 'M' ? 'mogao' : 'mogla'} da uneseš svoju e-adresu i lozinku? Bolje ih zapamti jer će ti trebati prilikom prijave!</ThemedText>
						{/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}> */}
							
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
									onChangeText={setEmail}
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
									style={{ flex: 1 }}
								/>

								<ThemedText onPress={() => setPasswordShown((prev) => !prev)}>
									{!passwordShown ? <Feather name="eye" size={24} /> : <Feather name="eye-off" size={24} />}
								</ThemedText>
							</ThemedView>
						{/* </KeyboardAvoidingView> */}

						<View>
							<NavigationArrows handleNext={handleNext} handlePrevious={handlePrevious} />
						</View>
					</ScrollView>
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
});

export default RegisterStepTwo;