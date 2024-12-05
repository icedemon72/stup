import React, { useEffect, useState }  from 'react';
import { useRegisterContext } from '@/components/contexts/RegisterContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { Feather } from '@expo/vector-icons';
import { RelativePathString, useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform,  StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/themed/ThemedView';
import { InfoTexts } from '@/constants/Texts';
import { StepTwo } from '@/constants/Validators';

import NavigationArrows from '@/components/ui/NavigationArrows';
import RelativeLogo from '@/components/ui/RelativeLogo';
import HelpButton from '@/components/ui/HelpButton';
import InputContainer from '@/components/ui/InputContainer';


const RegisterStepTwo = () => {
	const router = useRouter();
	const { gender, step, setStep, email, setEmail, password, setPassword} = useRegisterContext();

	const [ passwordShown, setPasswordShown ] = useState<boolean>(false);
	const [ nextDisabled, setNextDisabled ] = useState<boolean>(true);

	const handleNext = () => {
		setStep(3);
		router.navigate('/(register)/register-step-3' as RelativePathString);
	}

	const handlePrevious = () => {
		router.replace('/(register)/register-step-1' as RelativePathString);
	}

	const validateForm = () => {
		const success: boolean = StepTwo.safeParse({ email, password }).success;
		
		setNextDisabled(!success);
	}

	useEffect(() => {
		validateForm();
	}, [ email, password ])

	return (
		<InputContainer absolute={[<RelativeLogo key='logo' />, <HelpButton title='Pomoć' text={InfoTexts.gender} key='button' />]}>		
			<View>
				<ThemedText style={{ textAlign: 'center' }} type='subtitle'>E-adresa i lozinka</ThemedText>
				<ThemedText style={{ marginVertical: 20, textAlign: 'justify' }} textColor='muted'>
						Da li bi {gender === 'M' ? 'mogao' : 'mogla'} da uneseš svoju e-adresu i lozinku? Bolje ih zapamti jer će ti trebati prilikom prijave!
				</ThemedText>

				{/* E-mail  */}
				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedText>
						<Feather name="mail" size={24} />
					</ThemedText>
					<ThemedTextInput
						placeholder='E-adresa'
						autoComplete='email'
						inputMode='email'
						autoCapitalize='none'
						autoFocus={!email.length}
						style={{ flex: 1 }}
						onChangeText={setEmail}
						value={email}
						backgroundKey='backgroundSecondary'
					/>

				</ThemedView>

				{/* Password */}
				<View>
					<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
						<ThemedText>
							<Feather name="lock" size={24} />
						</ThemedText>

						<ThemedTextInput
							placeholder='Lozinka'
							autoComplete='password'
							inputMode='text'
							secureTextEntry={!passwordShown}
							autoCapitalize='none'
							onChangeText={setPassword}
							value={password}
							style={{ flex: 1 }}
							backgroundKey='backgroundSecondary'
						/>

						<ThemedText onPress={() => setPasswordShown((prev) => !prev)}>
							{!passwordShown ? <Feather name="eye" size={24} /> : <Feather name="eye-off" size={24} />}
						</ThemedText>
					</ThemedView>
					<ThemedText style={{ marginHorizontal: 10, fontSize: 12, marginTop: -10 }} textColor='muted'>
						* Lozinka mora sadržati bar 6 karaktera
					</ThemedText>
				</View>
			</View>

			<View>
				<NavigationArrows nextDisabled={nextDisabled} handleNext={handleNext} handlePrevious={handlePrevious}  />
			</View>
		</InputContainer>
	);
}

const styles = StyleSheet.create({
	inputField: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
		marginBottom: 10,
		gap: 5,
		paddingHorizontal: 10,
		borderRadius: 10
	},
	inputContent: {
		justifyContent: 'space-between',
		flex: 1
	}
});

export default RegisterStepTwo;