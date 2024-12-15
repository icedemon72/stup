import React, { useEffect, useState } from 'react';
import { useRegisterContext } from '@/components/contexts/RegisterContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { faculties } from '@/constants/Data';
import { Ionicons } from '@expo/vector-icons';
import { RelativePathString, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { StepFour } from '@/constants/Validators';
import NavigationArrows from '@/components/ui/NavigationArrows';
import RelativeLogo from '@/components/ui/RelativeLogo';
import HelpButton from '@/components/ui/HelpButton';
import { InfoTexts } from '@/constants/Texts';
import InputContainer from '@/components/ui/InputContainer';
import ThemedDropdown from '@/components/themed/dropdowns/ThemedDropdown';

const RegisterStepFour = () => {
	const router = useRouter();
	const { gender, step, setStep, faculty, setFaculty } = useRegisterContext();

	const [ nextDisabled, setNextDisabled ] = useState<boolean>(true);


	const handleNext = () => {
		setStep(5);
		router.navigate('/(register)/register-step-5' as RelativePathString);
	}

	const handlePrevious = () => {
		router.replace('/(register)/register-step-3' as RelativePathString);
	}

	const validateForm = () => {
		const success: boolean = StepFour.safeParse({ faculty }).success;
		
		setNextDisabled(!success);
	}

	useEffect(() => {
		validateForm();
	}, [ faculty ]);

	return (
		<InputContainer absolute={[<RelativeLogo key='logo' />, <HelpButton title='Pomoć' text={InfoTexts.gender} key='button' />]}>
			<View style={styles.inputContent}>
				<View>

					<ThemedText style={{ textAlign: 'center' }} type='subtitle'>Fakultet</ThemedText>
					<ThemedText style={{ marginVertical: 20, textAlign: 'justify' }} textColor='muted'>
						Još samo ovo, na kom fakultetu studiraš?
					</ThemedText>
					
					<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
						<ThemedDropdown 
							icon={<ThemedText style={{ paddingRight: 5 }}><Ionicons name='school-outline' size={24} /></ThemedText>}
							placeholder='Izaberite fakultet'
							data={faculties}
							value={faculty}
							setValue={setFaculty}
						/>
					</ThemedView>

				</View>
					
				<View>
					<NavigationArrows nextDisabled={nextDisabled} handleNext={handleNext} handlePrevious={handlePrevious} />
				</View>
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
	},
});


export default RegisterStepFour;