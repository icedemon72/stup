import React from 'react';
import { useRegisterContext } from '@/components/contexts/RegisterContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import GenderView from '@/components/ui/GenderView';
import RelativeLogo from '@/components/ui/RelativeLogo';
import NavigationArrows from '@/components/ui/NavigationArrows';
import HelpButton from '@/components/ui/HelpButton';
import { InfoTexts } from '@/constants/Texts';

const screenHeight = Dimensions.get('screen').height;

const RegisterStepOne = () => {
	const router = useRouter();
	const { step, setStep, gender, setGender } = useRegisterContext();

	const handleNext = () => {
		setStep(2);
		router.navigate('/(register)/register-step-2');
	}

	return (
		<SafeAreaView style={ styles.container }>
			<ThemedView style={ styles.inputContainer }>
				<RelativeLogo />
				<HelpButton title='Pomoć' text={InfoTexts.gender} />
				<View style={styles.inputContent}>
					<View>
						<ThemedText style={{ textAlign: 'center' }} type='subtitle'>Registracija</ThemedText>
						<ThemedText style={{ marginVertical: 20 }}>Započnimo proces registracije na STUP. Možeš li nam reći kojeg si pola?</ThemedText>
						<ThemedView style={styles.genderContainer}>
							<GenderView gender='M' selectedGender={gender} onPress={() => setGender('M')} />
							<GenderView gender='F' selectedGender={gender} onPress={() => setGender('F')} />
						</ThemedView>
						<ThemedText style={{ textAlign: 'center' }} textColor='muted'>Pol</ThemedText>
					</View>
				
					<View>
						<NavigationArrows isFirst handleNext={handleNext} />
					</View>
				</View>
			</ThemedView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignContent: 'center',
	},
	
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

	// INPUT
	inputContainer: {
		position: 'relative',
		padding: 15,
		paddingTop: 80,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		minHeight: screenHeight * 0.70
	},
	inputContent: {
		justifyContent: 'space-between',
		flex: 1
	}
});


export default RegisterStepOne;