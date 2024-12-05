import React from 'react';
import { useRegisterContext } from '@/components/contexts/RegisterContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { InfoTexts } from '@/constants/Texts';

import GenderView from '@/components/ui/GenderView';
import RelativeLogo from '@/components/ui/RelativeLogo';
import NavigationArrows from '@/components/ui/NavigationArrows';
import HelpButton from '@/components/ui/HelpButton';
import InputContainer from '@/components/ui/InputContainer';

const RegisterStepOne = () => {
	const router = useRouter();
	const { step, setStep, gender, setGender } = useRegisterContext();

	const handleNext = () => {
		setStep(2);
		router.navigate('/(register)/register-step-2');
	}

	return (
		<InputContainer absolute={[<RelativeLogo key='logo' />, <HelpButton title='Pomoć' text={InfoTexts.gender} key='button' />]}>
			<View>
				<ThemedText style={{ textAlign: 'center' }} type='subtitle'>Registracija</ThemedText>
				<ThemedText style={{ marginVertical: 20 }} textColor='muted'>Započnimo proces registracije na STUP. Možeš li nam reći kojeg si pola?</ThemedText>
				<ThemedView style={styles.genderContainer}>
					<GenderView gender='M' selectedGender={gender} onPress={() => setGender('M')} />
					<GenderView gender='F' selectedGender={gender} onPress={() => setGender('F')} />
				</ThemedView>
				<ThemedText style={{ textAlign: 'center' }} textColor='muted'>Pol</ThemedText>
			</View>
		
			<View>
				<NavigationArrows isFirst handleNext={handleNext} />
			</View>
		</InputContainer>
	);
}

const styles = StyleSheet.create({
	
	// GENDER
	genderContainer: {
		paddingHorizontal: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',	
		alignItems: 'center',
		gap: 10,
	},
	genderItem: {
		padding: 60,
		borderRadius: 10,
		position: 'relative'
	},
	genderField: { 
		flex: 1,
		gap: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		position: 'absolute',
		top: 3,
		left: 3
	},

	inputContent: {
		justifyContent: 'space-between',
		flex: 1
	}
});


export default RegisterStepOne;